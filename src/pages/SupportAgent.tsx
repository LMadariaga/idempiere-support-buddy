import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import KnowledgeBaseAdmin from '@/components/KnowledgeBaseAdmin';
import ChatInterface from '@/components/ChatInterface';
import AdminRegistration from '@/components/AdminRegistration';
import { KnowledgeEntry } from '@/types/support';

const SupportAgent: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeEntry[]>([
    {
      id: '1',
      question: '¿Qué es iDempiere?',
      answer: 'iDempiere es un software ERP (Enterprise Resource Planning) de código abierto basado en Java que ofrece funcionalidades de contabilidad, gestión de inventario, ventas, compras, CRM y más.'
    },
    {
      id: '2',
      question: '¿Cómo instalar iDempiere?',
      answer: 'Para instalar iDempiere, debe descargar el instalador desde la página oficial, configurar su base de datos PostgreSQL y seguir las instrucciones del asistente de instalación. Se recomienda revisar la documentación oficial para requisitos detallados.'
    },
    {
      id: '3',
      question: '¿Cómo crear un nuevo usuario en iDempiere?',
      answer: 'Para crear un nuevo usuario en iDempiere, debe acceder a la opción "Seguridad" en el menú principal, seleccionar "Usuario/Contraseñas" y hacer clic en el botón "Nuevo". Complete los campos requeridos y asigne los roles correspondientes.'
    }
  ]);

  const verifyAdmin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleAddUpdateEntry = (entry: KnowledgeEntry) => {
    if (entry.id) {
      setKnowledgeBase(knowledgeBase.map(item => 
        item.id === entry.id ? entry : item
      ));
    } else {
      const newEntry = {
        ...entry,
        id: Date.now().toString()
      };
      setKnowledgeBase([...knowledgeBase, newEntry]);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setKnowledgeBase(knowledgeBase.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">Asistente de Soporte iDempiere</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Administración</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Acceso de Administrador</DialogTitle>
            </DialogHeader>
            {!isAdmin ? (
              <div className="space-y-4">
                {!showRegistration ? (
                  <>
                    <Input
                      type="password"
                      placeholder="Contraseña de administrador"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <div className="flex flex-col gap-2">
                      <Button onClick={verifyAdmin}>Ingresar</Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowRegistration(true)}
                      >
                        Registrar Nuevo Administrador
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <AdminRegistration />
                    <Button 
                      variant="outline" 
                      onClick={() => setShowRegistration(false)}
                      className="w-full"
                    >
                      Volver al Login
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <KnowledgeBaseAdmin 
                knowledgeBase={knowledgeBase} 
                onAddUpdate={handleAddUpdateEntry} 
                onDelete={handleDeleteEntry} 
              />
            )}
          </DialogContent>
        </Dialog>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface knowledgeBase={knowledgeBase} />
        </div>
        
        <div className="border rounded-md p-4 bg-slate-50">
          <h2 className="text-lg font-semibold mb-4">Acerca del Soporte</h2>
          <p className="text-sm text-gray-600 mb-3">
            Este asistente está diseñado para responder consultas técnicas sobre iDempiere.
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Si no encuentras respuesta a tu pregunta, puedes solicitar soporte humano haciendo clic 
            en el botón correspondiente durante la conversación.
          </p>
          <div className="mt-6">
            <h3 className="font-medium mb-2">Temas populares:</h3>
            <ul className="text-sm">
              {knowledgeBase.slice(0, 3).map(entry => (
                <li key={entry.id} className="mb-1 text-blue-600 cursor-pointer hover:underline">
                  {entry.question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAgent;

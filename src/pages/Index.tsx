
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bienvenido al Portal de iDempiere</h1>
        <p className="text-xl text-gray-600">
          Soporte técnico especializado para su plataforma ERP
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Acerca de iDempiere</h2>
          <p className="text-gray-600 mb-4">
            iDempiere es una solución ERP/CRM de código abierto robusta y potente. 
            Ofrece funcionalidades como contabilidad, ventas, compras, gestión de inventario 
            y mucho más para empresas de todos los tamaños.
          </p>
          <p className="text-gray-600">
            Nuestro equipo de soporte está disponible para ayudarte con cualquier 
            consulta técnica o funcional que puedas tener.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Asistente de Soporte</h2>
          <p className="text-gray-600 mb-6">
            Accede a nuestro asistente de soporte técnico especializado en iDempiere. 
            Responde consultas técnicas al instante y puede derivar tu caso a un especialista 
            humano cuando sea necesario.
          </p>
          <div className="text-center">
            <Button asChild>
              <Link to="/support">Acceder al Soporte Técnico</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Por qué usar nuestro Agente de Soporte?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Respuestas Inmediatas</h3>
            <p className="text-gray-600">
              Obtén soluciones a problemas comunes de iDempiere sin esperar por un agente humano.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Base de Conocimiento</h3>
            <p className="text-gray-600">
              Acceso a una extensa base de conocimiento que se actualiza constantemente.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Soporte Humano</h3>
            <p className="text-gray-600">
              Cuando sea necesario, tus consultas serán dirigidas a especialistas humanos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

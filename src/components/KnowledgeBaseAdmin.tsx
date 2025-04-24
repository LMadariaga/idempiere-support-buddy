
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from 'lucide-react';
import { KnowledgeEntry } from '@/types/support';
import { toast } from '@/hooks/use-toast';

interface KnowledgeBaseAdminProps {
  knowledgeBase: KnowledgeEntry[];
  onAddUpdate: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
}

const KnowledgeBaseAdmin: React.FC<KnowledgeBaseAdminProps> = ({
  knowledgeBase,
  onAddUpdate,
  onDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEntry, setCurrentEntry] = useState<KnowledgeEntry>({
    id: '',
    question: '',
    answer: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEntry.question || !currentEntry.answer) {
      toast({
        title: "Error",
        description: "La pregunta y respuesta son obligatorias",
        variant: "destructive",
      });
      return;
    }

    onAddUpdate(currentEntry);
    toast({
      title: isEditing ? "Entrada actualizada" : "Entrada añadida",
      description: `La entrada "${currentEntry.question.substring(0, 30)}..." ha sido ${isEditing ? 'actualizada' : 'añadida'} correctamente.`,
    });
    
    // Reset form
    setCurrentEntry({
      id: '',
      question: '',
      answer: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (entry: KnowledgeEntry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de querer eliminar esta entrada?')) {
      onDelete(id);
      toast({
        title: "Entrada eliminada",
        description: "La entrada ha sido eliminada correctamente.",
      });
    }
  };

  const filteredEntries = knowledgeBase.filter(entry => 
    entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input
        type="text"
        placeholder="Buscar entradas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-4 bg-slate-50">
        <h3 className="font-medium text-lg">
          {isEditing ? 'Editar Entrada' : 'Añadir Nueva Entrada'}
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="question">Pregunta</Label>
          <Input
            id="question"
            value={currentEntry.question}
            onChange={(e) => setCurrentEntry({...currentEntry, question: e.target.value})}
            placeholder="¿Cómo configurar...?"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="answer">Respuesta</Label>
          <Textarea
            id="answer"
            value={currentEntry.answer}
            onChange={(e) => setCurrentEntry({...currentEntry, answer: e.target.value})}
            placeholder="Para configurar esto, primero debe..."
            rows={5}
          />
        </div>
        
        <div className="flex justify-between">
          <Button type="submit">
            {isEditing ? 'Actualizar' : 'Añadir'}
          </Button>
          {isEditing && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setCurrentEntry({
                  id: '',
                  question: '',
                  answer: ''
                });
                setIsEditing(false);
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>

      <div className="border rounded-md overflow-hidden">
        <h3 className="bg-slate-100 p-3 font-medium">Base de Conocimiento ({filteredEntries.length})</h3>
        <div className="divide-y max-h-80 overflow-y-auto">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="p-3 hover:bg-slate-50">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{entry.question}</h4>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{entry.answer}</p>
              </div>
            ))
          ) : (
            <p className="p-3 text-center text-gray-500">No se encontraron entradas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseAdmin;


import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, UserIcon, BotIcon, HelpCircle } from 'lucide-react';
import { KnowledgeEntry } from '@/types/support';
import { toast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  knowledgeBase: KnowledgeEntry[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ knowledgeBase }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente de soporte para iDempiere. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isWaitingForHumanSupport, setIsWaitingForHumanSupport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (query: string): KnowledgeEntry | null => {
    // Algoritmo simple para encontrar la mejor coincidencia
    // En una implementación real, se usaría algo más sofisticado como
    // procesamiento de lenguaje natural o similitud coseno
    query = query.toLowerCase();
    
    for (const entry of knowledgeBase) {
      if (entry.question.toLowerCase().includes(query) || 
          query.includes(entry.question.toLowerCase())) {
        return entry;
      }
    }
    
    // Búsqueda por palabras clave
    const queryWords = query.split(' ').filter(word => word.length > 3);
    let bestMatch: KnowledgeEntry | null = null;
    let maxMatchCount = 0;
    
    for (const entry of knowledgeBase) {
      const entryText = (entry.question + ' ' + entry.answer).toLowerCase();
      const matchCount = queryWords.filter(word => entryText.includes(word)).length;
      
      if (matchCount > maxMatchCount && matchCount > 0) {
        maxMatchCount = matchCount;
        bestMatch = entry;
      }
    }
    
    return bestMatch;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Procesamiento de la consulta
    setTimeout(() => {
      if (isWaitingForHumanSupport) {
        const botResponse: ChatMessage = {
          id: Date.now().toString(),
          text: 'Tu consulta ha sido registrada. Un agente humano se pondrá en contacto contigo pronto.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        return;
      }
      
      const bestMatch = findBestMatch(input);
      
      if (bestMatch) {
        const botResponse: ChatMessage = {
          id: Date.now().toString(),
          text: bestMatch.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        const notFoundResponse: ChatMessage = {
          id: Date.now().toString(),
          text: 'Lo siento, no tengo una respuesta específica para tu consulta. ¿Te gustaría solicitar ayuda de un agente humano?',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, notFoundResponse]);
      }
    }, 500);
  };

  const requestHumanSupport = () => {
    setIsWaitingForHumanSupport(true);
    
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      text: 'Has solicitado soporte humano. Un agente se pondrá en contacto contigo pronto.',
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, systemMessage]);
    
    // En una implementación real, aquí se enviaría la solicitud al sistema de tickets
    // o se notificaría al equipo de soporte
    toast({
      title: "Solicitud de soporte enviada",
      description: "Un agente de soporte revisará tu consulta pronto.",
    });
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-md overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white border rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'user' ? (
                  <UserIcon className="h-4 w-4 mr-2" />
                ) : (
                  <BotIcon className="h-4 w-4 mr-2" />
                )}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white">
        {!isWaitingForHumanSupport ? (
          <div className="flex gap-2">
            <Input
              placeholder="Escribe tu consulta aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="shrink-0">
              <SendIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={requestHumanSupport} className="shrink-0">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center p-2 bg-blue-50 rounded">
            <p className="text-sm text-blue-700">
              Esperando respuesta de soporte humano...
            </p>
            <Button 
              variant="link" 
              className="text-xs" 
              onClick={() => setIsWaitingForHumanSupport(false)}
            >
              Continuar con el asistente automático
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

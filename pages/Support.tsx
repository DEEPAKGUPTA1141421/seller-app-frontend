
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { getSupportChatResponse } from '../services/geminiService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Support: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! Need help with an order?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const reply = await getSupportChatResponse(input);
    setMessages(prev => [...prev, { id: Date.now()+1, text: reply, sender: 'bot' }]);
  };

  return (
    <MobileLayout showBack title="Support Chat">
      <div className="flex flex-col h-full bg-gray-100">
         <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
            {messages.map(msg => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                     msg.sender === 'user' 
                     ? 'bg-blue-600 text-white rounded-br-none' 
                     : 'bg-white text-gray-800 rounded-bl-none'
                  }`}>
                     {msg.text}
                  </div>
               </div>
            ))}
            <div ref={bottomRef} />
         </div>
         
         <div className="bg-white p-3 border-t border-gray-200 fixed bottom-0 w-full max-w-md">
            <form onSubmit={handleSend} className="flex gap-2">
               <input 
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 placeholder="Type a message..."
                 className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-blue-500"
               />
               <button type="submit" className="bg-blue-600 text-white p-2 rounded-full">
                  <Send size={18} />
               </button>
            </form>
         </div>
      </div>
    </MobileLayout>
  );
};

export default Support;

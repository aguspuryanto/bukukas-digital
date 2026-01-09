
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatRoomProps {
  transactions: Transaction[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({ transactions }) => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: 'Halo! Saya asisten BukuKas Digital. Ada yang bisa saya bantu dengan laporan keuangan Anda hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const summary = transactions.length > 0 
        ? `Ringkasan: ${transactions.length} transaksi. Saldo saat ini relevan dengan input terakhir.`
        : "Belum ada data transaksi.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Anda adalah asisten keuangan profesional untuk aplikasi BukuKas Digital. Ringkas, ramah, gunakan Bahasa Indonesia. Konteks: ${summary}`
        }
      });

      const aiText = response.text || 'Maaf, saya tidak bisa merespon saat ini.';
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Oops! Terjadi kesalahan koneksi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] md:h-[calc(100vh-180px)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg text-white">
          <Bot size={18} />
        </div>
        <div>
          <h3 className="font-bold text-sm md:text-base text-slate-800">Asisten Keuangan AI</h3>
          <p className="text-[10px] md:text-xs text-slate-500">Tanyakan tentang data keuangan Anda</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 md:gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm' : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none">
              <Loader2 size={16} className="animate-spin text-slate-400" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pertanyaan..."
            className="flex-1 px-4 py-2 md:py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs md:text-sm shadow-sm transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-indigo-600 text-white p-2 md:p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

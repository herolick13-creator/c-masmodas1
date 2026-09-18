import React, { useState } from "react";
import { dataStore } from "@/services/dataStore";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const settings = dataStore.getSettings();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userMsg.trim() || "Olá! Gostaria de atendimento personalizado sobre os produtos da C-MAS Modas.";
    const url = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setUserMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover chat */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A0010] to-[#720018] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-[#C9A86A] flex items-center justify-center text-[#C9A86A] font-brand-title font-bold text-sm">
                  CM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#4A0010] rounded-full" />
              </div>
              <div>
                <p className="font-bold text-xs">C-MAS Modas • Atendimento</p>
                <p className="text-[10px] text-[#C9A86A] flex items-center gap-1">
                  <span>Online agora em Campo Grande</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#F8F5F3] space-y-2.5 text-xs text-slate-700 max-h-56 overflow-y-auto">
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-rose-100/60 max-w-[85%]">
              <p className="text-[11px] text-slate-800 leading-relaxed">
                Olá! Seja muito bem-vindo(a) à <strong>C-MAS Modas</strong>! ✨
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Como podemos ajudar você hoje com nossas peças, tamanhos ou entregas em Campo Grande?
              </p>
              <span className="text-[9px] text-slate-400 block text-right mt-1">
                {settings.phone}
              </span>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-[#F8F5F3] border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#720018]"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-[#720018] text-white hover:bg-[#4A0010] transition-colors shrink-0 shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="btn-whatsapp-floating"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#720018] text-white hover:bg-[#4A0010] shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-[#C9A86A]/60 cursor-pointer"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-[#C9A86A]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#720018]" />
        </div>
        <span className="font-semibold text-xs tracking-wide hidden sm:inline">
          WhatsApp da Loja
        </span>
      </button>
    </div>
  );
}

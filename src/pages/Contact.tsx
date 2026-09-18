import React, { useState } from "react";
import { dataStore } from "@/services/dataStore";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function Contact() {
  const settings = dataStore.getSettings();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.addTicket({
      userName: name.trim(),
      userEmail: email.trim(),
      subject: subject.trim() || "Contato pelo Site",
      category: "Geral",
      message: `${message.trim()} (Telefone: ${phone})`
    });
    setSent(true);
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
          Fale com a C-MAS
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Atendimento & Boutique Campo Grande
        </h1>
        <p className="text-xs text-slate-500">
          Estamos prontos para atender você com toda a dedicação que você merece.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-[#4A0010] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-[#C9A86A]/40">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C9A86A] uppercase tracking-widest">
              C-MAS Modas • Matriz
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#F8F5F3]">
              Nossos Canais Oficiais
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Visite nossa loja física ou fale diretamente com nossas consultoras de moda via WhatsApp.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#C9A86A] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Endereço da Boutique:</p>
                <p className="text-slate-300 mt-0.5">{settings.address}</p>
                <p className="text-slate-300">{settings.city} - {settings.state}, CEP: 79002-072</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#C9A86A] shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">WhatsApp de Vendas & Atendimento:</p>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Ol%C3%A1%20C-MAS%20Modas!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A86A] font-bold hover:underline block mt-0.5"
                >
                  {settings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#C9A86A] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">E-mail Comercial:</p>
                <p className="text-slate-300 mt-0.5">{settings.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#C9A86A] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Horário de Funcionamento:</p>
                <p className="text-slate-300 mt-0.5">Segunda a Sexta: 08h30 às 18h30</p>
                <p className="text-slate-300">Sábado: 08h30 às 14h00</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Ol%C3%A1%20C-MAS%20Modas!%20Gostaria%20de%20atendimento%20VIP.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#C9A86A] text-[#32000B] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp da Loja</span>
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-brand-title text-base font-bold text-slate-900">
              Envie uma Mensagem para Nossa Equipe
            </h3>
            <p className="text-xs text-slate-500">
              Preencha o formulário abaixo e responderemos no mesmo dia útil.
            </p>
          </div>

          {sent ? (
            <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm">Mensagem enviada com sucesso!</h4>
              <p className="text-xs text-emerald-700">
                Nossa equipe entrará em contato em breve através do seu WhatsApp ou e-mail.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-xs font-bold text-emerald-800 underline"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mariana Albuquerque"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Seu E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="mariana@exemplo.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="(67) 99619-4762"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Assunto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dúvida sobre tamanhos / Visita à loja"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Mensagem</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Escreva sua dúvida, sugestão ou solicitação de atendimento..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

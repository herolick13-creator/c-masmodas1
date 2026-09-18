import React, { useState } from "react";
import { dataStore } from "@/services/dataStore";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Package,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Send,
  Phone,
  MessageCircle,
  Clock,
  MapPin
} from "lucide-react";

export default function Support() {
  const settings = dataStore.getSettings();
  const [orderQuery, setOrderQuery] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [trackError, setTrackError] = useState("");

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // New Ticket Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<any>("Dúvida sobre Produto");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [createdProtocol, setCreatedProtocol] = useState<string | null>(null);

  const faqs = [
    {
      q: "Como funciona a entrega em Campo Grande - MS?",
      a: "Realizamos entregas expressas via motoboy para todos os bairros de Campo Grande. Pedidos com pagamento aprovado até as 14h são entregues no mesmo dia útil. O frete é grátis para compras acima de R$ 250,00."
    },
    {
      q: "Posso retirar meu pedido diretamente na loja física?",
      a: "Sim! Na finalização da compra, basta selecionar 'Retirada na Loja Física'. Assim que o pagamento for confirmado, seu pedido estará separado em nosso balcão na Av. Afonso Pena, 3450 - Centro, sem nenhum custo de frete."
    },
    {
      q: "Como funciona a política de trocas e devoluções?",
      a: "Você tem até 7 dias corridos após o recebimento para solicitar a troca ou devolução sem custo adicional. As peças devem estar com as etiquetas originais afixadas e sem indícios de uso. Você pode trocar diretamente na loja física ou solicitar envio reverso."
    },
    {
      q: "Quais são as formas de pagamento aceitas?",
      a: "Aceitamos PIX (com aprovação imediata), Cartão de Crédito em até 6x sem juros (todas as bandeiras) e Pagamento no Balcão ao retirar na loja física (Dinheiro, Débito ou Crédito)."
    },
    {
      q: "Como escolher o tamanho correto?",
      a: "Cada página de produto conta com medidas detalhadas e indicação do tecido. Se tiver dúvidas, clique no botão flutuante de WhatsApp (+55 67 99619-4762) e uma consultora ajudará você a escolher a numeração ideal antes do envio."
    }
  ];

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    setTrackedOrder(null);

    const cleanNum = orderQuery.replace(/#/g, "").trim();
    if (!cleanNum) return;

    const order = dataStore.getOrderByNumber(cleanNum);
    if (order) {
      setTrackedOrder(order);
    } else {
      setTrackError("Nenhum pedido encontrado com este número. Verifique o código e tente novamente.");
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const user = dataStore.getCurrentUser();
    const ticket = dataStore.addTicket({
      userId: user?.id,
      userName: name.trim(),
      userEmail: email.trim(),
      category,
      subject: subject.trim(),
      message: message.trim()
    });

    setCreatedProtocol(ticket.protocol);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
          Central de Ajuda C-MAS
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Como Podemos Ajudar Você Hoje?
        </h1>
        <p className="text-xs text-slate-500">
          Consulte o status do seu pedido, converse no WhatsApp oficial ou abra um chamado com protocolo.
        </p>
      </div>

      {/* Canais de Atendimento Rápido / Suporte Direto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* WhatsApp Suporte */}
        <a
          href="https://wa.me/5567996194762?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20suporte%20da%20C-MAS%20Modas."
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Atendimento Instantâneo</span>
              <h3 className="font-bold text-base text-slate-900">WhatsApp Suporte</h3>
              <p className="text-xs text-slate-600 mt-1">
                Fale diretamente com nossa consultora no número oficial de Campo Grande.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-200/60 flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-900 font-mono">+55 67 99619-4762</span>
            <span className="text-xs font-bold text-emerald-700 underline group-hover:translate-x-1 transition-transform">Iniciar Chat →</span>
          </div>
        </a>

        {/* Telefone / Loja Física */}
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#720018] text-white flex items-center justify-center shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#720018] uppercase tracking-wider">Central Telefônica</span>
              <h3 className="font-bold text-base text-slate-900">Ligação Direta</h3>
              <p className="text-xs text-slate-600 mt-1">
                Atendimento de Segunda a Sexta das 08h às 18h30 e Sábados das 08h às 14h.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 font-mono">+55 (67) 99619-4762</span>
            <a
              href="tel:+5567996194762"
              className="text-xs font-bold text-[#720018] hover:underline"
            >
              Ligar Agora
            </a>
          </div>
        </div>

        {/* Loja Física Campo Grande */}
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A86A] text-slate-900 flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Boutique Física</span>
              <h3 className="font-bold text-base text-slate-900">Balcão & Retiradas</h3>
              <p className="text-xs text-slate-600 mt-1">
                Av. Afonso Pena, 3450 - Centro, Campo Grande - MS.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#720018]" /> Seg a Sáb</span>
            <span className="font-medium text-slate-700">Retirada Imediata</span>
          </div>
        </div>
      </div>

      {/* Rastreio Rápido de Pedido */}
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-rose-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Truck className="w-5 h-5 text-[#720018]" />
          <span>Rastrear Pedido pelo Número</span>
        </div>

        <form onSubmit={handleTrackOrder} className="flex gap-2">
          <input
            type="text"
            placeholder="Digite o número do pedido (Ex: CMAS-8493)"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2.5 text-xs bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018] uppercase font-mono"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#720018] text-white font-bold text-xs rounded-xl uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow"
          >
            Rastrear
          </button>
        </form>

        {trackError && (
          <p className="text-xs text-red-600 font-medium flex items-center gap-1.5 pt-1">
            <AlertCircle className="w-4 h-4" /> {trackError}
          </p>
        )}

        {trackedOrder && (
          <div className="mt-4 p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3 text-xs animate-in fade-in">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 font-mono">
                Pedido #{trackedOrder.orderNumber}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#720018] font-bold border border-rose-200">
                {trackedOrder.status}
              </span>
            </div>

            <p className="text-slate-700">
              Cliente: <strong>{trackedOrder.customerName}</strong> • {trackedOrder.deliveryType}
            </p>

            <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>Total: R$ {trackedOrder.total.toFixed(2).replace(".", ",")}</span>
              <span>Data: {new Date(trackedOrder.createdAt).toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        )}
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
            Dúvidas Frequentes
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900">
            Perguntas mais comuns
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-rose-100/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#720018] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#720018] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Ticket Submit Form */}
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-brand-title text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#720018]" />
            <span>Abrir Chamado de Atendimento</span>
          </h3>
          <p className="text-xs text-slate-500">
            Receba um número de protocolo oficial para acompanhar sua solicitação.
          </p>
        </div>

        {createdProtocol ? (
          <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm">Protocolo Gerado com Sucesso!</h4>
            <p className="text-xs text-emerald-800 font-mono font-bold text-base">
              {createdProtocol}
            </p>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Nossa equipe já recebeu seu chamado e responderá por e-mail ou no painel da sua conta em até 24 horas.
            </p>
            <button
              onClick={() => setCreatedProtocol(null)}
              className="mt-2 text-xs font-bold text-[#720018] underline"
            >
              Abrir outra solicitação
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Albuquerque"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
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
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Categoria do Chamado</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl font-medium"
                >
                  <option value="Dúvida sobre Produto">Dúvida sobre Produto / Medidas</option>
                  <option value="Troca ou Devolução">Troca ou Devolução</option>
                  <option value="Entrega e Rastreio">Entrega e Rastreio</option>
                  <option value="Financeiro / Pagamento">Financeiro / Pagamento</option>
                  <option value="Outro">Outro Assunto</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Assunto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Solicitação de troca de tamanho"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Descrição do Problema / Dúvida</label>
              <textarea
                required
                rows={4}
                placeholder="Detalhe o ocorrido, informando número do pedido ou peça..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Chamado com Protocolo</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

import React from "react";
import { ShieldCheck, RotateCcw, Truck, Lock, FileText } from "lucide-react";

export default function Policies() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
          Transparência & Segurança
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Políticas da Loja C-MAS Modas
        </h1>
        <p className="text-xs text-slate-500">
          Conheça nossas diretrizes de entrega em Campo Grande, trocas, garantias e privacidade.
        </p>
      </div>

      <div className="space-y-8 text-xs text-slate-700 leading-relaxed">
        {/* Trocas e Devoluções */}
        <section className="bg-white p-8 rounded-3xl border border-rose-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <RotateCcw className="w-5 h-5 text-[#720018]" />
            <h2>Política de Trocas e Devoluções (CDC)</h2>
          </div>
          <p>
            Nosso compromisso é com a sua total satisfação. Em conformidade com o Código de Defesa do Consumidor, aceitamos solicitações de troca ou devolução no prazo de até <strong>7 (sete) dias corridos</strong> a partir da data de recebimento do pedido ou da retirada na loja física.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>As peças devem estar com as etiquetas e lacres originais intactos;</li>
            <li>Não serão aceitas peças com indícios de lavagem, uso, odores ou alterações feitas pelo cliente (bainhas, ajustes);</li>
            <li>A troca pode ser realizada presencialmente na nossa loja física na Av. Afonso Pena, 3450 - Centro, Campo Grande/MS, ou solicitada via atendimento no WhatsApp;</li>
            <li>O reembolso de pagamentos efetuados via PIX é realizado no mesmo dia da conferência das peças devolvidas.</li>
          </ul>
        </section>

        {/* Entregas e Prazos */}
        <section className="bg-white p-8 rounded-3xl border border-rose-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Truck className="w-5 h-5 text-[#720018]" />
            <h2>Entregas em Campo Grande - MS</h2>
          </div>
          <p>
            Possuímos frota própria e convênio de motoboys para atendimento express em Campo Grande/MS:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Prazo:</strong> Pedidos aprovados até as 14h são entregues no mesmo dia útil. Pedidos após esse horário são entregues no próximo dia útil;</li>
            <li><strong>Taxa:</strong> Taxa fixa de R$ 15,00 para qualquer bairro de Campo Grande;</li>
            <li><strong>Frete Grátis:</strong> Concedido automaticamente para compras a partir de R$ 250,00;</li>
            <li><strong>Retirada na Loja:</strong> Sem custo adicional, com disponibilidade imediata após confirmação do pedido.</li>
          </ul>
        </section>

        {/* Privacidade e LGPD */}
        <section className="bg-white p-8 rounded-3xl border border-rose-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Lock className="w-5 h-5 text-[#720018]" />
            <h2>Privacidade e Proteção de Dados (LGPD)</h2>
          </div>
          <p>
            A C-MAS Modas preza pela confidencialidade das informações de seus clientes. Seus dados cadastrais (nome, telefone, CPF e endereço) são utilizados exclusivamente para o processamento de pedidos, faturamento e atendimento personalizado.
          </p>
          <p>
            Não comercializamos nem compartilhamos seus dados com terceiros para fins publicitários não autorizados.
          </p>
        </section>
      </div>
    </div>
  );
}

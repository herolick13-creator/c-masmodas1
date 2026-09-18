import React from "react";
import { Link } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Sparkles, MapPin, Heart, ShieldCheck, ArrowRight, Award, Scissors, Users } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function About() {
  const settings = dataStore.getSettings();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="relative bg-[#4A0010] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C9A86A]/40 text-[#C9A86A] text-xs uppercase font-bold tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nossa Trajetória & Propósito</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold">
            A Tradição da Elegância em Campo Grande
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Unindo alta costura, alfaiataria de corte impecável e o acolhimento caloroso do Mato Grosso do Sul.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
              Sobre a C-MAS Modas
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 leading-tight">
              Mais do que moda: vestimos a sua melhor versão.
            </h2>
            <p>
              Fundada em Campo Grande - MS, a <strong>C-MAS Modas</strong> nasceu com a missão de transformar o vestir em uma experiência de sofisticação, conforto e autenticidade. Atendemos aos públicos feminino, masculino, unissex, teen e infantil com peças confeccionadas em tecidos premium, corte apurado e acabamento impecável.
            </p>
            <p>
              Nossa boutique física, localizada na Av. Afonso Pena, no coração de Campo Grande, é um ponto de encontro para clientes que buscam consultoria de estilo e atendimento acolhedor. Com o lançamento de nossa plataforma online integrada, levamos a experiência C-MAS a todos os lares, mantendo o estoque unificado e a entrega expressa.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin className="w-5 h-5 text-[#720018]" />
                <span>{settings.address}, Campo Grande - MS</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
              alt="Loja C-MAS Modas em Campo Grande"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#720018]">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Alfaiataria Nobre</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Priorizamos tecidos de alta durabilidade, como crepe estruturado, linho puro e algodão egípcio, com modelagem pensada para o caimento perfeito.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#720018]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Atendimento Humanizado</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nossa equipe em Campo Grande presta consultoria exclusiva pelo WhatsApp e presencialmente, tirando medidas e esclarecendo dúvidas em tempo real.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-3">
            <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#720018]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Compromisso & Troca Fácil</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Garantia total de satisfação: 7 dias para troca na loja física ou por envio, com estorno transparente e suporte imediato.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#32000B] text-white border border-[#C9A86A]/40 space-y-4 shadow-xl">
          <BrandLogo size="md" variant="gold" />
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F8F5F3] pt-2">
            Venha nos Visitar ou Compre Online
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Estamos de portas abertas no Centro de Campo Grande para receber você com um café especial e as peças mais exclusivas da estação.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/loja"
              className="px-8 py-3 rounded-full bg-[#C9A86A] text-[#32000B] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow"
            >
              Ver Coleção Completa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

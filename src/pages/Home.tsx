import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Product, Category } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  MapPin,
  MessageCircle,
  Tag,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface HomeProps {
  onOpenCart: () => void;
}

export default function Home({ onOpenCart }: HomeProps) {
  const [products, setProducts] = useState<Product[]>(dataStore.getProducts());
  const [categories, setCategories] = useState<Category[]>(dataStore.getCategories());
  const [settings, setSettings] = useState(dataStore.getSettings());

  const reload = () => {
    setProducts(dataStore.getProducts());
    setCategories(dataStore.getCategories());
    setSettings(dataStore.getSettings());
  };

  useEffect(() => {
    reload();
    const unsub = dataStore.subscribe(reload);
    return () => unsub();
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival && p.active).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller && p.active).slice(0, 4);
  const onSaleProducts = products.filter((p) => p.isOnSale && p.active).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* LUXURY HERO BANNER */}
      <section className="relative overflow-hidden bg-[#32000B] text-white">
        {/* Background Image with dramatic gradient overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImage}
            alt="C-MAS Modas Coleção"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#32000B] via-[#4A0010]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#32000B] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col justify-center min-h-[580px]">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left duration-700">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Nova Coleção Outono / Inverno • C-MAS</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F8F5F3] leading-[1.15]">
              {settings.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              {settings.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/loja"
                id="hero-btn-shop"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A86A] to-[#B38D4F] text-[#32000B] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-black/40"
              >
                <span>Explorar Coleção</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=Ol%C3%A1%20C-MAS%20Modas!%20Gostaria%20de%20um%20atendimento%20exclusivo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs uppercase tracking-widest transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A86A]" />
                <span>Atendimento VIP</span>
              </a>
            </div>

            {/* Store Location Pill */}
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Loja física no Centro de Campo Grande - MS • Entregas em toda a cidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VALUE PROPOSITIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white shadow-lg border border-rose-100/80 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-[#720018]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Entrega Campo Grande</h4>
              <p className="text-[11px] text-slate-500">Expressa em todos os bairros</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white shadow-lg border border-rose-100/80 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-[#720018]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Retirada no Centro</h4>
              <p className="text-[11px] text-slate-500">Sem taxa de entrega na loja física</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white shadow-lg border border-rose-100/80 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-[#720018]">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">PIX Instantâneo</h4>
              <p className="text-[11px] text-slate-500">QR Code com aprovação na hora</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white shadow-lg border border-rose-100/80 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-[#720018]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Troca Garantida</h4>
              <p className="text-[11px] text-slate-500">7 dias com total suporte</p>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
            Explore por Universo
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
            Categorias Exclusivas C-MAS
          </h2>
          <p className="text-xs text-slate-500">
            Do clássico ao contemporâneo, peças criadas para valorizar a sua essência.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.filter(c => c.featured).map((cat) => (
            <Link
              key={cat.id}
              to={`/loja?categoria=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xs hover:shadow-xl transition-all duration-500 border border-rose-100"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#32000B] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-x-4 bottom-4 text-white">
                <span className="text-[10px] text-[#C9A86A] uppercase font-bold tracking-widest block mb-0.5">
                  Coleção
                </span>
                <h3 className="font-serif-luxury text-xl font-bold group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Ver peças</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NOVIDADES / NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#720018] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#C9A86A]" />
              <span>Lançamentos</span>
            </div>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              Novidades da Boutique
            </h2>
          </div>
          <Link
            to="/loja?novidades=true"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#720018] uppercase tracking-wider hover:text-[#4A0010] transition-colors"
          >
            <span>Ver todas as novidades</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} onOpenCart={onOpenCart} />
          ))}
        </div>
      </section>

      {/* EDITORIAL BANNER — CAMPO GRANDE BOUTIQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#4A0010] text-white overflow-hidden shadow-xl border border-[#C9A86A]/40 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-[#C9A86A] text-xs font-bold uppercase tracking-widest">
              <span>Boutique Física & Online</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal leading-tight text-[#F8F5F3]">
              A sofisticação da alta alfaiataria em Campo Grande.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Na C-MAS Modas, cada detalhe é pensado com carinho. Conheça nosso espaço aconchegante no Centro de Campo Grande ou receba suas peças no conforto de sua casa com entrega expressa e atendimento personalizado no WhatsApp.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/sobre"
                className="px-6 py-3 rounded-full bg-white text-[#4A0010] font-bold text-xs uppercase tracking-wider hover:bg-[#F8F5F3] transition-colors shadow"
              >
                Conheça Nossa História
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20atendimento%20ou%20tirar%20d%C3%BAvidas.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-[#C9A86A] text-[#C9A86A] font-bold text-xs uppercase tracking-wider hover:bg-[#C9A86A] hover:text-[#32000B] transition-colors"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop"
              alt="Boutique C-MAS Modas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A0010] via-transparent to-transparent hidden lg:block" />
          </div>
        </div>
      </section>

      {/* LOOKBOOK STREETWEAR & Y2K TRENDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#720018] text-xs font-bold uppercase tracking-widest border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>Lookbook Tendências 2026</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
            Streetwear Minimal & Grunge Prep
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Combinações completas com caimento impecável. Compre as peças individuais ou o look completo com valor promocional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LOOK 1: ALL-BLACK STREETWEAR */}
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col md:flex-row">
            <div className="md:w-1/2 relative bg-neutral-900 aspect-3/4 md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
                alt="Look All-Black Streetwear"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#C9A86A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C9A86A]/40">
                Look All-Black
              </div>
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#720018] uppercase tracking-wider">
                  Streetwear & Alfaiataria
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-slate-900 leading-snug">
                  Composição All-Black Minimal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jaqueta bomber de couro sintético fosco sobreposta com calça baggy em sarja encorpada e cinto clássico.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">• Jaqueta Bomber Couro</span>
                    <span className="font-bold text-slate-900">R$ 329,90</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">• Calça Baggy Trousers</span>
                    <span className="font-bold text-slate-900">R$ 219,90</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Look Completo:</span>
                  <div>
                    <span className="text-xs line-through text-slate-400 mr-2">R$ 649,90</span>
                    <span className="text-base font-bold text-[#720018]">R$ 529,90</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/produto/look-completo-all-black-streetwear-bomber-baggy"
                    className="w-full text-center py-2.5 px-3 rounded-xl bg-[#720018] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0010] transition-colors"
                  >
                    Ver Look
                  </Link>
                  <Link
                    to="/produto/jaqueta-bomber-streetwear-couro-ecologico-all-black"
                    className="w-full text-center py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                  >
                    Jaqueta
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* LOOK 2: Y2K GRUNGE PREP */}
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col md:flex-row">
            <div className="md:w-1/2 relative bg-neutral-100 aspect-3/4 md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                alt="Look Y2K Grunge Prep"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#4A0010]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                Look Y2K Prep
              </div>
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#720018] uppercase tracking-wider">
                  Dark Academia & Grunge
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-slate-900 leading-snug">
                  Composição Camisa Oversized & Jeans Baggy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Camisa de popeline branca com gravata slim listrada vinho acompanhada de jeans ultra baggy em cinza estonado vintage.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">• Camisa + Gravata Vinho</span>
                    <span className="font-bold text-slate-900">R$ 199,90</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">• Jeans Baggy Estonado</span>
                    <span className="font-bold text-slate-900">R$ 239,90</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Look Completo:</span>
                  <div>
                    <span className="text-xs line-through text-slate-400 mr-2">R$ 499,90</span>
                    <span className="text-base font-bold text-[#720018]">R$ 419,90</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/produto/look-completo-y2k-grunge-prep-camisa-gravata-jeans-baggy"
                    className="w-full text-center py-2.5 px-3 rounded-xl bg-[#720018] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0010] transition-colors"
                  >
                    Ver Look
                  </Link>
                  <Link
                    to="/produto/camisa-social-oversized-popeline-gravata-listrada-vinho"
                    className="w-full text-center py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                  >
                    Camisa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIS VENDIDOS / BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
              Favoritos dos Clientes
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              Peças Mais Vendidas
            </h2>
          </div>
          <Link
            to="/loja?maisVendidos=true"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#720018] uppercase tracking-wider hover:text-[#4A0010] transition-colors"
          >
            <span>Ver mais procurados</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onOpenCart={onOpenCart} />
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="bg-[#faedf0]/50 py-16 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
              Experiência C-MAS
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
              O que dizem nossas clientes
            </h2>
            <p className="text-xs text-slate-500">
              Avaliações reais de quem já se encantou com nossas peças e atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "O vestido midi em tom de vinho é maravilhoso! O caimento é perfeito e a entrega em Campo Grande foi feita no mesmo dia do pedido. Atendimento nota 10!"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-900">Mariana Albuquerque</span>
                <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Comprei a camisa social de algodão egípcio para um evento e recebi muitos elogios. O tecido é muito nobre e a retirada na loja física foi super rápida."
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-900">Carlos Eduardo M.</span>
                <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "A alfaiataria da C-MAS Modas tem um acabamento impecável. O blazer veste como se tivesse sido feito sob medida. Com certeza comprarei mais vezes!"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-900">Patrícia Fonseca</span>
                <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER / VIP CLUB */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-white shadow-xl border border-rose-200/80 space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-[#720018] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-[#C9A86A]" />
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900">
            Cadastre-se no Clube VIP C-MAS
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Receba com exclusividade pré-vendas de novas coleções, cupons de desconto especiais e convites para eventos na loja física.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Obrigado por se inscrever no Clube VIP C-MAS! Você receberá ofertas exclusivas.");
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="Digite seu melhor e-mail"
              required
              className="flex-1 px-4 py-3 rounded-full text-xs bg-[#F8F5F3] border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#720018]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow cursor-pointer"
            >
              Participar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

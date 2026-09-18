import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/common/BrandLogo";
import { dataStore } from "@/services/dataStore";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  Sparkles,
  Instagram,
  Facebook,
  Heart,
  Truck
} from "lucide-react";

interface FooterProps {
  onReplayCurtain?: () => void;
}

export default function Footer({ onReplayCurtain }: FooterProps) {
  const settings = dataStore.getSettings();

  return (
    <footer className="bg-[#32000B] text-slate-300 border-t border-[#720018]/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-rose-900/40 text-center md:text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-xl bg-[#720018] text-[#C9A86A]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F8F5F3] uppercase tracking-wider">Entrega em Campo Grande</p>
              <p className="text-[11px] text-slate-400">Entrega rápida para todos os bairros</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-xl bg-[#720018] text-[#C9A86A]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F8F5F3] uppercase tracking-wider">PIX com Confirmação</p>
              <p className="text-[11px] text-slate-400">QR Code automático com segurança</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-xl bg-[#720018] text-[#C9A86A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F8F5F3] uppercase tracking-wider">Garantia & Troca Fácil</p>
              <p className="text-[11px] text-slate-400">7 dias para troca na loja ou online</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-xl bg-[#720018] text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F8F5F3] uppercase tracking-wider">Atendimento de Boutique</p>
              <p className="text-[11px] text-slate-400">Consultoria personalizada no WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" variant="gold" />
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              A <strong>C-MAS Modas</strong> une a tradição da alfaiataria fina com as principais tendências contemporâneas. Roupas que expressam sofisticação, autenticidade e beleza única.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city} - {settings.state}, CEP {settings.postalCode}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>{settings.phone} / WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>{settings.openingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${settings.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 text-[#C9A86A] hover:bg-[#720018] hover:text-white transition-colors"
                title="Siga no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://facebook.com/${settings.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 text-[#C9A86A] hover:bg-[#720018] hover:text-white transition-colors"
                title="Siga no Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Categorias */}
          <div>
            <p className="text-xs font-bold text-[#C9A86A] uppercase tracking-widest mb-4">
              Coleções
            </p>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/loja?categoria=Feminino" className="hover:text-[#C9A86A] transition-colors">Moda Feminina</Link></li>
              <li><Link to="/loja?categoria=Masculino" className="hover:text-[#C9A86A] transition-colors">Moda Masculina</Link></li>
              <li><Link to="/loja?categoria=Unissex" className="hover:text-[#C9A86A] transition-colors">Linha Unissex</Link></li>
              <li><Link to="/loja?categoria=Teen" className="hover:text-[#C9A86A] transition-colors">Moda Teen</Link></li>
              <li><Link to="/loja?categoria=Infantil" className="hover:text-[#C9A86A] transition-colors">Linha Petit Infantil</Link></li>
              <li><Link to="/loja?subcategoria=Vestidos" className="hover:text-[#C9A86A] transition-colors">Vestidos Exclusivos</Link></li>
              <li><Link to="/loja?subcategoria=Alfaiataria" className="hover:text-[#C9A86A] transition-colors">Blazers & Alfaiataria</Link></li>
            </ul>
          </div>

          {/* Col 4: Institucional & Atendimento */}
          <div>
            <p className="text-xs font-bold text-[#C9A86A] uppercase tracking-widest mb-4">
              Ajuda & Suporte
            </p>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/sobre" className="hover:text-[#C9A86A] transition-colors">Sobre a C-MAS Modas</Link></li>
              <li><Link to="/suporte" className="hover:text-[#C9A86A] transition-colors">Central de Atendimento & FAQ</Link></li>
              <li><Link to="/politicas" className="hover:text-[#C9A86A] transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/termos" className="hover:text-[#C9A86A] transition-colors">Termos e Condições</Link></li>
              <li><Link to="/privacidade" className="hover:text-[#C9A86A] transition-colors">Privacidade & LGPD</Link></li>
              <li><Link to="/contato" className="hover:text-[#C9A86A] transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Col 5: Pagamentos & Retirada */}
          <div>
            <p className="text-xs font-bold text-[#C9A86A] uppercase tracking-widest mb-4">
              Formas de Pagamento
            </p>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <QrCode className="w-4 h-4 text-[#C9A86A]" />
                <span>PIX com aprovação instantânea</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CreditCard className="w-4 h-4 text-[#C9A86A]" />
                <span>Cartões de Crédito até 6x</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#C9A86A]" />
                <span>Retirada Grátis no Centro de Campo Grande</span>
              </div>

              {onReplayCurtain && (
                <div className="pt-4">
                  <button
                    onClick={onReplayCurtain}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-serif-luxury uppercase tracking-wider text-[#C9A86A] border border-[#C9A86A]/40 hover:bg-[#720018] hover:text-white transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rever Abertura de Gala</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-rose-900/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} C-MAS Modas LTDA. CNPJ: 42.890.123/0001-45. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com sofisticação em Campo Grande - MS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

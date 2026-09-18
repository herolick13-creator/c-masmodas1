import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BrandLogo from "@/components/common/BrandLogo";
import { dataStore } from "@/services/dataStore";
import { User, UserRole } from "@/types";
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  Store,
  Package,
  Layers
} from "lucide-react";

interface NavbarProps {
  onOpenCart: () => void;
  onOpenSearch?: () => void;
  onReplayCurtain?: () => void;
}

export default function Navbar({ onOpenCart, onOpenSearch, onReplayCurtain }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(dataStore.getCurrentUser());
  const [cartCount, setCartCount] = useState<number>(0);
  const [favCount, setFavCount] = useState<number>(0);
  const [settings, setSettings] = useState(dataStore.getSettings());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateState = () => {
    setCurrentUser(dataStore.getCurrentUser());
    const cart = dataStore.getCart();
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    setFavCount(dataStore.getFavorites().length);
    setSettings(dataStore.getSettings());
  };

  useEffect(() => {
    updateState();
    const unsub = dataStore.subscribe(updateState);
    return () => unsub();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/loja?busca=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dataStore.logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Início", path: "/" },
    { label: "Coleção Completa", path: "/loja" },
    { label: "Feminino", path: "/loja?categoria=Feminino" },
    { label: "Masculino", path: "/loja?categoria=Masculino" },
    { label: "Teen & Infantil", path: "/loja?categoria=Teen" },
    { label: "Alfaiataria", path: "/loja?subcategoria=Alfaiataria" },
    { label: "Promoções", path: "/loja?promocoes=true", highlight: true },
    { label: "Sobre Nós", path: "/sobre" },
    { label: "Contato", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100/60 shadow-xs transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#4A0010] text-[#F8F5F3] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
            <span className="truncate font-light text-[11px] md:text-xs">
              {settings.announcementText}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0 font-medium">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Ol%C3%A1%20C-MAS%20Modas!%20Gostaria%20de%20informa%C3%A7%C3%B5es.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C9A86A] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {settings.phone}</span>
            </a>
            <span className="text-white/30">|</span>
            <span className="text-slate-300">Campo Grande - MS</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu trigger */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#720018] hover:bg-rose-50 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <BrandLogo size="md" variant="burgundy" />
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              id="search-input-desktop"
              type="text"
              placeholder="Buscar vestidos, camisas de linho, alfaiataria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#F8F5F3] border border-rose-200/80 rounded-full focus:outline-none focus:ring-2 focus:ring-[#720018]/20 focus:border-[#720018] transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Curtain Replay */}
            {onReplayCurtain && (
              <button
                onClick={onReplayCurtain}
                title="Abertura de Gala das Cortinas"
                className="hidden xl:inline-flex items-center gap-1 text-[11px] font-serif-luxury uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C9A86A]/40 text-[#720018] bg-rose-50/50 hover:bg-[#720018] hover:text-white transition-all cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#C9A86A]" />
                <span>Cortinas</span>
              </button>
            )}

            {/* Admin / Employee Quick Access Badge if logged with staff role */}
            {currentUser && currentUser.role !== "CLIENTE" && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#720018] text-[#F8F5F3] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#4A0010] transition-colors shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span className="hidden sm:inline">Painel</span> {currentUser.role}
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/favoritos"
              id="nav-wishlist-link"
              className="relative p-2 text-slate-700 hover:text-[#720018] hover:bg-rose-50 rounded-full transition-colors"
              title="Meus Favoritos"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#720018] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-[#720018] bg-rose-50/80 hover:bg-rose-100 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sacola de Compras"
            >
              <ShoppingBag className="w-5 h-5 text-[#720018]" />
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-[#720018] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    id="btn-user-profile"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-rose-50 text-slate-700 transition-all cursor-pointer border border-rose-200/60"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-[#720018]"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#720018] text-white flex items-center justify-center text-xs font-bold">
                        {currentUser.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden md:inline text-xs font-medium text-slate-800 max-w-[100px] truncate">
                      {currentUser.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-rose-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-[#720018] border border-rose-200">
                          {currentUser.role}
                        </span>
                      </div>

                      {currentUser.role !== "CLIENTE" && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#720018] hover:bg-rose-50"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#720018]" />
                          <span>Painel Administrativo</span>
                        </Link>
                      )}

                      <Link
                        to="/cliente"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-rose-50"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        <span>Meus Pedidos & Conta</span>
                      </Link>

                      <Link
                        to="/favoritos"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-rose-50"
                      >
                        <Heart className="w-4 h-4 text-slate-400" />
                        <span>Lista de Desejos</span>
                      </Link>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sair da conta</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  id="nav-login-link"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#720018] bg-rose-50 hover:bg-[#720018] hover:text-white px-3.5 py-1.5 rounded-full border border-rose-200 transition-all"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Entrar</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-8 pt-3 border-t border-rose-100/70 mt-2.5">
          {navLinks.map((item) => {
            const isActive = location.pathname + location.search === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                  item.highlight
                    ? "text-[#720018] font-bold"
                    : isActive
                    ? "text-[#720018] font-semibold"
                    : "text-slate-600 hover:text-[#720018]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#720018] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[104px] bg-black/40 backdrop-blur-xs z-40">
          <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mb-6 relative">
                <input
                  type="text"
                  placeholder="O que você procura hoje?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F8F5F3] border border-rose-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#720018]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </form>

              <p className="text-[11px] font-bold text-[#720018] uppercase tracking-widest mb-3">
                Categorias & Coleções
              </p>
              <div className="flex flex-col gap-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-800 hover:text-[#720018] py-1 border-b border-slate-100 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="text-[10px] bg-rose-100 text-[#720018] px-2 py-0.5 rounded-full font-bold">
                        OFF
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Store Information */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-600 flex flex-col gap-2">
              <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#720018]" />
                <span>Loja Física em Campo Grande - MS</span>
              </p>
              <p className="text-slate-500 text-[11px]">{settings.address}</p>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#720018] text-white py-2 rounded-full font-semibold text-xs shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

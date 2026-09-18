import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { User, Order, SupportTicket, Product } from "@/types";
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  MapPin,
  MessageSquare,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

interface CustomerAccountProps {
  onOpenCart: () => void;
}

export default function CustomerAccount({ onOpenCart }: CustomerAccountProps) {
  const navigate = useNavigate();
  const settings = dataStore.getSettings();
  const [currentUser, setCurrentUser] = useState<User | null>(dataStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "tickets" | "profile">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Profile Edit State
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [cpf, setCpf] = useState(currentUser?.cpf || "");

  const reloadData = () => {
    const user = dataStore.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
      setCpf(user.cpf || "");
      const allOrders = dataStore.getOrders();
      setOrders(allOrders.filter((o) => o.userId === user.id || o.customerEmail === user.email));
      setTickets(dataStore.getTickets().filter((t) => t.userId === user.id || t.userEmail === user.email));
    }
    const favIds = dataStore.getFavorites();
    setFavoriteProducts(dataStore.getProducts().filter((p) => favIds.includes(p.id)));
  };

  useEffect(() => {
    reloadData();
    const unsub = dataStore.subscribe(reloadData);
    return () => unsub();
  }, []);

  const handleLogout = () => {
    dataStore.logout();
    navigate("/");
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const users = dataStore.getUsers();
    const idx = users.findIndex((u) => u.id === currentUser.id);
    if (idx > -1) {
      users[idx].name = name;
      users[idx].phone = phone;
      users[idx].cpf = cpf;
      dataStore.saveUsers(users);
      dataStore.setCurrentUser(users[idx]);
      alert("Dados atualizados com sucesso!");
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-[#720018] flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">Minha Conta C-MAS</h2>
        <p className="text-xs text-slate-500">
          Faça login para acompanhar seus pedidos, consultar histórico e gerenciar seus dados.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/login"
            className="w-full py-3 rounded-full bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010]"
          >
            Entrar com E-mail
          </Link>
          <Link
            to="/cadastro"
            className="w-full py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50"
          >
            Criar Nova Conta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#4A0010] text-[#C9A86A] font-brand-title font-bold text-2xl flex items-center justify-center border-2 border-[#C9A86A]/60 shadow">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900">
                Olá, {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-50 text-[#720018] border border-rose-200">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role !== "CLIENTE" && (
            <Link
              to="/admin"
              className="px-5 py-2.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow"
            >
              Painel Administrativo
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Tabs Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-rose-100 shadow-sm space-y-1">
          {[
            { id: "orders", label: "Meus Pedidos", icon: ShoppingBag, badge: orders.length },
            { id: "wishlist", label: "Lista de Desejos", icon: Heart, badge: favoriteProducts.length },
            { id: "tickets", label: "Atendimento & Suporte", icon: MessageSquare, badge: tickets.length },
            { id: "addresses", label: "Endereços em Campo Grande", icon: MapPin },
            { id: "profile", label: "Dados Cadastrais", icon: UserIcon },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#720018] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C9A86A]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isActive ? "bg-white/20 text-white" : "bg-rose-50 text-[#720018] font-bold"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          {/* TAB 1: MEUS PEDIDOS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-brand-title text-base font-bold text-slate-900">
                  Meus Pedidos & Histórico de Compras ({orders.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Acompanhe o status de entrega em tempo real de cada pedido C-MAS.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="font-serif-luxury text-xl font-bold text-slate-800">
                    Você ainda não fez nenhum pedido
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Aproveite para conferir a nova coleção outono/inverno de vestidos e alfaiataria.
                  </p>
                  <Link
                    to="/loja"
                    className="inline-flex px-6 py-2.5 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Explorar Produtos
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-[#F8F5F3] space-y-4 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Pedido
                          </span>
                          <p className="font-mono font-bold text-slate-900 text-sm">
                            #{ord.orderNumber}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Data
                          </span>
                          <p className="text-slate-700">
                            {new Date(ord.createdAt).toLocaleDateString("pt-BR")}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Total
                          </span>
                          <p className="font-bold text-[#720018]">
                            R$ {ord.total.toFixed(2).replace(".", ",")}
                          </p>
                        </div>

                        <div>
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#720018] border border-rose-200 shadow-xs">
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.productName}
                                className="w-10 h-12 object-cover rounded-lg border border-slate-200"
                              />
                              <div>
                                <p className="font-semibold text-slate-900">{item.productName}</p>
                                <p className="text-[11px] text-slate-500">
                                  {item.colorName} • Tam {item.size} • Qtd: {item.quantity} un.
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-slate-800">
                              R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Status / Tracking Note */}
                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#720018]" />
                          <span>
                            {ord.deliveryType}: <strong>{ord.status}</strong>
                          </span>
                        </div>
                        <a
                          href={`https://wa.me/${settings.whatsapp}?text=Ol%C3%A1%20C-MAS%20Modas!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20do%20meu%20pedido%20${ord.orderNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#720018] font-bold hover:underline"
                        >
                          Dúvidas no WhatsApp ➔
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LISTA DE DESEJOS */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-brand-title text-base font-bold text-slate-900">
                  Meus Favoritos C-MAS ({favoriteProducts.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Peças que você salvou para adquirir em outro momento.
                </p>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="font-serif-luxury text-xl font-bold text-slate-800">
                    Sua lista de desejos está vazia
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore o catálogo e clique no ícone de coração para guardar suas peças preferidas.
                  </p>
                  <Link
                    to="/loja"
                    className="inline-flex px-6 py-2.5 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Ver Coleção
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteProducts.map((p) => (
                    <ProductCard key={p.id} product={p} onOpenCart={onOpenCart} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TICKETS & SUPORTE */}
          {activeTab === "tickets" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-brand-title text-base font-bold text-slate-900">
                    Minhas Solicitações de Suporte ({tickets.length})
                  </h3>
                  <p className="text-xs text-slate-500">Histórico de dúvidas, trocas e solicitações.</p>
                </div>
                <Link
                  to="/suporte"
                  className="px-4 py-2 bg-[#720018] text-white text-xs font-bold rounded-xl uppercase tracking-wider shadow"
                >
                  Abrir Novo Chamado
                </Link>
              </div>

              {tickets.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">
                  Você não possui tickets abertos no momento.
                </p>
              ) : (
                <div className="space-y-4">
                  {tickets.map((tck) => (
                    <div key={tck.id} className="p-4 rounded-2xl bg-[#F8F5F3] border border-slate-200 text-xs space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                          {tck.protocol}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            tck.status === "Resolvido"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tck.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900">{tck.subject}</h4>
                        <p className="text-slate-600 mt-1 italic">"{tck.message}"</p>
                      </div>

                      {tck.reply && (
                        <div className="p-3 bg-white rounded-xl border border-rose-100 space-y-1">
                          <p className="font-bold text-[#720018]">Resposta da C-MAS Modas:</p>
                          <p className="text-slate-700">{tck.reply}</p>
                          <p className="text-[10px] text-slate-400">Por: {tck.repliedBy}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ENDEREÇOS */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-brand-title text-base font-bold text-slate-900">
                  Endereços para Entrega em Campo Grande - MS
                </h3>
                <p className="text-xs text-slate-500">
                  Seus locais salvos para agilizar a entrega expressa.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F5F3] border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#720018]" />
                    <span>Endereço Principal</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-[#720018] font-bold text-[10px]">
                    Padrão
                  </span>
                </div>
                <p className="text-slate-700">
                  Rua Euclides da Cunha, 1420 - Apto 82
                  <br />
                  Jardim dos Estados — Campo Grande/MS
                  <br />
                  CEP: 79020-230
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: DADOS CADASTRAIS */}
          {activeTab === "profile" && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-brand-title text-base font-bold text-slate-900">
                  Editar Dados Cadastrais
                </h3>
                <p className="text-xs text-slate-500">Atualize seu nome, telefone e CPF.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">E-mail (Login)</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full px-3.5 py-2.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">CPF</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

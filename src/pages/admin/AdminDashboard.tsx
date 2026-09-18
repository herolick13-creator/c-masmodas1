import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import {
  User,
  UserRole,
  Product,
  Order,
  InventoryMovement,
  Coupon,
  SupportTicket,
  AuditLog,
  StoreSettings,
  OrderStatus,
  ProductVariant
} from "@/types";
import {
  ShieldCheck,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  MessageSquare,
  Settings,
  FileText,
  DollarSign,
  TrendingUp,
  Store,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  ChevronRight,
  SlidersHorizontal,
  Trash2,
  Edit,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  QrCode,
  CreditCard,
  Banknote,
  Send,
  Eye,
  Award,
  UserCheck,
  UserX,
  Target,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  XCircle,
  Flame,
  Percent,
  UserPlus,
  Lock,
  Key,
  EyeOff
} from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(dataStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>("overview");

  // App Data state
  const [products, setProducts] = useState<Product[]>(dataStore.getProducts());
  const [orders, setOrders] = useState<Order[]>(dataStore.getOrders());
  const [inventoryLogs, setInventoryLogs] = useState<InventoryMovement[]>(dataStore.getInventoryLogs());
  const [usersList, setUsersList] = useState<User[]>(dataStore.getUsers());
  const [coupons, setCoupons] = useState<Coupon[]>(dataStore.getCoupons());
  const [tickets, setTickets] = useState<SupportTicket[]>(dataStore.getTickets());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(dataStore.getAuditLogs());
  const [settings, setSettings] = useState<StoreSettings>(dataStore.getSettings());

  // POS (PDV) State
  const [posSearch, setPosSearch] = useState("");
  const [posCart, setPosCart] = useState<{
    product: Product;
    variant: ProductVariant;
    qty: number;
    unitPrice: number;
  }[]>([]);
  const [posCustomerName, setPosCustomerName] = useState("Cliente Balcão");
  const [posCustomerPhone, setPosCustomerPhone] = useState("");
  const [posCustomerCpf, setPosCustomerCpf] = useState("");
  const [posPaymentMethod, setPosPaymentMethod] = useState<"Dinheiro na Retirada" | "Cartão na Loja" | "PIX">("Cartão na Loja");
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posSuccessOrder, setPosSuccessOrder] = useState<Order | null>(null);
  const [posSellerId, setPosSellerId] = useState<string>("usr-vendedor-1");

  // Performance Split State ("Quem Vendeu vs. Quem Não Vendeu")
  const [salesSplitTab, setSalesSplitTab] = useState<"split" | "sellers_with_sales" | "sellers_without_sales" | "products_split">("split");
  const [salesSearch, setSalesSearch] = useState<string>("");
  const [selectedSellerOrdersModal, setSelectedSellerOrdersModal] = useState<{
    open: boolean;
    sellerName: string;
    sellerId: string;
    orders: Order[];
  }>({
    open: false,
    sellerName: "",
    sellerId: "",
    orders: []
  });

  // Reassign Seller Modal
  const [reassignSellerModal, setReassignSellerModal] = useState<{
    open: boolean;
    order?: Order;
    sellerId: string;
  }>({
    open: false,
    sellerId: ""
  });

  // Order seller filter
  const [orderSellerFilter, setOrderSellerFilter] = useState<string>("all");

  // Stock Adjustment Modal
  const [stockModal, setStockModal] = useState<{
    open: boolean;
    product?: Product;
    variant?: ProductVariant;
    changeQty: number;
    reason: string;
    type: InventoryMovement["type"];
  }>({
    open: false,
    changeQty: 1,
    reason: "Recebimento de lote de mercadoria",
    type: "ENTRADA"
  });

  // Order Status Update Modal
  const [orderStatusModal, setOrderStatusModal] = useState<{
    open: boolean;
    order?: Order;
    newStatus: OrderStatus;
    note: string;
  }>({
    open: false,
    newStatus: "Em preparação",
    note: ""
  });

  // Ticket Reply Modal
  const [ticketReplyModal, setTicketReplyModal] = useState<{
    open: boolean;
    ticket?: SupportTicket;
    replyText: string;
  }>({
    open: false,
    replyText: ""
  });

  // New Product Modal
  const [newProductModal, setNewProductModal] = useState(false);
  const [npName, setNpName] = useState("");
  const [npCategory, setNpCategory] = useState("Feminino");
  const [npSubCategory, setNpSubCategory] = useState("Vestidos");
  const [npPrice, setNpPrice] = useState("");
  const [npPromoPrice, setNpPromoPrice] = useState("");
  const [npFabric, setNpFabric] = useState("Crepe Alfaiataria 96% Poliéster, 4% Elastano");
  const [npDesc, setNpDesc] = useState("");
  const [npImage, setNpImage] = useState("https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop");
  const [npColorName, setNpColorName] = useState("Vinho C-MAS");
  const [npColorHex, setNpColorHex] = useState("#720018");
  const [npSizes, setNpSizes] = useState("P, M, G, GG");
  const [npInitialStock, setNpInitialStock] = useState("5");

  // New Coupon Modal
  const [newCouponModal, setNewCouponModal] = useState(false);
  const [ncCode, setNcCode] = useState("");
  const [ncDesc, setNcDesc] = useState("");
  const [ncDiscount, setNcDiscount] = useState("");
  const [ncType, setNcType] = useState<"percentage" | "fixed">("percentage");
  const [ncMinOrder, setNcMinOrder] = useState("200");

  // Admin Security & Confidentiality Modals
  const [adminUnlockModal, setAdminUnlockModal] = useState(false);
  const [adminUnlockPassword, setAdminUnlockPassword] = useState("");
  const [adminUnlockError, setAdminUnlockError] = useState("");
  const [showAdminUnlockPass, setShowAdminUnlockPass] = useState(false);

  const [changeAdminPassModal, setChangeAdminPassModal] = useState<{
    open: boolean;
    userId: string;
    userName: string;
  }>({ open: false, userId: "", userName: "" });
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");
  const [changePassError, setChangePassError] = useState("");
  const [changePassSuccess, setChangePassSuccess] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);

  const reloadData = () => {
    setCurrentUser(dataStore.getCurrentUser());
    setProducts(dataStore.getProducts());
    setOrders(dataStore.getOrders());
    setInventoryLogs(dataStore.getInventoryLogs());
    setUsersList(dataStore.getUsers());
    setCoupons(dataStore.getCoupons());
    setTickets(dataStore.getTickets());
    setAuditLogs(dataStore.getAuditLogs());
    setSettings(dataStore.getSettings());
  };

  useEffect(() => {
    reloadData();
    const unsub = dataStore.subscribe(reloadData);
    return () => unsub();
  }, []);

  const handleRoleSwitch = (role: UserRole) => {
    if (role === "ADMINISTRADOR" && userRole !== "ADMINISTRADOR") {
      setAdminUnlockPassword("");
      setAdminUnlockError("");
      setAdminUnlockModal(true);
      return;
    }
    dataStore.switchUserRole(role);
  };

  const handleConfirmAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminUnlockError("");
    if (!adminUnlockPassword.trim()) {
      setAdminUnlockError("Por favor, digite a senha de administrador.");
      return;
    }
    if (dataStore.verifyAdminPassword(adminUnlockPassword.trim())) {
      dataStore.switchUserRole("ADMINISTRADOR");
      setAdminUnlockModal(false);
      setAdminUnlockPassword("");
    } else {
      setAdminUnlockError("Senha incorreta. Acesso restrito à diretoria da C-MAS Modas.");
    }
  };

  const handleChangeAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError("");
    setChangePassSuccess("");

    if (newAdminPassword.length < 4) {
      setChangePassError("A nova senha deve ter no mínimo 4 caracteres.");
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setChangePassError("As senhas digitadas não coincidem.");
      return;
    }

    const res = dataStore.updateUserPassword(changeAdminPassModal.userId, newAdminPassword);
    if (res.success) {
      setChangePassSuccess("Senha atualizada com sucesso! A nova senha está protegida.");
      setTimeout(() => {
        setChangeAdminPassModal({ open: false, userId: "", userName: "" });
        setNewAdminPassword("");
        setConfirmAdminPassword("");
        setChangePassSuccess("");
      }, 1500);
    } else {
      setChangePassError(res.error || "Erro ao atualizar senha.");
    }
  };

  // RBAC Permission Checks
  const userRole: UserRole = currentUser?.role || "VENDEDOR";
  const isAdmin = userRole === "ADMINISTRADOR";
  const isManagerOrAdmin = userRole === "ADMINISTRADOR" || userRole === "GERENTE";
  const isStaff = isManagerOrAdmin || userRole === "VENDEDOR";

  // Financial Stats Calculation
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelado")
    .reduce((acc, o) => acc + o.total, 0);

  const onlineOrdersCount = orders.filter((o) => o.channel === "online").length;
  const physicalSalesCount = orders.filter((o) => o.channel === "fisica").length;
  const lowStockVariantsCount = products.reduce((acc, p) => {
    return acc + p.variants.filter((v) => v.stock <= 3).length;
  }, 0);

  // Staff members (Vendedores, Gerentes e Administradores)
  const staffMembers = useMemo(() => {
    return usersList.filter(
      (u) => u.role === "VENDEDOR" || u.role === "GERENTE" || u.role === "ADMINISTRADOR"
    );
  }, [usersList]);

  // Performance calculations: Quem Vendeu vs Quem Não Vendeu
  const staffSalesStats = useMemo(() => {
    return staffMembers.map((staff) => {
      // Find orders matching this staff member
      const staffOrders = orders.filter((o) => {
        if (o.status === "Cancelado") return false;
        if (o.soldByEmployeeId && o.soldByEmployeeId === staff.id) return true;
        if (
          o.soldByEmployeeName &&
          staff.name &&
          o.soldByEmployeeName.toLowerCase().includes(staff.name.split(" ")[0].toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      const totalRevenue = staffOrders.reduce((acc, o) => acc + o.total, 0);
      const totalItems = staffOrders.reduce(
        (acc, o) => acc + o.items.reduce((sum, it) => sum + it.quantity, 0),
        0
      );
      const ordersCount = staffOrders.length;
      const averageTicket = ordersCount > 0 ? totalRevenue / ordersCount : 0;
      // Standard 5% commission for in-store fashion sales
      const commission = totalRevenue * 0.05;
      const hasSales = ordersCount > 0;
      const lastOrder = [...staffOrders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      return {
        staff,
        orders: staffOrders,
        totalRevenue,
        totalItems,
        ordersCount,
        averageTicket,
        commission,
        hasSales,
        lastSaleDate: lastOrder ? lastOrder.createdAt : null,
      };
    });
  }, [staffMembers, orders]);

  const sellersWithSales = useMemo(() => {
    return staffSalesStats
      .filter((s) => s.hasSales)
      .sort((a, b) => b.totalRevenue - a.totalRevenue);
  }, [staffSalesStats]);

  const sellersWithoutSales = useMemo(() => {
    return staffSalesStats.filter((s) => !s.hasSales);
  }, [staffSalesStats]);

  const totalStaffRevenue = useMemo(() => {
    return sellersWithSales.reduce((acc, s) => acc + s.totalRevenue, 0);
  }, [sellersWithSales]);

  const totalStaffOrders = useMemo(() => {
    return sellersWithSales.reduce((acc, s) => acc + s.ordersCount, 0);
  }, [sellersWithSales]);

  const totalStaffCommissions = useMemo(() => {
    return sellersWithSales.reduce((acc, s) => acc + s.commission, 0);
  }, [sellersWithSales]);

  // Product sales division (o que vendeu vs o que não vendeu)
  const productSalesStats = useMemo(() => {
    return products.map((prod) => {
      let totalSold = 0;
      let revenue = 0;
      orders.forEach((ord) => {
        if (ord.status === "Cancelado") return;
        ord.items.forEach((it) => {
          if (it.productId === prod.id) {
            totalSold += it.quantity;
            revenue += it.totalPrice;
          }
        });
      });
      const currentStock = prod.variants.reduce((acc, v) => acc + v.stock, 0);
      return {
        product: prod,
        totalSold,
        revenue,
        currentStock,
        hasSales: totalSold > 0
      };
    });
  }, [products, orders]);

  const productsWithSales = useMemo(() => {
    return productSalesStats
      .filter((p) => p.hasSales)
      .sort((a, b) => b.totalSold - a.totalSold);
  }, [productSalesStats]);

  const productsWithoutSales = useMemo(() => {
    return productSalesStats
      .filter((p) => !p.hasSales)
      .sort((a, b) => b.currentStock - a.currentStock);
  }, [productSalesStats]);

  // Filtered lists based on search
  const filteredWithSales = useMemo(() => {
    if (!salesSearch.trim()) return sellersWithSales;
    const q = salesSearch.toLowerCase();
    return sellersWithSales.filter(
      (s) => s.staff.name.toLowerCase().includes(q) || s.staff.email.toLowerCase().includes(q)
    );
  }, [sellersWithSales, salesSearch]);

  const filteredWithoutSales = useMemo(() => {
    if (!salesSearch.trim()) return sellersWithoutSales;
    const q = salesSearch.toLowerCase();
    return sellersWithoutSales.filter(
      (s) => s.staff.name.toLowerCase().includes(q) || s.staff.email.toLowerCase().includes(q)
    );
  }, [sellersWithoutSales, salesSearch]);

  // Filtered Orders for Orders Tab
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderSellerFilter === "all") return true;
      if (orderSellerFilter === "online") return o.channel === "online" && !o.soldByEmployeeId;
      return o.soldByEmployeeId === orderSellerFilter;
    });
  }, [orders, orderSellerFilter]);

  // Reassign Seller Handler
  const handleAssignSeller = (orderId?: string, sellerId?: string, sellerName?: string) => {
    const targetOrderId = orderId || reassignSellerModal.order?.id;
    const targetSellerId = sellerId || reassignSellerModal.sellerId;
    if (!targetOrderId || !targetSellerId) return;

    const selected = staffMembers.find((s) => s.id === targetSellerId);
    const targetSellerName = sellerName || selected?.name || "Colaborador";

    dataStore.assignOrderSeller(targetOrderId, targetSellerId, targetSellerName);
    setOrders(dataStore.getOrders());
    setReassignSellerModal({ open: false, order: undefined, sellerId: "" });
  };

  // POS (PDV) Calculations
  const posSubtotal = posCart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const posTotal = Math.max(0, posSubtotal - posDiscount);

  const handlePosAddToCart = (product: Product, variant: ProductVariant) => {
    if (variant.stock <= 0) {
      alert("Esta variação está sem estoque!");
      return;
    }
    const idx = posCart.findIndex(
      (it) => it.product.id === product.id && it.variant.id === variant.id
    );
    if (idx > -1) {
      if (posCart[idx].qty >= variant.stock) {
        alert(`Estoque máximo atingido (${variant.stock} unidades).`);
        return;
      }
      const updated = [...posCart];
      updated[idx].qty += 1;
      setPosCart(updated);
    } else {
      setPosCart([
        ...posCart,
        {
          product,
          variant,
          qty: 1,
          unitPrice: product.promoPrice || product.price
        }
      ]);
    }
  };

  const handlePosCheckout = () => {
    if (posCart.length === 0) return;

    const chosenSeller = staffMembers.find((s) => s.id === posSellerId) || currentUser;

    const res = dataStore.createOrder({
      channel: "fisica",
      customerName: posCustomerName.trim() || "Cliente Balcão",
      customerEmail: "venda.balcao@cmasmodas.com.br",
      customerPhone: posCustomerPhone || "(67) 99619-4762",
      customerCpf: posCustomerCpf || "000.000.000-00",
      soldByEmployeeId: chosenSeller?.id || currentUser?.id,
      soldByEmployeeName: chosenSeller?.name || currentUser?.name || "Vendedor C-MAS",
      items: posCart.map((it) => ({
        productId: it.product.id,
        variantId: it.variant.id,
        productName: it.product.name,
        colorName: it.variant.colorName,
        size: it.variant.size,
        sku: it.variant.sku,
        unitPrice: it.unitPrice,
        quantity: it.qty,
        totalPrice: it.unitPrice * it.qty,
        image: it.product.images[0]
      })),
      subtotal: posSubtotal,
      discount: posDiscount,
      deliveryFee: 0,
      total: posTotal,
      deliveryType: "Retirada na Loja Física",
      paymentMethod: posPaymentMethod,
      paymentStatus: "Aprovado",
      status: "Entregue"
    });

    if (res.success && res.order) {
      setPosSuccessOrder(res.order);
      setPosCart([]);
      setPosDiscount(0);
      setPosCustomerName("Cliente Balcão");
      setPosCustomerCpf("");
      setPosCustomerPhone("");
      setOrders(dataStore.getOrders());
      setProducts(dataStore.getProducts());
      setInventoryLogs(dataStore.getInventoryLogs());
    } else {
      alert(res.error || "Erro ao processar venda física.");
    }
  };

  const handleStockAdjustmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModal.product || !stockModal.variant) return;

    const delta = stockModal.type === "ENTRADA" ? Math.abs(stockModal.changeQty) : -Math.abs(stockModal.changeQty);
    const result = dataStore.adjustStock(
      stockModal.product.id,
      stockModal.variant.id,
      delta,
      stockModal.type,
      stockModal.reason,
      { name: currentUser?.name || "Administrador", role: userRole }
    );

    if (result.success) {
      setStockModal({ ...stockModal, open: false });
    } else {
      alert(result.message);
    }
  };

  const handleOrderStatusUpdate = () => {
    if (!orderStatusModal.order) return;
    dataStore.updateOrderStatus(
      orderStatusModal.order.id,
      orderStatusModal.newStatus,
      currentUser || { name: "Equipe C-MAS", role: userRole, id: "emp" } as User,
      orderStatusModal.note
    );
    setOrderStatusModal({ ...orderStatusModal, open: false });
  };

  const handleTicketReply = () => {
    if (!ticketReplyModal.ticket || !ticketReplyModal.replyText.trim()) return;
    dataStore.replyTicket(
      ticketReplyModal.ticket.id,
      ticketReplyModal.replyText.trim(),
      currentUser || ({ name: "Helena Carvalho", role: "ADMINISTRADOR" } as User)
    );
    setTicketReplyModal({ ...ticketReplyModal, open: false });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!npName.trim() || !npPrice) return;

    const priceNum = parseFloat(npPrice);
    const promoNum = npPromoPrice ? parseFloat(npPromoPrice) : undefined;
    const sizeArr = npSizes.split(",").map((s) => s.trim()).filter(Boolean);
    const initialQty = parseInt(npInitialStock) || 5;

    const skuBase = "CM-" + npName.substring(0, 3).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);

    const variants: ProductVariant[] = sizeArr.map((sz, i) => ({
      id: "var-" + Math.random().toString(36).substring(2, 7),
      sku: `${skuBase}-${npColorName.substring(0, 3).toUpperCase()}-${sz}`,
      colorName: npColorName,
      colorHex: npColorHex,
      size: sz,
      stock: initialQty
    }));

    dataStore.addProduct(
      {
        name: npName.trim(),
        slug: npName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        skuBase,
        description: npDesc.trim() || "Peça exclusiva da nova coleção C-MAS Modas com modelagem impecável.",
        shortDescription: npDesc.slice(0, 80) || "Peça de alfaiataria com acabamento nobre.",
        details: [
          "Modelagem exclusiva C-MAS Modas",
          "Tecido de alta durabilidade com toque macio",
          "Acabamentos artesanais refinados"
        ],
        fabric: npFabric,
        price: priceNum,
        promoPrice: promoNum,
        category: npCategory,
        subCategory: npSubCategory,
        images: [npImage],
        colors: [{ name: npColorName, hex: npColorHex }],
        sizes: sizeArr,
        variants,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        isOnSale: !!promoNum,
        active: true
      },
      currentUser || ({ name: "Administrador", role: "ADMINISTRADOR" } as User)
    );

    setNewProductModal(false);
    setNpName("");
    setNpPrice("");
    setNpPromoPrice("");
    setNpDesc("");
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ncCode.trim() || !ncDiscount) return;

    const couponsList = dataStore.getCoupons();
    const newC: Coupon = {
      id: "coup-" + Math.random().toString(36).substring(2, 8),
      code: ncCode.trim().toUpperCase(),
      description: ncDesc || `Desconto de ${ncDiscount} na loja`,
      discountType: ncType,
      discountValue: parseFloat(ncDiscount),
      minOrderValue: parseFloat(ncMinOrder) || 100,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "2026-12-31",
      usageCount: 0,
      active: true
    };
    couponsList.unshift(newC);
    dataStore.saveCoupons(couponsList);
    dataStore.addAuditLog(
      currentUser || { name: "Admin", role: "ADMINISTRADOR" },
      "Criação de Cupom",
      "Cupom",
      newC.code,
      `Cupom ${newC.code} criado.`
    );
    setNewCouponModal(false);
    setNcCode("");
    setNcDesc("");
    setNcDiscount("");
  };

  const handleUpdateStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateSettings(settings, currentUser || undefined);
    alert("Configurações da loja atualizadas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[#F8F5F3] pb-20">
      {/* Top Demo Banner for 1-Click Role Testing */}
      <div className="bg-[#4A0010] text-[#F8F5F3] border-b border-[#C9A86A]/40 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A86A]" />
            <span>
              Você está autenticado como <strong>{currentUser?.name || "Usuário"}</strong> (
              <span className="text-[#C9A86A] font-bold">{userRole}</span>)
            </span>
          </div>

          {/* Quick Role Switcher for instant testing */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl">
            <span className="text-[10px] text-slate-300 px-1 font-semibold uppercase">
              Trocar Perfil:
            </span>
            {(["ADMINISTRADOR", "GERENTE", "VENDEDOR", "CLIENTE"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  userRole === r
                    ? "bg-[#C9A86A] text-[#32000B] shadow"
                    : "text-slate-300 hover:bg-white/10"
                }`}
                title={r === "ADMINISTRADOR" ? "Acesso restrito à Diretoria (exige senha)" : undefined}
              >
                {r === "ADMINISTRADOR" && <Lock className="w-2.5 h-2.5 text-[#C9A86A]" />}
                <span>
                  {r === "ADMINISTRADOR"
                    ? "Admin"
                    : r === "GERENTE"
                    ? "Gerente"
                    : r === "VENDEDOR"
                    ? "Vendedor"
                    : "Cliente"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Panel Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-rose-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#720018] uppercase tracking-widest">
              <Store className="w-4 h-4" />
              <span>Painel de Gestão & Frente de Caixa</span>
            </div>
            <h1 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              C-MAS Modas • Campo Grande
            </h1>
            <p className="text-xs text-slate-500">
              Controle unificado de estoque físico e online, vendas no PDV, pedidos e relatórios.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/loja"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Ver Loja Online
            </Link>
            <button
              onClick={() => setActiveTab("pos")}
              className="px-5 py-2 rounded-xl bg-[#720018] hover:bg-[#4A0010] text-white font-bold text-xs uppercase tracking-wider shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#C9A86A]" />
              <span>Abrir PDV (Balcão)</span>
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faturamento Total</p>
              <p className="text-2xl font-bold text-[#720018] mt-1">
                R$ {totalRevenue.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Físico + Online
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 text-[#720018]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pedidos Online</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{onlineOrdersCount}</p>
              <p className="text-[10px] text-slate-500 mt-1">E-commerce C-MAS</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vendas Físicas (PDV)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{physicalSalesCount}</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-1">Loja Campo Grande</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
              <Store className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estoque Baixo</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{lowStockVariantsCount}</p>
              <p className="text-[10px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Variações ≤ 3 un.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <Boxes className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-rose-200/80">
          {[
            { id: "overview", label: "Visão Geral", icon: TrendingUp },
            { id: "sales_split", label: "Quem Vendeu / Não Vendeu", icon: Award, highlight: true },
            { id: "pos", label: "PDV (Vendas Balcão)", icon: Store },
            { id: "products", label: "Produtos & Variações", icon: Package },
            { id: "inventory", label: "Estoque Unificado", icon: Boxes },
            { id: "orders", label: "Pedidos & Vendas", icon: ShoppingBag },
            ...(isManagerOrAdmin ? [{ id: "customers", label: "Clientes & Equipe", icon: Users }] : []),
            ...(isManagerOrAdmin ? [{ id: "coupons", label: "Cupons & Promoções", icon: Tag }] : []),
            { id: "tickets", label: "Suporte & Atendimento", icon: MessageSquare },
            ...(isAdmin ? [{ id: "audit", label: "Auditoria & Logs", icon: FileText }] : []),
            ...(isAdmin ? [{ id: "settings", label: "Configurações da Loja", icon: Settings }] : []),
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? tab.highlight
                      ? "bg-[#720018] text-white shadow-md"
                      : "bg-white text-[#720018] shadow-xs border border-rose-200"
                    : "text-slate-600 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive && tab.highlight ? "text-[#C9A86A]" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: VISÃO GERAL */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders Overview */}
              <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-brand-title text-sm font-bold text-slate-900">
                    Últimos Pedidos & Vendas
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#720018] font-bold hover:underline"
                  >
                    Ver Todos
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{ord.orderNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              ord.channel === "fisica"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ord.channel === "fisica" ? "Loja Física" : "Online"}
                          </span>
                        </div>
                        <p className="text-slate-500 mt-0.5">{ord.customerName} • {ord.items.length} itens</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-[#720018]">
                          R$ {ord.total.toFixed(2).replace(".", ",")}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-brand-title text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Alertas de Reposição de Estoque</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className="text-xs text-[#720018] font-bold hover:underline"
                  >
                    Gerenciar Estoque
                  </button>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {products
                    .flatMap((p) => p.variants.map((v) => ({ product: p, variant: v })))
                    .filter((item) => item.variant.stock <= 4)
                    .map((item) => (
                      <div
                        key={item.variant.id}
                        className="py-3 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{item.product.name}</p>
                          <p className="text-slate-500 text-[11px]">
                            Cor: {item.variant.colorName} • Tam: {item.variant.size} • SKU: {item.variant.sku}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.variant.stock <= 0
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.variant.stock === 0 ? "Esgotado" : `${item.variant.stock} un.`}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Team Performance Summary Banner in Overview */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-rose-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#720018] shrink-0">
                  <Award className="w-6 h-6 text-[#C9A86A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-brand-title text-base font-bold text-slate-900">
                      Desempenho da Equipe: Quem Vendeu vs. Quem Não Vendeu
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {sellersWithSales.length} Venderam
                    </span>
                    {sellersWithoutSales.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {sellersWithoutSales.length} Zerados
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Acompanhe o ranking individual, metas de vendas, comissões de 5% e ative quem ainda não pontuou no sistema.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab("sales_split")}
                  className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#720018] hover:bg-[#520011] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ver Divisão Completa</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A86A]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB NOVO: QUEM VENDEU / QUEM NÃO VENDEU */}
        {activeTab === "sales_split" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Header / Intro */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#720018] border border-rose-200">
                    Desempenho Comercial & Metas
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" /> C-MAS Modas
                  </span>
                </div>
                <h3 className="font-brand-title text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 mt-2">
                  <Award className="w-6 h-6 text-[#C9A86A]" />
                  <span>Quem Vendeu vs. Quem Não Vendeu</span>
                </h3>
                <p className="text-xs text-slate-500 max-w-2xl">
                  Divisão analítica da equipe comercial entre colaboradores com vendas ativas e membros zerados no período. Acompanhe comissões de 5%, itens vendidos e impulsione metas.
                </p>
              </div>

              {/* Quick actions & search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={salesSearch}
                    onChange={(e) => setSalesSearch(e.target.value)}
                    placeholder="Buscar vendedor..."
                    className="pl-9 pr-4 py-2 text-xs bg-[#F8F5F3] border border-slate-200 rounded-xl w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                  />
                  {salesSearch && (
                    <button
                      onClick={() => setSalesSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab("pos")}
                  className="px-4 py-2.5 rounded-xl bg-[#720018] hover:bg-[#520011] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#C9A86A]" />
                  <span>Nova Venda no PDV</span>
                </button>
              </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equipe Comercial</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {staffMembers.length} <span className="text-xs font-normal text-slate-500">colaboradores</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Loja Física & Equipe de Vendas</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 text-slate-700">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-emerald-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Quem Vendeu
                  </p>
                  <p className="text-2xl font-bold text-emerald-700 mt-1">
                    {sellersWithSales.length}{" "}
                    <span className="text-xs font-normal text-emerald-600">
                      ({Math.round((sellersWithSales.length / (staffMembers.length || 1)) * 100)}%)
                    </span>
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    R$ {totalStaffRevenue.toFixed(2).replace(".", ",")} faturados
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Quem Não Vendeu
                  </p>
                  <p className="text-2xl font-bold text-amber-700 mt-1">
                    {sellersWithoutSales.length}{" "}
                    <span className="text-xs font-normal text-amber-600">
                      ({Math.round((sellersWithoutSales.length / (staffMembers.length || 1)) * 100)}%)
                    </span>
                  </p>
                  <p className="text-[10px] text-amber-700 font-semibold mt-1">
                    Zerados no período • Apoio necessário
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                  <UserX className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Comissões (5%)</p>
                  <p className="text-2xl font-bold text-[#720018] mt-1">
                    R$ {totalStaffCommissions.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    {totalStaffOrders} vendas fechadas
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 text-[#720018]">
                  <Percent className="w-6 h-6 text-[#C9A86A]" />
                </div>
              </div>
            </div>

            {/* Sub-view filters: Split, Only who sold, Only who didn't, Products split */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/70 pb-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "split", label: "Visão Dividida (Lado a Lado)", icon: Layers },
                  { id: "sellers_with_sales", label: `Quem Vendeu (${sellersWithSales.length})`, icon: UserCheck },
                  { id: "sellers_without_sales", label: `Quem Não Vendeu (${sellersWithoutSales.length})`, icon: UserX },
                  { id: "products_split", label: `Produtos: O que Vendeu vs. Parado (${productsWithSales.length}/${productsWithoutSales.length})`, icon: Package }
                ].map((item) => {
                  const Icon = item.icon;
                  const isCur = salesSplitTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSalesSplitTab(item.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isCur
                          ? "bg-[#720018] text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isCur ? "text-[#C9A86A]" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-slate-500">
                Visualização: <strong>{salesSplitTab === "products_split" ? "Giro de Peças" : "Equipe Comercial"}</strong>
              </div>
            </div>

            {/* SECTION 1: SIDE-BY-SIDE OR FILTERED VIEW FOR SELLERS */}
            {salesSplitTab !== "products_split" && (
              <div className={`grid gap-8 ${salesSplitTab === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                
                {/* COLUMN: QUEM VENDEU */}
                {(salesSplitTab === "split" || salesSplitTab === "sellers_with_sales") && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-brand-title text-sm font-bold text-emerald-950">
                            QUEM VENDEU ({filteredWithSales.length})
                          </h4>
                          <p className="text-[11px] text-emerald-700">
                            Colaboradores com faturamento ativo no sistema
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        R$ {totalStaffRevenue.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    {filteredWithSales.length === 0 ? (
                      <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center space-y-2">
                        <UserCheck className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-700">Nenhum vendedor encontrado nesta busca.</p>
                        <p className="text-[11px] text-slate-400">Tente ajustar o termo de pesquisa.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredWithSales.map((item, idx) => {
                          const medalIcons = ["🥇", "🥈", "🥉"];
                          const medal = idx < 3 ? medalIcons[idx] : `#${idx + 1}`;
                          const targetGoal = 2000;
                          const goalPercent = Math.min(100, Math.round((item.totalRevenue / targetGoal) * 100));

                          return (
                            <div
                              key={item.staff.id}
                              className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-4"
                            >
                              {/* Top row: Avatar, Name, Badge, Total */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <img
                                      src={item.staff.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                                      alt={item.staff.name}
                                      className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-200"
                                    />
                                    <span className="absolute -top-1.5 -left-1.5 text-sm" title={`Posição #${idx + 1}`}>
                                      {medal}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h5 className="font-bold text-sm text-slate-900">{item.staff.name}</h5>
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        {item.staff.role === "VENDEDOR" ? "Vendedor(a)" : item.staff.role === "GERENTE" ? "Gerente" : "Admin"}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{item.staff.email}</p>
                                    {item.staff.phone && (
                                      <p className="text-[10px] text-slate-500 font-mono">{item.staff.phone}</p>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Vendido</span>
                                  <span className="font-brand-title text-lg font-bold text-[#720018]">
                                    R$ {item.totalRevenue.toFixed(2).replace(".", ",")}
                                  </span>
                                </div>
                              </div>

                              {/* Metrics 4-grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                <div className="p-2.5 rounded-xl bg-[#F8F5F3] text-center">
                                  <span className="text-[10px] font-bold text-slate-500 block">Vendas Fechadas</span>
                                  <span className="font-bold text-slate-800 text-xs">{item.ordersCount} pedidos</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F8F5F3] text-center">
                                  <span className="text-[10px] font-bold text-slate-500 block">Peças / Itens</span>
                                  <span className="font-bold text-slate-800 text-xs">{item.totalItems} un.</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F8F5F3] text-center">
                                  <span className="text-[10px] font-bold text-slate-500 block">Ticket Médio</span>
                                  <span className="font-bold text-slate-800 text-xs">R$ {item.averageTicket.toFixed(2).replace(".", ",")}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-center border border-emerald-200">
                                  <span className="text-[10px] font-bold text-emerald-800 block">Comissão (5%)</span>
                                  <span className="font-bold text-emerald-900 text-xs">R$ {item.commission.toFixed(2).replace(".", ",")}</span>
                                </div>
                              </div>

                              {/* Goal progress */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-medium">
                                  <span className="text-slate-600">Meta Mensal (R$ 2.000,00)</span>
                                  <span className="font-bold text-[#720018]">{goalPercent}% atingido</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#C9A86A] to-[#720018] rounded-full transition-all duration-500"
                                    style={{ width: `${goalPercent}%` }}
                                  />
                                </div>
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                                <button
                                  onClick={() => {
                                    setSelectedSellerOrdersModal({
                                      open: true,
                                      sellerName: item.staff.name,
                                      sellerId: item.staff.id,
                                      orders: item.orders
                                    });
                                  }}
                                  className="text-[#720018] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Ver {item.ordersCount} pedidos vendidos</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setPosSellerId(item.staff.id);
                                    setActiveTab("pos");
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#720018] font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5 text-[#C9A86A]" />
                                  <span>Lançar Venda</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* COLUMN: QUEM NÃO VENDEU */}
                {(salesSplitTab === "split" || salesSplitTab === "sellers_without_sales") && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-brand-title text-sm font-bold text-amber-950">
                            QUEM NÃO VENDEU ({filteredWithoutSales.length})
                          </h4>
                          <p className="text-[11px] text-amber-800">
                            Colaboradores com 0 vendas registradas no período
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {filteredWithoutSales.length} Zerados
                      </span>
                    </div>

                    {filteredWithoutSales.length === 0 ? (
                      <div className="bg-white p-8 rounded-3xl border border-dashed border-emerald-300 text-center space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                        <p className="text-xs font-bold text-slate-900">Parabéns! Toda a equipe realizou vendas!</p>
                        <p className="text-[11px] text-slate-500">Nenhum colaborador está zerado no momento.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredWithoutSales.map((item) => {
                          const whatsPhone = (item.staff.phone || "").replace(/\D/g, "");
                          const whatsMsg = encodeURIComponent(
                            `Olá ${item.staff.name.split(" ")[0]}! Aqui é da gerência da C-MAS Modas. Como podemos te apoiar para fechar suas próximas vendas da coleção hoje? Conte conosco!`
                          );

                          return (
                            <div
                              key={item.staff.id}
                              className="bg-white p-5 rounded-3xl border border-amber-100 shadow-xs hover:shadow-md transition-all space-y-4"
                            >
                              {/* Top row */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <img
                                      src={item.staff.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"}
                                      alt={item.staff.name}
                                      className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-200 grayscale-30"
                                    />
                                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white" title="Zerado" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h5 className="font-bold text-sm text-slate-900">{item.staff.name}</h5>
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                        {item.staff.role === "VENDEDOR" ? "Vendedor(a)" : item.staff.role === "GERENTE" ? "Gerente" : "Admin"}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{item.staff.email}</p>
                                    {item.staff.phone && (
                                      <p className="text-[10px] text-slate-500 font-mono">{item.staff.phone}</p>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-[#720018] border border-rose-200">
                                    0 Vendas no Período
                                  </span>
                                  <span className="block text-[11px] text-slate-400 mt-1 font-mono">
                                    R$ 0,00 faturado
                                  </span>
                                </div>
                              </div>

                              {/* Alert motivation box */}
                              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
                                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                                  <Target className="w-3.5 h-3.5 text-amber-700" />
                                  <span>Ação Recomendada para Ativação:</span>
                                </div>
                                <p className="text-[11px] text-amber-800 leading-relaxed">
                                  Inicie uma venda rápida pelo PDV atribuída a este colaborador ou vincule uma venda balcão já realizada para creditar a comissão de 5%.
                                </p>
                              </div>

                              {/* Quick Action Buttons */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                  {whatsPhone && (
                                    <a
                                      href={`https://wa.me/55${whatsPhone}?text=${whatsMsg}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition-all flex items-center gap-1"
                                      title="Enviar mensagem de incentivo via WhatsApp"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Apoio WhatsApp</span>
                                    </a>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (orders.length > 0) {
                                        setReassignSellerModal({
                                          open: true,
                                          order: orders[0],
                                          sellerId: item.staff.id
                                        });
                                      } else {
                                        alert("Não há pedidos registrados para atribuir.");
                                      }
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <UserPlus className="w-3.5 h-3.5" />
                                    <span>Atribuir Pedido</span>
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    setPosSellerId(item.staff.id);
                                    setActiveTab("pos");
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-[#720018] hover:bg-[#520011] text-white font-bold text-[11px] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                  <Flame className="w-3.5 h-3.5 text-[#C9A86A]" />
                                  <span>Lançar Venda no PDV</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SECTION 2: PRODUCT SALES DIVISION ("PRODUTOS: O QUE VENDEU VS. O QUE NÃO VENDEU") */}
            {salesSplitTab === "products_split" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column: Produtos Vendidos */}
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-brand-title text-sm font-bold text-emerald-950">
                          PEÇAS COM VENDAS REALIZADAS ({productsWithSales.length})
                        </h4>
                        <p className="text-[11px] text-emerald-700">Produtos com saída e giro de estoque</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {productsWithSales.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 rounded-3xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                          />
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">{item.product.name}</h5>
                            <p className="text-[11px] text-slate-400">
                              {item.product.category} • {item.product.subCategory}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {item.totalSold} unidades vendidas
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Receita Gerada</span>
                          <span className="font-brand-title text-sm font-bold text-[#720018]">
                            R$ {item.revenue.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">
                            {item.currentStock} un. em estoque
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: Produtos Sem Nenhuma Venda */}
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-brand-title text-sm font-bold text-amber-950">
                          PEÇAS SEM NENHUMA VENDA ({productsWithoutSales.length})
                        </h4>
                        <p className="text-[11px] text-amber-800">Estoque parado • Oportunidade para promoção ou desconto</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {productsWithoutSales.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 rounded-3xl bg-white border border-amber-100 shadow-xs flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                          />
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">{item.product.name}</h5>
                            <p className="text-[11px] text-slate-400">
                              {item.product.category} • {item.product.subCategory}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              0 vendas • {item.currentStock} un. paradas
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Preço de Venda</span>
                          <span className="font-brand-title text-sm font-bold text-slate-900">
                            R$ {(item.product.promoPrice || item.product.price).toFixed(2).replace(".", ",")}
                          </span>
                          <button
                            onClick={() => {
                              setActiveTab("coupons");
                            }}
                            className="mt-1 text-[10px] font-bold text-[#720018] hover:underline block cursor-pointer"
                          >
                            + Criar Cupom / Promoção
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PDV (FRENTE DE CAIXA / VENDAS FÍSICAS) */}
        {activeTab === "pos" && (
          <div className="space-y-6 animate-in fade-in">
            {posSuccessOrder && (
              <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-sm text-emerald-900">
                        Venda no Balcão Concluída com Sucesso!
                      </h4>
                      <p className="text-xs text-emerald-700">
                        Pedido <strong>#{posSuccessOrder.orderNumber}</strong> registrado e estoque debitado em tempo real.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPosSuccessOrder(null)}
                    className="text-xs text-emerald-800 font-bold hover:underline"
                  >
                    Nova Venda
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Cupom / Comprovante</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Product Catalog Picker (7 cols) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-brand-title text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#720018]" />
                    <span>Catálogo do PDV (Venda Balcão)</span>
                  </h3>
                  <span className="text-xs text-slate-500">Selecione peças e tamanhos</span>
                </div>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por nome, categoria ou código SKU..."
                    value={posSearch}
                    onChange={(e) => setPosSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#720018]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>

                {/* Products List for POS */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {products
                    .filter((p) => {
                      if (!posSearch) return true;
                      const q = posSearch.toLowerCase();
                      return (
                        p.name.toLowerCase().includes(q) ||
                        p.skuBase.toLowerCase().includes(q) ||
                        p.variants.some((v) => v.sku.toLowerCase().includes(q))
                      );
                    })
                    .map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-14 object-cover rounded-xl border border-slate-300 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{prod.name}</p>
                            <p className="text-[11px] text-[#720018] font-bold">
                              R$ {(prod.promoPrice || prod.price).toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                        </div>

                        {/* Variant Quick Add Buttons */}
                        <div className="flex flex-wrap gap-1.5">
                          {prod.variants.map((v) => (
                            <button
                              key={v.id}
                              disabled={v.stock <= 0}
                              onClick={() => handlePosAddToCart(prod, v)}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                                v.stock > 0
                                  ? "bg-white hover:bg-[#720018] hover:text-white border-slate-300 text-slate-800"
                                  : "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                              }`}
                              title={`SKU: ${v.sku} | Estoque: ${v.stock}`}
                            >
                              <span>{v.size}</span>
                              <span className="text-[9px] opacity-75">({v.stock})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* POS Terminal Cart & Checkout (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-brand-title text-sm font-bold text-slate-900">
                    Cupom de Venda ({posCart.length} itens)
                  </h3>
                  {posCart.length > 0 && (
                    <button
                      onClick={() => setPosCart([])}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                  {posCart.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-8">
                      Nenhum item adicionado no PDV. Clique nas variações ao lado para incluir na venda.
                    </p>
                  ) : (
                    posCart.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {item.variant.colorName} • Tam {item.variant.size} • Qtd: {item.qty} un.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#720018]">
                            R$ {(item.unitPrice * item.qty).toFixed(2).replace(".", ",")}
                          </span>
                          <button
                            onClick={() => {
                              const updated = [...posCart];
                              updated.splice(idx, 1);
                              setPosCart(updated);
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Customer Details Form for in-person sale */}
                <div className="p-4 rounded-2xl bg-[#F8F5F3] space-y-3 text-xs border border-slate-200">
                  <p className="font-bold text-slate-800 uppercase tracking-wider">
                    Dados do Comprador (Balcão)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Nome</label>
                      <input
                        type="text"
                        value={posCustomerName}
                        onChange={(e) => setPosCustomerName(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Telefone/Whats</label>
                      <input
                        type="text"
                        placeholder="(67) 9..."
                        value={posCustomerPhone}
                        onChange={(e) => setPosCustomerPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">CPF (Para Cupom)</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      value={posCustomerCpf}
                      onChange={(e) => setPosCustomerCpf(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  {/* Vendedor Responsável */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5 flex items-center justify-between">
                      <span>Vendedor Responsável</span>
                      <span className="text-[10px] text-[#720018] font-bold">Comissão 5%</span>
                    </label>
                    <select
                      value={posSellerId}
                      onChange={(e) => setPosSellerId(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-[#720018] cursor-pointer"
                    >
                      {staffMembers.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.role === "VENDEDOR" ? "Vendedor(a)" : s.role === "GERENTE" ? "Gerente" : "Admin"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Forma de Pagamento</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: "Cartão na Loja", label: "Cartão" },
                        { id: "PIX", label: "PIX" },
                        { id: "Dinheiro na Retirada", label: "Dinheiro" }
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPosPaymentMethod(m.id as any)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            posPaymentMethod === m.id
                              ? "bg-[#720018] text-white border-[#720018]"
                              : "bg-white text-slate-700 border-slate-200"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Discount input */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Desconto Especial (R$)</label>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={posDiscount || ""}
                      onChange={(e) => setPosDiscount(parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-[#720018]"
                    />
                  </div>
                </div>

                {/* Pricing summary */}
                <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Balcão</span>
                    <span>R$ {posSubtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {posDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Desconto Aplicado</span>
                      <span>- R$ {posDiscount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-slate-900 pt-1">
                    <span>Total a Cobrar</span>
                    <span className="text-[#720018] text-lg">
                      R$ {posTotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>

                <button
                  disabled={posCart.length === 0}
                  onClick={handlePosCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#720018] hover:bg-[#4A0010] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#C9A86A]" />
                  <span>Registrar Venda no PDV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUTOS & VARIAÇÕES */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-rose-100 shadow-xs">
              <div>
                <h3 className="font-brand-title text-sm font-bold text-slate-900">
                  Gerenciador de Catálogo & Variações ({products.length} produtos)
                </h3>
                <p className="text-xs text-slate-500">
                  Configure fotos, tecidos, cores, tamanhos e estoque de cada variação.
                </p>
              </div>

              {isManagerOrAdmin && (
                <button
                  onClick={() => setNewProductModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#720018] hover:bg-[#4A0010] text-white font-bold text-xs uppercase tracking-wider shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Novo Produto</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-rose-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F5F3] text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Produto</th>
                      <th className="p-4">Categoria</th>
                      <th className="p-4">Preço Normal</th>
                      <th className="p-4">Preço Promo</th>
                      <th className="p-4">Variações & Estoque</th>
                      <th className="p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => {
                      const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-12 h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                                <p className="text-[11px] text-slate-400 font-mono">SKU: {p.skuBase}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">
                            {p.category} • {p.subCategory}
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            R$ {p.price.toFixed(2).replace(".", ",")}
                          </td>
                          <td className="p-4 font-bold text-[#720018]">
                            {p.promoPrice ? `R$ ${p.promoPrice.toFixed(2).replace(".", ",")}` : "—"}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {p.variants.map((v) => (
                                <span
                                  key={v.id}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                    v.stock <= 2
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  {v.size}: {v.stock} un.
                                </span>
                              ))}
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-1">
                              Total: <strong>{totalStock} un.</strong>
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/produto/${p.slug}`}
                                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                                title="Visualizar na loja"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              {isManagerOrAdmin && (
                                <button
                                  onClick={() => {
                                    const newPrice = prompt("Novo preço promocional (deixe em branco para remover):", p.promoPrice?.toString() || "");
                                    if (newPrice !== null) {
                                      dataStore.updateProduct(
                                        p.id,
                                        { promoPrice: newPrice ? parseFloat(newPrice) : undefined, isOnSale: !!newPrice },
                                        currentUser || { name: "Admin", role: "ADMINISTRADOR" }
                                      );
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-[#720018]"
                                  title="Editar Preço Promo"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              )}
                              {isAdmin && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Deseja remover o produto "${p.name}"?`)) {
                                      dataStore.deleteProduct(p.id, currentUser || { name: "Admin", role: "ADMINISTRADOR" });
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
                                  title="Excluir produto"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ESTOQUE UNIFICADO & MOVIMENTAÇÕES */}
        {activeTab === "inventory" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Unified Stock Matrix */}
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-brand-title text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-[#720018]" />
                    <span>Estoque Unificado (Loja Física + E-commerce)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ajuste entradas e saídas de mercadorias com registro obrigatório de auditoria.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F5F3] text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">SKU / Peça</th>
                      <th className="p-3.5">Cor</th>
                      <th className="p-3.5">Tamanho</th>
                      <th className="p-3.5">Estoque Atual</th>
                      <th className="p-3.5">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.flatMap((prod) =>
                      prod.variants.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/70">
                          <td className="p-3.5">
                            <p className="font-bold text-slate-900">{prod.name}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{v.sku}</p>
                          </td>
                          <td className="p-3.5">
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className="w-3 h-3 rounded-full border border-slate-300"
                                style={{ backgroundColor: v.colorHex }}
                              />
                              {v.colorName}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-slate-800">Tam {v.size}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                v.stock <= 2
                                  ? "bg-red-100 text-red-800"
                                  : v.stock <= 5
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {v.stock} un.
                            </span>
                          </td>
                          <td className="p-3.5">
                            {isManagerOrAdmin ? (
                              <button
                                onClick={() =>
                                  setStockModal({
                                    open: true,
                                    product: prod,
                                    variant: v,
                                    changeQty: 5,
                                    reason: "Recebimento de lote de mercadoria",
                                    type: "ENTRADA"
                                  })
                                }
                                className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#720018] font-bold text-xs hover:bg-[#720018] hover:text-white transition-colors"
                              >
                                Ajustar Estoque
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400">Somente consulta</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inventory Movements Log */}
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
              <h3 className="font-brand-title text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Histórico de Movimentações de Estoque
              </h3>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {inventoryLogs.map((log) => (
                  <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            log.type.startsWith("ENTRADA") || log.type === "LIBERACAO"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {log.type}
                        </span>
                        <span className="font-bold text-slate-900">{log.productName}</span>
                        <span className="text-slate-400">({log.colorName}, {log.size})</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">
                        Motivo: <strong>{log.reason}</strong> • Por: {log.userName} ({log.userRole})
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          log.quantityChange > 0 ? "text-emerald-700" : "text-[#720018]"
                        }`}
                      >
                        {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange} un.
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {log.previousStock} ➔ {log.newStock} un.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PEDIDOS & VENDAS */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-brand-title text-sm font-bold text-slate-900">
                  Histórico Geral de Pedidos & Vendas ({filteredOrders.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Gerencie o status de entrega, canais de venda e atribuição de comissão dos colaboradores.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 bg-[#F8F5F3] px-3 py-1.5 rounded-xl border border-slate-200">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-600">Filtrar Vendedor:</span>
                  <select
                    value={orderSellerFilter}
                    onChange={(e) => setOrderSellerFilter(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#720018] outline-none cursor-pointer"
                  >
                    <option value="all">Todos os Vendedores & Canais</option>
                    <option value="online">Apenas E-commerce (Online)</option>
                    {staffMembers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({orders.filter(o => o.soldByEmployeeId === s.id).length} vendas)
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setActiveTab("sales_split")}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#720018] border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Ver Divisão de Vendas</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F5F3] text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Pedido</th>
                    <th className="p-3.5">Canal</th>
                    <th className="p-3.5">Vendedor Responsável</th>
                    <th className="p-3.5">Cliente</th>
                    <th className="p-3.5">Itens</th>
                    <th className="p-3.5">Total</th>
                    <th className="p-3.5">Pagamento</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {ord.orderNumber}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.channel === "fisica"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {ord.channel === "fisica" ? "Loja Física" : "Online"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {ord.soldByEmployeeName ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-bold text-slate-900">{ord.soldByEmployeeName}</span>
                            </div>
                            <span className="text-[10px] text-emerald-700 font-semibold block">
                              Comissão: R$ {(ord.total * 0.05).toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        ) : ord.channel === "fisica" ? (
                          <span className="text-slate-400 italic">Balcão C-MAS</span>
                        ) : (
                          <span className="text-blue-600 font-medium">E-commerce Direto</span>
                        )}
                        {isManagerOrAdmin && (
                          <button
                            onClick={() =>
                              setReassignSellerModal({
                                open: true,
                                order: ord,
                                sellerId: ord.soldByEmployeeId || staffMembers[0]?.id || ""
                              })
                            }
                            className="text-[10px] text-[#720018] hover:underline font-semibold block mt-1 cursor-pointer"
                          >
                            {ord.soldByEmployeeName ? "Trocar Vendedor" : "+ Atribuir Vendedor"}
                          </button>
                        )}
                      </td>
                      <td className="p-3.5">
                        <p className="font-semibold text-slate-900">{ord.customerName}</p>
                        <p className="text-[11px] text-slate-400">{ord.customerPhone}</p>
                      </td>
                      <td className="p-3.5">{ord.items.length} un.</td>
                      <td className="p-3.5 font-bold text-[#720018]">
                        R$ {ord.total.toFixed(2).replace(".", ",")}
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold">{ord.paymentMethod}</span>
                        <span className="text-[10px] text-emerald-700 block font-bold">
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-[#720018] border border-rose-200">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() =>
                            setOrderStatusModal({
                              open: true,
                              order: ord,
                              newStatus: ord.status,
                              note: ""
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition-colors cursor-pointer"
                        >
                          Atualizar Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CLIENTES & EQUIPE */}
        {activeTab === "customers" && isManagerOrAdmin && (
          <div className="space-y-6 animate-in fade-in">
            {/* PAINEL EXCLUSIVO DA DIRETORIA (Visível Exclusivamente Para Nós / Administradores) */}
            {isAdmin ? (
              <div className="bg-gradient-to-br from-[#260008] via-[#4A0010] to-[#32000B] text-white p-6 sm:p-8 rounded-3xl border border-[#C9A86A]/40 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/40 text-[#C9A86A] text-[11px] font-bold uppercase tracking-wider">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Área Confidencial • Visível Exclusivamente Para Nós</span>
                    </div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#F8F5F3] pt-1">
                      Quem são os Administradores C-MAS
                    </h3>
                    <p className="text-xs text-rose-200/80">
                      Identidade restrita dos proprietários e gestores mestres com autoridade total na loja física e digital.
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-2xl bg-black/30 border border-white/10 text-right">
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">Privacidade Ativa</span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Oculto para Vendedores & Clientes
                    </span>
                  </div>
                </div>

                {/* Cards dos Administradores Oficiais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {usersList
                    .filter((u) => u.role === "ADMINISTRADOR")
                    .map((adm) => {
                      const isHero = adm.email.toLowerCase().includes("hero");
                      const isNatali = adm.email.toLowerCase().includes("natali");
                      const isOwner = isHero || isNatali;
                      return (
                        <div
                          key={adm.id}
                          className="bg-white/5 backdrop-blur-xs border border-white/10 p-5 rounded-2xl space-y-4 hover:border-[#C9A86A]/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={adm.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                                alt={adm.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#C9A86A]"
                              />
                              <div>
                                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                                  <span>{adm.name}</span>
                                  {isOwner && (
                                    <span className="text-[10px] bg-[#C9A86A] text-[#32000B] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      Proprietário(a)
                                    </span>
                                  )}
                                </h4>
                                <p className="text-xs text-rose-200 font-mono">{adm.email}</p>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                              Ativo
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/10">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Nível de Permissão:</span>
                              <span className="font-bold text-slate-200">Acesso Total Irrestrito</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Telefone de Contato:</span>
                              <span className="font-bold text-slate-200">{adm.phone || "(67) 99619-4762"}</span>
                            </div>
                          </div>

                          {/* Senha Protegida / Escondida */}
                          <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between border border-white/5">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                                Senha do Administrador
                              </span>
                              <span className="font-mono text-xs tracking-widest text-[#C9A86A] font-bold">
                                ••••••••••••
                              </span>
                              <span className="text-[9px] text-slate-400 block mt-0.5">
                                Senha protegida contra visualização pública
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                setChangePassError("");
                                setChangePassSuccess("");
                                setNewAdminPassword("");
                                setConfirmAdminPassword("");
                                setChangeAdminPassModal({
                                  open: true,
                                  userId: adm.id,
                                  userName: adm.name
                                });
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
                            >
                              <Key className="w-3 h-3 text-[#C9A86A]" />
                              <span>Trocar Senha</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* Banner de Privacidade para Não-Administradores (ex: Gerente) */
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <p className="font-bold text-amber-950 text-sm">Privacidade da Diretoria Ativa</p>
                  <p className="mt-1 text-amber-800">
                    As identidades e credenciais dos Administradores e Sócios estão protegidas por sigilo de governança.
                    Apenas administradores autenticados têm acesso à visualização da diretoria executiva.
                  </p>
                </div>
              </div>
            )}

            {/* TABELA DE USUÁRIOS (Filtrada para não exibir administradores a não-admins) */}
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-brand-title text-sm font-bold text-slate-900">
                    {isAdmin ? "Todos os Usuários e Equipe de Loja" : "Equipe da Loja & Clientes Cadastrados"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAdmin
                      ? "Visualização corporativa completa para administradores C-MAS."
                      : "Colaboradores e clientes cadastrados. Identidade dos administradores oculta por segurança."}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F5F3] text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Nome</th>
                      <th className="p-3.5">E-mail</th>
                      <th className="p-3.5">CPF</th>
                      <th className="p-3.5">Telefone</th>
                      <th className="p-3.5">Cargo / Perfil</th>
                      <th className="p-3.5">Desempenho Comercial</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersList
                      .filter((u) => isAdmin || u.role !== "ADMINISTRADOR")
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/70">
                          <td className="p-3.5 font-bold text-slate-900">{u.name}</td>
                          <td className="p-3.5 text-slate-600">{u.email}</td>
                          <td className="p-3.5 font-mono">{u.cpf || "—"}</td>
                          <td className="p-3.5">{u.phone || "—"}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                u.role === "ADMINISTRADOR"
                                  ? "bg-purple-50 text-purple-800 border-purple-200"
                                  : u.role === "GERENTE"
                                  ? "bg-blue-50 text-blue-800 border-blue-200"
                                  : u.role === "VENDEDOR"
                                  ? "bg-rose-50 text-[#720018] border border-rose-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {u.role === "CLIENTE" ? (
                              <span className="text-slate-400">Cliente da Loja</span>
                            ) : (
                              (() => {
                                const staffStat = staffSalesStats.find((s) => s.staff.id === u.id);
                                if (staffStat && staffStat.ordersCount > 0) {
                                  return (
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        Vendeu R$ {staffStat.totalRevenue.toFixed(2).replace(".", ",")} ({staffStat.ordersCount}x)
                                      </span>
                                      <button
                                        onClick={() => setActiveTab("sales_split")}
                                        className="text-[10px] text-[#720018] font-bold hover:underline cursor-pointer"
                                      >
                                        Ver
                                      </button>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                                        Não Vendeu (Zerado)
                                      </span>
                                      <button
                                        onClick={() => {
                                          setPosSellerId(u.id);
                                          setActiveTab("pos");
                                        }}
                                        className="text-[10px] text-[#720018] font-bold hover:underline cursor-pointer"
                                      >
                                        + Vender
                                      </button>
                                    </div>
                                  );
                                }
                              })()
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CUPONS */}
        {activeTab === "coupons" && isManagerOrAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-rose-100 shadow-xs">
              <div>
                <h3 className="font-brand-title text-sm font-bold text-slate-900">
                  Cupons & Promoções Ativas
                </h3>
                <p className="text-xs text-slate-500">Crie códigos promocionais para impulsionar as vendas.</p>
              </div>
              <button
                onClick={() => setNewCouponModal(true)}
                className="px-4 py-2 bg-[#720018] text-white font-bold text-xs rounded-xl shadow uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Cupom</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coupons.map((c) => (
                <div key={c.id} className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#720018] bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Ativo
                    </span>
                  </div>

                  <p className="text-slate-700 font-medium">{c.description}</p>

                  <div className="pt-2 border-t border-slate-100 text-slate-500 space-y-1 text-[11px]">
                    <p>
                      Desconto: <strong>{c.discountType === "percentage" ? `${c.discountValue}%` : `R$ ${c.discountValue.toFixed(2)}`}</strong>
                    </p>
                    <p>Pedido Mínimo: <strong>R$ {c.minOrderValue.toFixed(2).replace(".", ",")}</strong></p>
                    <p>Usos Registrados: <strong>{c.usageCount}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SUPORTE & ATENDIMENTO */}
        {activeTab === "tickets" && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4 animate-in fade-in">
            <h3 className="font-brand-title text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Central de Atendimento & Tickets de Clientes ({tickets.length})
            </h3>

            <div className="divide-y divide-slate-100">
              {tickets.map((tck) => (
                <div key={tck.id} className="py-4 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {tck.protocol}
                        </span>
                        <span className="font-bold text-[#720018]">{tck.category}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 mt-1">{tck.subject}</h4>
                      <p className="text-slate-500 text-[11px]">
                        Por: {tck.userName} ({tck.userEmail}) • {new Date(tck.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        tck.status === "Resolvido"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {tck.status}
                    </span>
                  </div>

                  <p className="p-3 rounded-2xl bg-[#F8F5F3] text-slate-700 leading-relaxed italic">
                    "{tck.message}"
                  </p>

                  {tck.reply ? (
                    <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
                      <p className="font-bold text-[#720018]">Resposta da Equipe:</p>
                      <p className="text-slate-800 leading-relaxed">{tck.reply}</p>
                      <p className="text-[10px] text-slate-400">Respondido por: {tck.repliedBy}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setTicketReplyModal({ open: true, ticket: tck, replyText: "" })}
                      className="px-4 py-2 rounded-xl bg-[#720018] text-white font-bold text-xs hover:bg-[#4A0010]"
                    >
                      Responder Solicitação
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: AUDITORIA & LOGS */}
        {activeTab === "audit" && isAdmin && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4 animate-in fade-in">
            <h3 className="font-brand-title text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Logs de Auditoria do Sistema
            </h3>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#720018]">{log.action}</span>
                      <span className="text-slate-400">• {log.entity} ({log.entityId})</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{log.userName} ({log.userRole})</p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(log.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: CONFIGURAÇÕES DA LOJA */}
        {activeTab === "settings" && isAdmin && (
          <form onSubmit={handleUpdateStoreSettings} className="bg-white p-8 rounded-3xl border border-rose-100 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-brand-title text-sm font-bold text-slate-900">
                Configurações Gerais da Boutique C-MAS Modas
              </h3>
              <p className="text-xs text-slate-500">
                Ajuste os dados de contato oficial, WhatsApp (67) 99619-4762, taxas de frete e banners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Nome da Loja</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Telefone Principal</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">WhatsApp para Atendimento</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">E-mail Oficial</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-800 mb-1">Endereço da Loja Física</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Taxa de Entrega Campo Grande (R$)</label>
                <input
                  type="number"
                  step="1"
                  value={settings.deliveryFee}
                  onChange={(e) => setSettings({ ...settings, deliveryFee: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Frete Grátis a Partir de (R$)</label>
                <input
                  type="number"
                  step="10"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-800 mb-1">Texto da Barra de Anúncios</label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow cursor-pointer"
              >
                Salvar Configurações
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      {stockModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <h4 className="font-brand-title text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Ajuste de Estoque • {stockModal.product?.name}
            </h4>

            <form onSubmit={handleStockAdjustmentSubmit} className="space-y-4 text-xs">
              <p className="text-slate-600">
                Variação: <strong>{stockModal.variant?.colorName} (Tam {stockModal.variant?.size})</strong>
                <br />
                Estoque Atual: <strong>{stockModal.variant?.stock} unidades</strong>
              </p>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Tipo de Movimentação</label>
                <select
                  value={stockModal.type}
                  onChange={(e) => setStockModal({ ...stockModal, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold"
                >
                  <option value="ENTRADA">ENTRADA (Recebimento de Mercadoria)</option>
                  <option value="AJUSTE">SAÍDA / AJUSTE (Balanço ou Danificado)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Quantidade</label>
                <input
                  type="number"
                  min="1"
                  value={stockModal.changeQty}
                  onChange={(e) => setStockModal({ ...stockModal, changeQty: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold text-[#720018]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Motivo (Obrigatório para Auditoria)</label>
                <input
                  type="text"
                  required
                  value={stockModal.reason}
                  onChange={(e) => setStockModal({ ...stockModal, reason: e.target.value })}
                  placeholder="Ex: Chegada de reposição da fábrica"
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStockModal({ ...stockModal, open: false })}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Confirmar Ajuste
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Status Modal */}
      {orderStatusModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <h4 className="font-brand-title text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Atualizar Pedido #{orderStatusModal.order?.orderNumber}
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Novo Status</label>
                <select
                  value={orderStatusModal.newStatus}
                  onChange={(e) => setOrderStatusModal({ ...orderStatusModal, newStatus: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold text-[#720018]"
                >
                  <option value="Aguardando pagamento">Aguardando pagamento</option>
                  <option value="Pagamento aprovado">Pagamento aprovado</option>
                  <option value="Em preparação">Em preparação</option>
                  <option value="Pronto para retirada">Pronto para retirada</option>
                  <option value="Saiu para entrega">Saiu para entrega</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Cancelado">Cancelado (Restitui estoque)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Observação para o Cliente</label>
                <input
                  type="text"
                  placeholder="Ex: Pacote separado e despachado com motoboy"
                  value={orderStatusModal.note}
                  onChange={(e) => setOrderStatusModal({ ...orderStatusModal, note: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOrderStatusModal({ ...orderStatusModal, open: false })}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleOrderStatusUpdate}
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Reply Modal */}
      {ticketReplyModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <h4 className="font-brand-title text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Responder Ticket {ticketReplyModal.ticket?.protocol}
            </h4>

            <div className="space-y-4 text-xs">
              <p className="text-slate-600 italic">"{ticketReplyModal.ticket?.message}"</p>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Sua Resposta Oficial</label>
                <textarea
                  rows={4}
                  value={ticketReplyModal.replyText}
                  onChange={(e) => setTicketReplyModal({ ...ticketReplyModal, replyText: e.target.value })}
                  placeholder="Escreva a resposta para o cliente..."
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTicketReplyModal({ ...ticketReplyModal, open: false })}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleTicketReply}
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Enviar Resposta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 my-8 animate-in fade-in">
            <h4 className="font-brand-title text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Cadastrar Novo Produto na C-MAS Modas
            </h4>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Nome da Peça</label>
                <input
                  type="text"
                  required
                  value={npName}
                  onChange={(e) => setNpName(e.target.value)}
                  placeholder="Ex: Vestido Longo Crepe Vinho Nobre"
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Categoria</label>
                  <select
                    value={npCategory}
                    onChange={(e) => setNpCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-medium"
                  >
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Unissex">Unissex</option>
                    <option value="Teen">Teen</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Acessórios">Acessórios</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Subcategoria</label>
                  <select
                    value={npSubCategory}
                    onChange={(e) => setNpSubCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-medium"
                  >
                    <option value="Vestidos">Vestidos</option>
                    <option value="Alfaiataria">Alfaiataria</option>
                    <option value="Camisas">Camisas</option>
                    <option value="Conjuntos">Conjuntos</option>
                    <option value="Calças">Calças</option>
                    <option value="Acessórios">Acessórios</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Preço Normal (R$)</label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    placeholder="349.90"
                    value={npPrice}
                    onChange={(e) => setNpPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Preço Promocional (Opcional)</label>
                  <input
                    type="number"
                    step="0.10"
                    placeholder="299.90"
                    value={npPromoPrice}
                    onChange={(e) => setNpPromoPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold text-[#720018]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Composição do Tecido</label>
                <input
                  type="text"
                  value={npFabric}
                  onChange={(e) => setNpFabric(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">URL da Imagem de Destaque</label>
                <input
                  type="text"
                  value={npImage}
                  onChange={(e) => setNpImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Cor</label>
                  <input
                    type="text"
                    value={npColorName}
                    onChange={(e) => setNpColorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Tamanhos (Sep. vírgula)</label>
                  <input
                    type="text"
                    value={npSizes}
                    onChange={(e) => setNpSizes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Qtd / Tamanho</label>
                  <input
                    type="number"
                    value={npInitialStock}
                    onChange={(e) => setNpInitialStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Cadastrar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Coupon Modal */}
      {newCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <h4 className="font-brand-title text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Novo Cupom de Desconto
            </h4>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Código do Cupom</label>
                <input
                  type="text"
                  required
                  placeholder="EX: VERAO20"
                  value={ncCode}
                  onChange={(e) => setNcCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Tipo de Desconto</label>
                  <select
                    value={ncType}
                    onChange={(e) => setNcType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-medium"
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Valor do Desconto</label>
                  <input
                    type="number"
                    required
                    placeholder="15"
                    value={ncDiscount}
                    onChange={(e) => setNcDiscount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Pedido Mínimo (R$)</label>
                <input
                  type="number"
                  value={ncMinOrder}
                  onChange={(e) => setNcMinOrder(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 font-bold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewCouponModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Criar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Ver Pedidos do Vendedor */}
      {selectedSellerOrdersModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-brand-title text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C9A86A]" />
                  <span>Vendas Realizadas • {selectedSellerOrdersModal.sellerName}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Total de {selectedSellerOrdersModal.orders.length} pedidos atribuídos a este colaborador.
                </p>
              </div>
              <button
                onClick={() => setSelectedSellerOrdersModal({ open: false, sellerName: "", sellerId: "", orders: [] })}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto divide-y divide-slate-100 pr-1 space-y-3 max-h-[60vh]">
              {selectedSellerOrdersModal.orders.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-xs">Nenhum pedido registrado para este vendedor ainda.</p>
                </div>
              ) : (
                selectedSellerOrdersModal.orders.map((ord) => (
                  <div key={ord.id} className="pt-3 first:pt-0 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">#{ord.orderNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.channel === "fisica"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {ord.channel === "fisica" ? "Loja Física" : "Online"}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 font-medium">
                          {new Date(ord.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-[#720018] text-sm">
                          R$ {ord.total.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="block text-[10px] text-emerald-700 font-semibold">
                          Comissão: R$ {(ord.total * 0.05).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-600 text-[11px]">
                      <p>
                        Cliente: <strong>{ord.customerName}</strong> ({ord.customerPhone})
                      </p>
                      <p>
                        Pagamento: <strong>{ord.paymentMethod}</strong> ({ord.paymentStatus})
                      </p>
                    </div>

                    <div className="bg-[#F8F5F3] p-2.5 rounded-xl space-y-1">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-800">
                            {it.quantity}x {it.productName} ({it.variant.colorName}, {it.variant.size})
                          </span>
                          <span className="font-semibold text-slate-700">
                            R$ {(it.unitPrice * it.quantity).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSellerOrdersModal({ open: false, sellerName: "", sellerId: "", orders: [] })}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Atribuir ou Trocar Vendedor Responsável */}
      {reassignSellerModal.open && reassignSellerModal.order && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-brand-title text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#720018]" />
                <span>Atribuir Vendedor ao Pedido</span>
              </h4>
              <button
                onClick={() => setReassignSellerModal({ open: false, order: null, sellerId: "" })}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                <p className="text-slate-700">
                  Pedido: <strong className="text-slate-900 font-mono">#{reassignSellerModal.order.orderNumber}</strong>
                </p>
                <p className="text-slate-700 mt-1">
                  Cliente: <strong>{reassignSellerModal.order.customerName}</strong>
                </p>
                <p className="text-[#720018] font-bold text-sm mt-1">
                  Valor Total: R$ {reassignSellerModal.order.total.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-emerald-700 font-semibold text-[11px] mt-0.5">
                  Comissão a ser creditada (5%): R$ {(reassignSellerModal.order.total * 0.05).toFixed(2).replace(".", ",")}
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Selecione o Colaborador que Fechou a Venda
                </label>
                <select
                  value={reassignSellerModal.sellerId}
                  onChange={(e) => setReassignSellerModal({ ...reassignSellerModal, sellerId: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 font-semibold text-slate-900 text-xs focus:ring-1 focus:ring-[#720018] cursor-pointer"
                >
                  {staffMembers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.role === "VENDEDOR" ? "Vendedor(a)" : s.role === "GERENTE" ? "Gerente" : "Admin"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReassignSellerModal({ open: false, order: null, sellerId: "" })}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const seller = staffMembers.find((s) => s.id === reassignSellerModal.sellerId);
                    if (seller && reassignSellerModal.order) {
                      handleAssignSeller(reassignSellerModal.order.id, seller.id, seller.name);
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010] cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Desbloqueio Seguro do Perfil Administrador */}
      {adminUnlockModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#260008] via-[#3B000D] to-[#260008] border border-[#C9A86A]/40 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C9A86A]/20 text-[#C9A86A]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#F8F5F3]">
                    Acesso Restrito à Diretoria
                  </h4>
                  <span className="text-[10px] text-rose-200 block uppercase font-bold tracking-wider">
                    Sigilo Corporativo C-MAS
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setAdminUnlockModal(false);
                  setAdminUnlockPassword("");
                  setAdminUnlockError("");
                }}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              As contas dos Administradores e a identificação dos proprietários estão sob sigilo.
              Digite a senha do administrador para desbloquear as funções executivas:
            </p>

            <form onSubmit={handleConfirmAdminUnlock} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-rose-200 uppercase tracking-wider mb-1.5">
                  Senha do Administrador
                </label>
                <div className="relative">
                  <input
                    type={showAdminUnlockPass ? "text" : "password"}
                    value={adminUnlockPassword}
                    onChange={(e) => setAdminUnlockPassword(e.target.value)}
                    placeholder="Digite a senha de admin..."
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-xs placeholder:text-slate-500 focus:outline-hidden focus:border-[#C9A86A]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminUnlockPass(!showAdminUnlockPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showAdminUnlockPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {adminUnlockError && (
                  <p className="text-[11px] font-bold text-red-400 mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{adminUnlockError}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAdminUnlockModal(false);
                    setAdminUnlockPassword("");
                    setAdminUnlockError("");
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-xs hover:bg-white/10 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#C9A86A] text-[#32000B] font-bold text-xs uppercase tracking-wider hover:bg-[#b59557] cursor-pointer shadow"
                >
                  Confirmar Acesso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Trocar Senha do Administrador (Com Segurança e Sigilo) */}
      {changeAdminPassModal.open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-50 text-[#720018]">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand-title text-base font-bold text-slate-900">
                    Alterar Senha Administrativa
                  </h4>
                  <p className="text-xs text-slate-500">{changeAdminPassModal.userName}</p>
                </div>
              </div>
              <button
                onClick={() => setChangeAdminPassModal({ open: false, userId: "", userName: "" })}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Defina a nova senha do administrador. A senha permanecerá oculta no painel e
              será necessária para acessar as funções de administração.
            </p>

            <form onSubmit={handleChangeAdminPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nova Senha</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Mínimo 4 caracteres..."
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 text-xs focus:ring-1 focus:ring-[#720018]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirmar Nova Senha</label>
                <input
                  type={showNewPass ? "text" : "password"}
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  placeholder="Repita a nova senha..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 text-xs focus:ring-1 focus:ring-[#720018]"
                  required
                />
              </div>

              {changePassError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{changePassError}</span>
                </div>
              )}

              {changePassSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{changePassSuccess}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChangeAdminPassModal({ open: false, userId: "", userName: "" })}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] cursor-pointer shadow"
                >
                  Salvar Senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

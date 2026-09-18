import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { CartItem, Coupon, Order, PaymentMethod, DeliveryType } from "@/types";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  MapPin,
  QrCode,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Printer,
  MessageCircle,
  Sparkles,
  Lock,
  ChevronLeft,
  Store,
  User,
  Mail,
  Phone,
  FileText,
  LogIn,
  UserPlus,
  LogOut
} from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>(dataStore.getCart());
  const [currentUser, setCurrentUser] = useState(dataStore.getCurrentUser());
  const settings = dataStore.getSettings();

  // Auth Gate Tab State (if not logged in)
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCpf, setRegCpf] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regError, setRegError] = useState("");

  // Form State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Info, 2: Entrega, 3: Pagamento, 4: Confirmação
  const [customerName, setCustomerName] = useState(currentUser?.name || "");
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || "");
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || "(67) 99619-4762");
  const [customerCpf, setCustomerCpf] = useState(currentUser?.cpf || "");

  // Delivery State
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    location.state?.deliveryType || "Entrega em Campo Grande"
  );
  const [cep, setCep] = useState("79020-230");
  const [street, setStreet] = useState("Rua Euclides da Cunha");
  const [number, setNumber] = useState("1420");
  const [complement, setComplement] = useState("Apto 82");
  const [neighborhood, setNeighborhood] = useState("Jardim dos Estados");
  const [city] = useState("Campo Grande");
  const [state] = useState("MS");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PIX");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(1);

  // Coupons & Pricing
  const [couponCode, setCouponCode] = useState(location.state?.appliedCoupon || "");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState(location.state?.discount || 0);
  const [couponError, setCouponError] = useState("");
  const [copiedPix, setCopiedPix] = useState(false);

  // Resulting Order
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= settings.freeShippingThreshold;
  const deliveryFee = deliveryType === "Retirada na Loja Física" ? 0 : isFreeShipping ? 0 : settings.deliveryFee;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  useEffect(() => {
    const handleSyncUser = () => {
      const user = dataStore.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setCustomerName(user.name || "");
        setCustomerEmail(user.email || "");
        setCustomerPhone(user.phone || "(67) 99619-4762");
        setCustomerCpf(user.cpf || "");
      }
    };
    handleSyncUser();
    const unsub = dataStore.subscribe(handleSyncUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (cart.length === 0 && step !== 4) {
      navigate("/loja");
    }
  }, [cart, step, navigate]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = dataStore.login(loginEmail.trim(), loginPassword.trim());
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setCustomerName(res.user.name);
      setCustomerEmail(res.user.email);
      setCustomerPhone(res.user.phone || "(67) 99619-4762");
      setCustomerCpf(res.user.cpf || "");
    } else {
      setLoginError(res.error || "E-mail ou senha inválidos.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (regPassword !== regConfirmPassword) {
      setRegError("As senhas não coincidem.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const res = dataStore.register({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      cpf: regCpf.trim(),
      password: regPassword.trim()
    });

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setCustomerName(res.user.name);
      setCustomerEmail(res.user.email);
      setCustomerPhone(res.user.phone || regPhone.trim());
      setCustomerCpf(res.user.cpf || regCpf.trim());
    } else {
      setRegError(res.error || "Erro ao criar conta.");
    }
  };

  const handleLogout = () => {
    dataStore.logout();
    setCurrentUser(null);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const res = dataStore.validateCoupon(couponCode, subtotal);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      setDiscount(res.discount);
    } else {
      setCouponError(res.error || "Cupom inválido.");
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const handleCompleteOrder = () => {
    setIsSubmitting(true);
    setCheckoutError("");

    // Prepare order data
    const orderItems = cart.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      productName: item.productName,
      colorName: item.colorName,
      size: item.size,
      sku: item.sku,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.unitPrice * item.quantity,
      image: item.image
    }));

    const pixCode = `00020126580014br.gov.bcb.pix0136${settings.email}520400005303986540${total.toFixed(2)}5802BR5915CMAS MODAS LTDA6012CAMPO GRANDE62070503***6304`;

    const res = dataStore.createOrder({
      channel: "online",
      userId: currentUser?.id,
      customerName,
      customerEmail,
      customerPhone,
      customerCpf,
      items: orderItems,
      subtotal,
      discount,
      deliveryFee,
      total,
      deliveryType,
      shippingAddress:
        deliveryType === "Entrega em Campo Grande"
          ? { street, number, neighborhood, complement, city, state, cep }
          : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === "PIX" ? "Pendente" : "Aprovado",
      paymentDetails: {
        pixCopyPaste: pixCode,
        pixQrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`,
        cardLast4: paymentMethod === "Cartão de Crédito" ? cardNumber.slice(-4) || "4242" : undefined,
        installments: paymentMethod === "Cartão de Crédito" ? installments : undefined,
        transactionId: "TX-" + Math.random().toString(36).substring(2, 10).toUpperCase()
      },
      status: paymentMethod === "PIX" ? "Aguardando pagamento" : "Pagamento aprovado"
    });

    if (res.success && res.order) {
      setCompletedOrder(res.order);
      setStep(4);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#720018", "#C9A86A", "#FFFFFF"]
      });
    } else {
      setCheckoutError(res.error || "Erro ao processar pedido. Verifique o estoque.");
    }
    setIsSubmitting(false);
  };

  const handleSimulatePixPaid = () => {
    if (!completedOrder) return;
    const user = currentUser || { name: completedOrder.customerName, role: "CLIENTE" as const };
    dataStore.updateOrderStatus(completedOrder.id, "Pagamento aprovado", user, "PIX confirmado instantaneamente pelo simulador.");
    setCompletedOrder({ ...completedOrder, status: "Pagamento aprovado", paymentStatus: "Aprovado" });
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ["#059669", "#C9A86A", "#720018"]
    });
  };

  const copyPixToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  // SUCCESS / CONFIRMATION SCREEN
  if (step === 4 && completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-in fade-in">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Pedido Realizado com Sucesso!
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
            Obrigado pela sua compra, {completedOrder.customerName.split(" ")[0]}!
          </h1>
          <p className="text-xs text-slate-500">
            Número do Pedido: <strong className="text-[#720018] font-mono text-sm">{completedOrder.orderNumber}</strong>
          </p>
        </div>

        {/* PIX Payment Instructions if Pending */}
        {completedOrder.paymentMethod === "PIX" && completedOrder.paymentStatus === "Pendente" && (
          <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <QrCode className="w-5 h-5 text-[#720018]" />
                <span>Pague com PIX para liberar o envio imediato</span>
              </div>
              <span className="text-xs font-bold text-[#720018]">
                R$ {completedOrder.total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl border border-amber-200">
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                <img
                  src={completedOrder.paymentDetails?.pixQrCode}
                  alt="QR Code PIX C-MAS Modas"
                  className="w-40 h-40"
                />
              </div>

              <div className="flex-1 space-y-3 text-xs">
                <p className="text-slate-700 font-medium leading-relaxed">
                  Abra o aplicativo do seu banco, escolha <strong>Pagar com PIX</strong> e aponte a câmera ou utilize o código Copia e Cola abaixo.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={completedOrder.paymentDetails?.pixCopyPaste || ""}
                    className="flex-1 px-3 py-2 text-[11px] font-mono bg-slate-100 border border-slate-200 rounded-lg"
                  />
                  <button
                    onClick={() => copyPixToClipboard(completedOrder.paymentDetails?.pixCopyPaste || "")}
                    className="px-3 py-2 bg-[#720018] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 hover:bg-[#4A0010]"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPix ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSimulatePixPaid}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simular Pagamento PIX Aprovado</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Card / Recibo */}
        <div id="printable-order-receipt" className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-6 text-xs">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <BrandLogo size="sm" variant="burgundy" />
              <p className="text-slate-500 mt-2 text-[11px]">
                {settings.address}, {settings.city} - {settings.state}
              </p>
              <p className="text-slate-500 text-[11px]">WhatsApp: {settings.phone}</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-[#720018] font-bold text-[11px] border border-rose-200">
                Status: {completedOrder.status}
              </span>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Data: {new Date(completedOrder.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-slate-700">
            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-1">Dados do Cliente</p>
              <p>{completedOrder.customerName}</p>
              <p>{completedOrder.customerEmail}</p>
              <p>{completedOrder.customerPhone}</p>
              <p>CPF: {completedOrder.customerCpf}</p>
            </div>

            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-1">Forma de Envio</p>
              <p className="font-semibold text-[#720018]">{completedOrder.deliveryType}</p>
              {completedOrder.shippingAddress ? (
                <p className="text-slate-600 mt-0.5">
                  {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.number}
                  {completedOrder.shippingAddress.complement && ` - ${completedOrder.shippingAddress.complement}`}
                  <br />
                  {completedOrder.shippingAddress.neighborhood} - {completedOrder.shippingAddress.city}/{completedOrder.shippingAddress.state}
                  <br />
                  CEP: {completedOrder.shippingAddress.cep}
                </p>
              ) : (
                <p className="text-slate-600 mt-0.5">
                  Retirada no balcão da loja física: {settings.address}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <p className="font-bold text-slate-900 uppercase tracking-wider">Itens do Pedido</p>
            <div className="divide-y divide-slate-100">
              {completedOrder.items.map((it, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.productName}
                      className="w-12 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{it.productName}</p>
                      <p className="text-[11px] text-slate-500">
                        Cor: {it.colorName} • Tam: {it.size} • Qtd: {it.quantity} un.
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    R$ {it.totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial summary */}
          <div className="pt-4 border-t border-slate-100 space-y-1.5 text-right">
            <p className="text-slate-500">
              Subtotal: <strong>R$ {completedOrder.subtotal.toFixed(2).replace(".", ",")}</strong>
            </p>
            {completedOrder.discount > 0 && (
              <p className="text-emerald-700 font-semibold">
                Desconto: <strong>- R$ {completedOrder.discount.toFixed(2).replace(".", ",")}</strong>
              </p>
            )}
            <p className="text-slate-500">
              Frete: <strong>{completedOrder.deliveryFee === 0 ? "Grátis" : `R$ ${completedOrder.deliveryFee.toFixed(2).replace(".", ",")}`}</strong>
            </p>
            <p className="text-base font-bold text-[#720018] pt-1">
              Total Pago: R$ {completedOrder.total.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-[11px] text-slate-400">Forma de Pagamento: {completedOrder.paymentMethod}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
              `Olá C-MAS Modas! Acabei de realizar o pedido #${completedOrder.orderNumber} no valor de R$ ${completedOrder.total.toFixed(2)}. Meu nome é ${completedOrder.customerName}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow"
          >
            <MessageCircle className="w-4 h-4 text-[#C9A86A]" />
            <span>Confirmar no WhatsApp da Loja</span>
          </a>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Comprovante</span>
          </button>

          <Link
            to="/cliente"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors"
          >
            <span>Acompanhar em Meus Pedidos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // REGULAR CHECKOUT FLOW (Steps 1, 2, 3)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Checkout Steps Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? "text-[#720018]" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-[#720018] text-white" : "bg-slate-200"}`}>
              1
            </span>
            <span className="hidden sm:inline">Identificação</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? "text-[#720018]" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-[#720018] text-white" : "bg-slate-200"}`}>
              2
            </span>
            <span className="hidden sm:inline">Entrega / Retirada</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? "text-[#720018]" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-[#720018] text-white" : "bg-slate-200"}`}>
              3
            </span>
            <span className="hidden sm:inline">Pagamento</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          {checkoutError && (
            <div className="p-4 rounded-2xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{checkoutError}</span>
            </div>
          )}

          {/* OBRIGATORIEDADE DE CONTA / AUTENTICAÇÃO */}
          {!currentUser ? (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#720018] shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 space-y-1">
                  <p className="font-bold text-sm text-[#720018]">
                    Conta Obrigatória para Comprar na C-MAS Modas
                  </p>
                  <p className="leading-relaxed">
                    Para garantir a segurança da sua transação, emissão do comprovante fiscal e rastreamento em tempo real do seu pedido, é obrigatório possuir uma conta de cliente ou administrador.
                  </p>
                </div>
              </div>

              {/* Tabs: Entrar vs Criar Conta */}
              <div className="flex border-b border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthTab("login")}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    authTab === "login"
                      ? "border-[#720018] text-[#720018]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Já tenho conta (Entrar)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("register")}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    authTab === "register"
                      ? "border-[#720018] text-[#720018]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Criar Nova Conta</span>
                </button>
              </div>

              {/* TAB 1: LOGIN */}
              {authTab === "login" && (
                <div className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">E-mail</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="seu.email@exemplo.com.br"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Senha</label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                        />
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Entrar e Continuar Compra</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: REGISTER */}
              {authTab === "register" && (
                <div className="space-y-4">
                  {regError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Nome Completo</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Ex: Mariana Albuquerque"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">E-mail</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="mariana@exemplo.com.br"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">WhatsApp / Celular</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="(67) 99619-4762"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                          />
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1">CPF</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="000.000.000-00"
                            value={regCpf}
                            onChange={(e) => setRegCpf(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                          />
                          <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Senha</label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            placeholder="Mínimo 6 dígitos"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                          />
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Confirmar Senha</label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            placeholder="Repita a senha"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                          />
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Cadastrar e Continuar Pedido</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* STEP 1: IDENTIFICAÇÃO CONFIRMADA */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
                        1. Dados do Comprador
                      </h2>
                      <p className="text-xs text-slate-500">
                        Sua conta está conectada e verificada para emissão do pedido.
                      </p>
                    </div>
                  </div>

                  {/* Connected User Verified Card */}
                  <div className="p-4 rounded-2xl bg-[#F8F5F3] border border-rose-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#720018] text-white flex items-center justify-center font-bold text-sm uppercase shadow-xs">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div className="text-xs">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{currentUser.name}</p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-[#720018] border border-rose-200">
                            {currentUser.role}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">{currentUser.email}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:text-red-700 hover:border-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Trocar Conta</span>
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Nome Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Mariana Albuquerque"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">E-mail</label>
                        <input
                          type="email"
                          required
                          placeholder="mariana@exemplo.com.br"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1">WhatsApp / Telefone</label>
                        <input
                          type="text"
                          required
                          placeholder="(67) 99619-4762"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">CPF (Obrigatório para emissão)</label>
                      <input
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={customerCpf}
                        onChange={(e) => setCustomerCpf(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !customerCpf.trim()}
                      onClick={() => setStep(2)}
                      className="px-8 py-3 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow flex items-center gap-2 cursor-pointer disabled:opacity-40"
                    >
                      <span>Continuar para Entrega</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

          {/* STEP 2: ENTREGA / RETIRADA */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
                    2. Forma de Recebimento
                  </h2>
                  <p className="text-xs text-slate-500">
                    Escolha entre receber em seu endereço em Campo Grande ou retirar na boutique.
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-[#720018] flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              </div>

              {/* Delivery Choice Radio Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryType("Entrega em Campo Grande")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    deliveryType === "Entrega em Campo Grande"
                      ? "border-[#720018] bg-rose-50/60 shadow-sm font-semibold"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Truck className="w-5 h-5 text-[#720018]" />
                    <span className="font-bold text-[#720018]">
                      {isFreeShipping ? "Frete Grátis" : `R$ ${settings.deliveryFee.toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900">Entrega em Campo Grande</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Entrega expressa diretamente no seu endereço em até 24h úteis.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("Retirada na Loja Física")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    deliveryType === "Retirada na Loja Física"
                      ? "border-[#720018] bg-rose-50/60 shadow-sm font-semibold"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Store className="w-5 h-5 text-[#720018]" />
                    <span className="font-bold text-emerald-700">Grátis</span>
                  </div>
                  <p className="font-bold text-slate-900">Retirada na Boutique</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {settings.address}, Centro - Campo Grande/MS.
                  </p>
                </button>
              </div>

              {/* Delivery Address Form if selected */}
              {deliveryType === "Entrega em Campo Grande" && (
                <div className="p-4 rounded-2xl bg-[#F8F5F3] border border-rose-100 space-y-3 text-xs">
                  <p className="font-bold text-slate-900 uppercase tracking-wider">
                    Endereço de Entrega (Campo Grande - MS)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">CEP</label>
                      <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-800 mb-1">Bairro</label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block font-bold text-slate-800 mb-1">Rua / Avenida</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Número</label>
                      <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Complemento / Referência (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: Apto 82, Bloco B, Próximo ao Parque"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Ir para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAGAMENTO */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
                    3. Forma de Pagamento
                  </h2>
                  <p className="text-xs text-slate-500">
                    Selecione como deseja efetuar o pagamento com total segurança.
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-[#720018] flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("PIX")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    paymentMethod === "PIX"
                      ? "border-[#720018] bg-rose-50/60 shadow-sm font-semibold"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#720018] mb-1" />
                  <p className="font-bold text-slate-900">PIX Instantâneo</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">Aprovação imediata</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Cartão de Crédito")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    paymentMethod === "Cartão de Crédito"
                      ? "border-[#720018] bg-rose-50/60 shadow-sm font-semibold"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#720018] mb-1" />
                  <p className="font-bold text-slate-900">Cartão de Crédito</p>
                  <p className="text-[10px] text-slate-500">Até 6x sem juros</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Dinheiro na Retirada")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    paymentMethod === "Dinheiro na Retirada"
                      ? "border-[#720018] bg-rose-50/60 shadow-sm font-semibold"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#720018] mb-1" />
                  <p className="font-bold text-slate-900">Pagar na Retirada</p>
                  <p className="text-[10px] text-slate-500">Balcão da Loja Física</p>
                </button>
              </div>

              {/* Card Form */}
              {paymentMethod === "Cartão de Crédito" && (
                <div className="p-5 rounded-2xl bg-[#F8F5F3] border border-rose-100 space-y-3.5 text-xs">
                  <p className="font-bold text-slate-900 uppercase tracking-wider">
                    Dados do Cartão de Crédito
                  </p>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8492"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Nome Impresso no Cartão</label>
                    <input
                      type="text"
                      placeholder="MARIANA ALBUQUERQUE"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Parcelamento</label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018] font-medium"
                    >
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <option key={i} value={i}>
                          {i}x de R$ {(total / i).toFixed(2).replace(".", ",")} sem juros
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {paymentMethod === "PIX" && (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-emerald-700 shrink-0" />
                  <p>
                    Ao finalizar o pedido, geraremos seu <strong>QR Code PIX</strong> e chave Copia e Cola instantânea. Seu estoque será reservado imediatamente.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Voltar
                </button>
                <button
                  id="btn-submit-order"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCompleteOrder}
                  className="px-8 py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#4A0010] transition-colors shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isSubmitting ? "Processando..." : `Confirmar Pedido • R$ ${total.toFixed(2).replace(".", ",")}`}</span>
                </button>
              </div>
            </div>
          )}
          </>
        )}
        </div>

        {/* Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          <h3 className="font-brand-title text-sm font-bold text-slate-900 tracking-wide border-b border-slate-100 pb-3">
            Resumo do Pedido ({cart.length} itens)
          </h3>

          {/* Items List */}
          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="py-3 flex gap-3 text-xs">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-14 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 line-clamp-1">{item.productName}</p>
                    <p className="text-[11px] text-slate-500">
                      Cor: {item.colorName} • Tam: {item.size} • Qtd: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-[#720018] text-right">
                    R$ {(item.unitPrice * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Input */}
          <form onSubmit={handleApplyCoupon} className="space-y-1 text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Cupom (ex: CASHBACK25)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018] uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl hover:bg-black transition-colors"
              >
                Aplicar
              </button>
            </div>
            {couponError && <p className="text-[11px] text-red-600 font-medium">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-[11px] text-emerald-700 font-bold">
                Cupom {appliedCoupon.code} aplicado com sucesso!
              </p>
            )}
          </form>

          {/* Pricing Totals */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Desconto</span>
                <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Frete ({deliveryType === "Retirada na Loja Física" ? "Retirada" : "Campo Grande"})</span>
              <span>
                {deliveryFee === 0 ? <strong className="text-emerald-700">Grátis</strong> : `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span className="text-[#720018] text-lg">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#720018]" />
              <span>Compra 100% Segura C-MAS Modas</span>
            </div>
            <p>Seus dados protegidos por criptografia. Garantia e atendimento na loja de Campo Grande - MS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

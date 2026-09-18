import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { CartItem, Coupon } from "@/types";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(dataStore.getCart());
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [deliveryType, setDeliveryType] = useState<"entrega" | "retirada">("entrega");

  const settings = dataStore.getSettings();

  const reloadCart = () => {
    setCart(dataStore.getCart());
  };

  useEffect(() => {
    reloadCart();
    const unsub = dataStore.subscribe(reloadCart);
    return () => unsub();
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= settings.freeShippingThreshold;
  const deliveryFee = deliveryType === "retirada" ? 0 : isFreeShipping ? 0 : settings.deliveryFee;
  const total = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCode.trim()) return;

    const result = dataStore.validateCoupon(couponCode, subtotal);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      setCouponDiscount(result.discount);
    } else {
      setCouponError(result.error || "Cupom inválido.");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    setCouponError("");
  };

  const handleUpdateQty = (productId: string, variantId: string, delta: number, currentQty: number) => {
    const newQty = currentQty + delta;
    dataStore.updateCartQuantity(productId, variantId, newQty);
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    dataStore.removeFromCart(productId, variantId);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout", {
      state: {
        appliedCoupon: appliedCoupon?.code,
        discount: couponDiscount,
        deliveryType: deliveryType === "entrega" ? "Entrega em Campo Grande" : "Retirada na Loja Física"
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8F5F3]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#720018] text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-brand-title text-base font-bold text-slate-900 tracking-wide">
                  Sua Sacola C-MAS
                </h3>
                <p className="text-xs text-slate-500">
                  {cart.length} {cart.length === 1 ? "item selecionado" : "itens selecionados"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-rose-100 text-slate-500 hover:text-[#720018] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-rose-50 px-5 py-2.5 border-b border-rose-100 text-xs">
            {subtotal >= settings.freeShippingThreshold ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Parabéns! Você ganhou Frete Grátis em Campo Grande!</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-slate-700 mb-1">
                  <span>Faltam <strong>R$ {(settings.freeShippingThreshold - subtotal).toFixed(2).replace(".", ",")}</strong> para <strong>Frete Grátis</strong></span>
                  <Truck className="w-3.5 h-3.5 text-[#720018]" />
                </div>
                <div className="w-full bg-rose-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#720018] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / settings.freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-[#720018]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-slate-800">Sua sacola está vazia</h4>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Descubra peças de alfaiataria fina, vestidos sofisticados e novidades da boutique C-MAS Modas.
                </p>
                <Link
                  to="/loja"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#720018] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#4A0010] transition-colors shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Explorar Coleção</span>
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="py-4 flex gap-3.5">
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-xl border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/produto/${item.productSlug}`}
                          onClick={onClose}
                          className="font-medium text-xs text-slate-900 hover:text-[#720018] line-clamp-2 leading-snug"
                        >
                          {item.productName}
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item.productId, item.variantId)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          {item.colorName}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                          Tam {item.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => handleUpdateQty(item.productId, item.variantId, -1, item.quantity)}
                          className="p-1 text-slate-600 hover:text-[#720018] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.productId, item.variantId, +1, item.quantity)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-slate-600 hover:text-[#720018] disabled:opacity-30 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-[#720018]">
                          R$ {(item.unitPrice * item.quantity).toFixed(2).replace(".", ",")}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-slate-400">
                            (R$ {item.unitPrice.toFixed(2).replace(".", ",")} un.)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F8F5F3] border-t border-slate-200 space-y-3.5">
              {/* Coupon Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cupom <strong>{appliedCoupon.code}</strong> aplicado</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-emerald-700 hover:underline font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupom (ex: CASHBACK25)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-1.5 text-xs uppercase bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#720018]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#720018] text-white text-xs font-semibold rounded-lg hover:bg-[#4A0010] transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>

              {/* Delivery Type Option */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setDeliveryType("entrega")}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    deliveryType === "entrega"
                      ? "border-[#720018] bg-rose-50/60 font-semibold text-[#720018]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <p className="font-semibold text-slate-800">Entrega Campo Grande</p>
                  <p className="text-[10px] text-slate-500">
                    {isFreeShipping ? "Frete Grátis" : `R$ ${settings.deliveryFee.toFixed(2).replace(".", ",")}`}
                  </p>
                </button>

                <button
                  onClick={() => setDeliveryType("retirada")}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    deliveryType === "retirada"
                      ? "border-[#720018] bg-rose-50/60 font-semibold text-[#720018]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <p className="font-semibold text-slate-800">Retirada na Loja</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Grátis no Centro</p>
                </button>
              </div>

              {/* Price summary */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto do Cupom</span>
                    <span>- R$ {couponDiscount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Frete</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-700">Grátis</strong>
                    ) : (
                      `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-[#720018] text-base">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="btn-cart-checkout"
                onClick={handleCheckout}
                className="w-full py-3 px-4 rounded-xl bg-[#720018] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#4A0010] active:scale-[0.99] transition-all shadow-md cursor-pointer"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

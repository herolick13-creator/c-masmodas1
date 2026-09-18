import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Product, ProductReview } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Share2,
  Plus,
  Minus,
  MessageCircle,
  MapPin,
  Send
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  onOpenCart: () => void;
}

export default function ProductDetail({ onOpenCart }: ProductDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cepQuery, setCepQuery] = useState<string>("");
  const [cepResult, setCepResult] = useState<string | null>(null);

  // Review Modal state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewName, setReviewName] = useState<string>("");
  const [reviewComment, setReviewComment] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState<string>("");

  const settings = dataStore.getSettings();

  const reloadProduct = () => {
    if (!slug) return;
    const found = dataStore.getProductBySlug(slug);
    setProduct(found);
    if (found) {
      if (!selectedImage) setSelectedImage(found.images[0]);
      if (!selectedColor) setSelectedColor(found.colors[0]?.name || "");
      if (!selectedSize) setSelectedSize(found.sizes[0] || "");
      setIsFavorite(dataStore.getFavorites().includes(found.id));
    }
  };

  useEffect(() => {
    reloadProduct();
    const unsub = dataStore.subscribe(reloadProduct);
    return () => unsub();
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif-luxury text-3xl font-bold text-slate-800">Produto não encontrado</h2>
        <p className="text-xs text-slate-500">O produto solicitado pode ter sido descontinuado ou movido.</p>
        <Link
          to="/loja"
          className="inline-flex px-6 py-2.5 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider"
        >
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  // Find exact matching variant for selected color and size
  const currentVariant = product.variants.find(
    (v) => v.colorName === selectedColor && v.size === selectedSize
  ) || product.variants.find((v) => v.colorName === selectedColor) || product.variants[0];

  const currentStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = currentStock <= 0;

  const priceToDisplay = product.promoPrice || product.price;
  const hasDiscount = !!product.promoPrice && product.promoPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : 0;

  const installments = 6;
  const formatMoney = (val: number) =>
    val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const installmentValue = formatMoney(priceToDisplay / installments);

  const handleToggleFavorite = () => {
    const state = dataStore.toggleFavorite(product.id);
    setIsFavorite(state);
  };

  const handleAddToCart = () => {
    if (!currentVariant || isOutOfStock) return;

    dataStore.addToCart({
      productId: product.id,
      variantId: currentVariant.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images[0],
      colorName: currentVariant.colorName,
      colorHex: currentVariant.colorHex,
      size: currentVariant.size,
      sku: currentVariant.sku,
      unitPrice: priceToDisplay,
      quantity,
      maxStock: currentVariant.stock
    });

    onOpenCart();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handleCepCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cepQuery.replace(/\D/g, "");
    if (cleanCep.length >= 8) {
      if (priceToDisplay >= settings.freeShippingThreshold) {
        setCepResult("Frete Grátis para Campo Grande - MS (Entrega expressa em até 24h úteis)");
      } else {
        setCepResult(`Entrega em Campo Grande: R$ ${settings.deliveryFee.toFixed(2).replace(".", ",")} (Receba em até 24h úteis)`);
      }
    } else {
      setCepResult("Por favor, digite um CEP válido com 8 dígitos.");
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const user = dataStore.getCurrentUser();
    dataStore.addReview({
      productId: product.id,
      userId: user?.id || "guest",
      userName: reviewName.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || undefined,
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    // Update product rating average
    const reviews = dataStore.getProductReviews(product.id);
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    dataStore.updateProduct(
      product.id,
      { rating: Number(avg.toFixed(1)), reviewCount: reviews.length },
      user || { name: "Cliente", role: "CLIENTE" }
    );

    setShowReviewModal(false);
    setReviewComment("");
    setReviewTitle("");
    setReviewName("");
  };

  const reviews = dataStore.getProductReviews(product.id);
  const relatedProducts = dataStore
    .getProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-[#720018]">Início</Link>
        <span>/</span>
        <Link to={`/loja?categoria=${product.category}`} className="hover:text-[#720018]">{product.category}</Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section: Gallery + Purchase Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Gallery Col (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer",
                  selectedImage === img
                    ? "border-[#720018] shadow-md ring-2 ring-[#720018]/20"
                    : "border-slate-200 opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="flex-1 relative aspect-[3/4] bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm group">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {hasDiscount && (
                <span className="px-3 py-1 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider shadow">
                  -{discountPercent}% OFF
                </span>
              )}
              {product.isNewArrival && (
                <span className="px-3 py-1 rounded-full bg-[#4A0010] text-[#C9A86A] text-xs font-bold uppercase tracking-wider shadow border border-[#C9A86A]/40">
                  Novidade
                </span>
              )}
            </div>

            <button
              onClick={handleToggleFavorite}
              className={cn(
                "absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer",
                isFavorite
                  ? "bg-[#720018] text-white"
                  : "bg-white/80 text-slate-700 hover:text-[#720018] hover:bg-white"
              )}
              title="Salvar nos Favoritos"
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Purchase Configurator Col (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="uppercase tracking-widest font-semibold text-[#720018]">
                {product.category} • {product.subCategory}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">SKU: {currentVariant?.sku || product.skuBase}</span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {product.id === "prod-camisa-dourada-royale-500" && (
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#32000B] text-[#C9A86A] shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#32000B] uppercase tracking-wider text-[11px]">
                      Peça de Alta Costura C-MAS Royale
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#32000B] text-[#C9A86A] font-extrabold text-[10px] tracking-wider">
                      500 UNIDADES MUNDIAIS
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Valor de referência internacional: <strong className="text-slate-900">US$ 15.000,00</strong> (corrigido e cotado em <strong className="text-[#720018]">R$ 86.250,00</strong> na cotação oficial comercial). Tiragem numerada com Certificado de Autenticidade C-MAS.
                  </p>
                </div>
              </div>
            )}

            {/* Ratings summary */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.round(product.rating) ? "fill-amber-400" : "text-slate-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} avaliações)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-white border border-rose-100/80 shadow-xs space-y-1">
            {hasDiscount && (
              <p className="text-xs text-slate-400 line-through">
                De: R$ {formatMoney(product.price)}
              </p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#720018]">
                R$ {formatMoney(priceToDisplay)}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                À vista no PIX com aprovação imediata
              </span>
            </div>
            {product.id === "prod-camisa-dourada-royale-500" && (
              <p className="text-xs text-amber-800 font-medium">
                Equivalente a <strong>US$ 15.000,00</strong> (Câmbio comercial oficial R$ 5,75/USD)
              </p>
            )}
            <p className="text-xs text-slate-500 pt-1">
              ou em até <strong>{installments}x de R$ {installmentValue}</strong> sem juros no cartão
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider">Cor Selecionada:</span>
              <span className="font-semibold text-[#720018]">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer",
                    selectedColor === c.name
                      ? "border-[#720018] bg-rose-50/60 font-semibold text-[#720018] ring-2 ring-[#720018]/20"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  )}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector & Stock status */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider">Tamanho:</span>
              <span className="text-slate-400 underline cursor-pointer hover:text-[#720018]">
                Guia de Medidas C-MAS
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => {
                const variantForSize = product.variants.find(
                  (v) => v.colorName === selectedColor && v.size === sz
                );
                const hasStock = variantForSize ? variantForSize.stock > 0 : false;
                const isSelected = selectedSize === sz;

                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    disabled={!hasStock}
                    className={cn(
                      "min-w-[44px] h-10 px-3 rounded-xl border font-bold text-xs flex items-center justify-center transition-all cursor-pointer",
                      isSelected
                        ? "bg-[#720018] text-white border-[#720018] shadow-sm"
                        : hasStock
                        ? "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through"
                    )}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Unified Stock Status */}
            <div className="pt-1 text-xs">
              {isOutOfStock ? (
                <p className="text-red-600 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Variação esgotada no momento. Fale com nosso atendimento no WhatsApp para encomenda.</span>
                </p>
              ) : currentStock <= 3 ? (
                <p className="text-amber-700 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Apenas {currentStock} unidades restantes no estoque unificado!</span>
                </p>
              ) : (
                <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Em estoque na loja física e online ({currentStock} unidades disponíveis)</span>
                </p>
              )}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 hover:text-[#720018] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                  className="p-2 text-slate-600 hover:text-[#720018] disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                id="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? "Indisponível" : "Adicionar à Sacola"}</span>
              </button>
            </div>

            {/* Buy Now Instant CTA */}
            <button
              id="btn-buy-now"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#B38D4F] text-[#32000B] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" />
              <span>Comprar Agora</span>
            </button>
          </div>

          {/* Delivery & Physical Pickup Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#720018]" />
                <span>Calcular Entrega ou Retirada</span>
              </span>
              <span className="text-[#720018]">Campo Grande - MS</span>
            </div>

            <form onSubmit={handleCepCalculate} className="flex gap-2">
              <input
                type="text"
                placeholder="Digite seu CEP (ex: 79002-072)"
                value={cepQuery}
                onChange={(e) => setCepQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#720018]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Calcular
              </button>
            </form>

            {cepResult && (
              <p className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                {cepResult}
              </p>
            )}

            <div className="pt-2 border-t border-slate-200/80 space-y-2 text-slate-600 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#720018] shrink-0 mt-0.5" />
                <span>
                  <strong>Retirada Grátis:</strong> {settings.address}, Centro - Campo Grande/MS.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#720018] shrink-0 mt-0.5" />
                <span>Peça autêntica C-MAS Modas com certificado de garantia e troca garantida por 7 dias.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details, Fabric & Care Tabs */}
      <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-6">
        <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          Descrição & Detalhes da Peça
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-slate-700">
          <div className="space-y-4">
            <p className="text-sm font-light text-slate-800 leading-relaxed">
              {product.description}
            </p>
            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                Composição do Tecido
              </p>
              <p className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 font-medium text-[#720018]">
                {product.fabric}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-slate-900 uppercase tracking-wider">
              Diferenciais de Acabamento
            </p>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-slate-900">
              Avaliações de Clientes ({reviews.length})
            </h3>
            <p className="text-xs text-slate-500">Opiniões de quem já veste esta peça da C-MAS Modas.</p>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow cursor-pointer"
          >
            Avaliar este Produto
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl bg-[#F8F5F3] border border-rose-100/60 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn("w-3.5 h-3.5", i < rev.rating ? "fill-amber-400" : "text-slate-300")}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(rev.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>

              {rev.title && <p className="font-bold text-slate-900">{rev.title}</p>}
              <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                <span className="font-semibold text-slate-800">{rev.userName}</span>
                {rev.verifiedPurchase && (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#720018] uppercase tracking-widest">
              Complete o Look
            </span>
            <h3 className="font-serif-luxury text-3xl font-bold text-slate-900">
              Você Também Pode Gostar
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOpenCart={onOpenCart} />
            ))}
          </div>
        </section>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-brand-title text-base font-bold text-slate-900">Avaliar {product.name}</h4>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Sua Nota</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={cn(
                          "w-6 h-6 transition-colors",
                          star <= reviewRating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                        )}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-[#720018]">{reviewRating} de 5 estrelas</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Albuquerque"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Título da Avaliação (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Caimento perfeito e tecido excelente!"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Seu Depoimento</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Conte o que achou do produto, caimento, tecido e entrega..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5F3] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#720018] text-white font-bold uppercase tracking-wider hover:bg-[#4A0010]"
                >
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { dataStore } from "@/services/dataStore";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onOpenCart?: () => void;
}

export default function ProductCard({ product, onOpenCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [isFavorite, setIsFavorite] = useState(dataStore.getFavorites().includes(product.id));
  const [justAdded, setJustAdded] = useState(false);

  const priceToDisplay = product.promoPrice || product.price;
  const hasDiscount = !!product.promoPrice && product.promoPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : 0;

  const installments = 6;
  const formatMoney = (val: number) =>
    val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const installmentValue = formatMoney(priceToDisplay / installments);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const state = dataStore.toggleFavorite(product.id);
    setIsFavorite(state);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Pick first available variant for the selected color or first variant
    const matchingVariant =
      product.variants.find((v) => v.colorName === selectedColor && v.stock > 0) ||
      product.variants.find((v) => v.stock > 0);

    if (!matchingVariant) {
      alert("Produto temporariamente sem estoque nesta variação.");
      return;
    }

    dataStore.addToCart({
      productId: product.id,
      variantId: matchingVariant.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images[0],
      colorName: matchingVariant.colorName,
      colorHex: matchingVariant.colorHex,
      size: matchingVariant.size,
      sku: matchingVariant.sku,
      unitPrice: priceToDisplay,
      quantity: 1,
      maxStock: matchingVariant.stock
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
    if (onOpenCart) onOpenCart();
  };

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-rose-100/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#720018]/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges & Favorite Overlay */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.id === "prod-camisa-dourada-royale-500" && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A86A] text-[#260008] text-[10px] font-extrabold tracking-wider uppercase shadow-md border border-white/40">
              ⚜️ Edição 500 Unid. • US$ 15k
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#720018] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#4A0010] text-[#C9A86A] text-[10px] font-bold tracking-wider uppercase shadow-xs border border-[#C9A86A]/40">
              Novidade
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#C9A86A] text-[#32000B] text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Destaque
            </span>
          )}
          {totalStock <= 3 && totalStock > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold uppercase shadow-xs">
              Últimas {totalStock} un.
            </span>
          )}
        </div>

        <button
          onClick={handleToggleFavorite}
          className={cn(
            "p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xs",
            isFavorite
              ? "bg-[#720018] text-white"
              : "bg-white/80 text-slate-600 hover:text-[#720018] hover:bg-white"
          )}
          title={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/produto/${product.slug}`} className="relative aspect-[3/4] bg-slate-100 overflow-hidden block">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick Add overlay button on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            disabled={totalStock <= 0}
            className="w-full py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-md text-[#720018] font-bold text-xs uppercase tracking-wider hover:bg-[#720018] hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Adicionado!</span>
              </>
            ) : totalStock <= 0 ? (
              <span>Esgotado</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Adicionar Rápido</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Info & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-medium text-[#720018]/80">
              {product.category} • {product.subCategory}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/produto/${product.slug}`}
            className="font-serif-luxury text-base font-semibold text-slate-900 group-hover:text-[#720018] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Color swatch selection */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={cn(
                  "w-3.5 h-3.5 rounded-full border transition-all cursor-pointer",
                  selectedColor === c.name
                    ? "ring-2 ring-[#720018] ring-offset-1 border-white"
                    : "border-slate-300 hover:scale-110"
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-slate-400 ml-1 truncate max-w-[90px]">
              {selectedColor}
            </span>
          </div>
        </div>

        {/* Price and Installment info */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
          <div>
            {hasDiscount && (
              <p className="text-[11px] text-slate-400 line-through">
                R$ {formatMoney(product.price)}
              </p>
            )}
            <div className="flex items-baseline gap-1.5">
              <p className="font-bold text-sm text-[#720018]">
                R$ {formatMoney(priceToDisplay)}
              </p>
              {product.id === "prod-camisa-dourada-royale-500" && (
                <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                  US$ 15k
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500">
              ou {installments}x de R$ {installmentValue}
            </p>
          </div>

          {/* Mobile Quick Add Icon */}
          <button
            onClick={handleQuickAdd}
            disabled={totalStock <= 0}
            className="sm:hidden p-2 rounded-xl bg-rose-50 text-[#720018] hover:bg-[#720018] hover:text-white transition-colors disabled:opacity-40"
            title="Adicionar à sacola"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

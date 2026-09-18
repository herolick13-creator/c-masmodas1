import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import { Heart, Sparkles } from "lucide-react";

interface WishlistProps {
  onOpenCart: () => void;
}

export default function Wishlist({ onOpenCart }: WishlistProps) {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const reload = () => {
    const favIds = dataStore.getFavorites();
    const prods = dataStore.getProducts().filter((p) => favIds.includes(p.id));
    setFavoriteProducts(prods);
  };

  useEffect(() => {
    reload();
    const unsub = dataStore.subscribe(reload);
    return () => unsub();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#720018] uppercase tracking-widest flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-[#720018]" />
          <span>Meus Favoritos</span>
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Lista de Desejos C-MAS
        </h1>
        <p className="text-xs text-slate-500">
          Suas peças salvas para compor looks inesquecíveis.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-rose-100 text-center space-y-4 shadow-xs max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-[#720018] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-slate-800">
            Sua lista está vazia
          </h3>
          <p className="text-xs text-slate-500">
            Navegue por nossas coleções e clique no ícone de coração em qualquer peça para salvar aqui.
          </p>
          <Link
            to="/loja"
            className="inline-flex px-6 py-2.5 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0010] transition-colors shadow"
          >
            Explorar Loja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpenCart={onOpenCart} />
          ))}
        </div>
      )}
    </div>
  );
}

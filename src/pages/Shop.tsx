import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Check
} from "lucide-react";

interface ShopProps {
  onOpenCart: () => void;
}

export default function Shop({ onOpenCart }: ShopProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(dataStore.getProducts());
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // URL query state
  const currentCategory = searchParams.get("categoria") || "Todos";
  const currentSubCategory = searchParams.get("subcategoria") || "Todos";
  const currentQuery = searchParams.get("busca") || "";
  const isNovidades = searchParams.get("novidades") === "true";
  const isMaisVendidos = searchParams.get("maisVendidos") === "true";
  const isPromocoes = searchParams.get("promocoes") === "true";

  // Local filter states
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [sortBy, setSortBy] = useState<string>("relevancia");

  const reload = () => {
    setProducts(dataStore.getProducts());
  };

  useEffect(() => {
    reload();
    const unsub = dataStore.subscribe(reload);
    return () => unsub();
  }, []);

  const categories = ["Todos", "Feminino", "Masculino", "Unissex", "Teen", "Infantil", "Acessórios"];
  const subCategories = ["Todos", "Vestidos", "Alfaiataria", "Camisas", "Jaquetas", "Calças", "Conjuntos", "Acessórios"];
  const allSizes = ["PP", "P", "M", "G", "GG", "36", "38", "40", "42", "44", "46", "2", "4", "6", "8", "12", "14", "16"];
  const allColors = [
    { name: "Vinho", hex: "#720018" },
    { name: "Preto", hex: "#111111" },
    { name: "Cinza", hex: "#5E5E60" },
    { name: "Branco", hex: "#FFFFFF" },
    { name: "Off-White", hex: "#F5F3EF" },
    { name: "Bege", hex: "#D8C7B5" },
    { name: "Azul", hex: "#1C2D42" },
    { name: "Rosa", hex: "#E8B4B8" },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.active) return false;

      // Category match
      if (currentCategory !== "Todos" && p.category.toLowerCase() !== currentCategory.toLowerCase()) {
        return false;
      }

      // SubCategory match
      if (currentSubCategory !== "Todos" && p.subCategory.toLowerCase() !== currentSubCategory.toLowerCase()) {
        return false;
      }

      // Search Query
      if (currentQuery) {
        const q = currentQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSku = p.skuBase.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSku && !matchesCat) {
          return false;
        }
      }

      // Special tags
      if (isNovidades && !p.isNewArrival) return false;
      if (isMaisVendidos && !p.isBestSeller) return false;
      if (isPromocoes && !p.isOnSale) return false;

      // Price filter
      const effectivePrice = p.promoPrice || p.price;
      if (effectivePrice > maxPrice) return false;

      // Colors filter
      if (selectedColors.length > 0) {
        const hasColor = p.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Sizes filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      return true;
    });
  }, [products, currentCategory, currentSubCategory, currentQuery, isNovidades, isMaisVendidos, isPromocoes, maxPrice, selectedColors, selectedSizes]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "menor-preco") {
      list.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
    } else if (sortBy === "maior-preco") {
      list.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
    } else if (sortBy === "novidades") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "avaliacoes") {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProducts, sortBy]);

  const handleCategoryClick = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === "Todos") {
      newParams.delete("categoria");
    } else {
      newParams.set("categoria", cat);
    }
    setSearchParams(newParams);
  };

  const handleSubCategoryClick = (sub: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (sub === "Todos") {
      newParams.delete("subcategoria");
    } else {
      newParams.set("subcategoria", sub);
    }
    setSearchParams(newParams);
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetAllFilters = () => {
    setSearchParams({});
    setSelectedColors([]);
    setSelectedSizes([]);
    setMaxPrice(600);
    setSortBy("relevancia");
  };

  const activeFiltersCount =
    (currentCategory !== "Todos" ? 1 : 0) +
    (currentSubCategory !== "Todos" ? 1 : 0) +
    (currentQuery ? 1 : 0) +
    (isNovidades ? 1 : 0) +
    (isMaisVendidos ? 1 : 0) +
    (isPromocoes ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (maxPrice < 600 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#4A0010] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-lg border border-[#C9A86A]/40">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-xs font-bold text-[#C9A86A] uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coleção Completa C-MAS Modas</span>
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
            {currentCategory !== "Todos" ? `Moda ${currentCategory}` : "Catálogo & Alta Costura"}
          </h1>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Descubra vestidos, alfaiataria, camisaria e acessórios exclusivos produzidos com cortes refinados e tecidos nobres.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6 shrink-0 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-brand-title text-sm font-bold text-slate-900 tracking-wide flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#720018]" />
              <span>Filtros</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#720018] hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Limpar
              </button>
            )}
          </div>

          {/* Categorias */}
          <div>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Categorias
            </p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    currentCategory === cat
                      ? "bg-rose-50 text-[#720018] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{cat}</span>
                  {currentCategory === cat && <Check className="w-3.5 h-3.5 text-[#720018]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategorias */}
          <div>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Tipo de Peça
            </p>
            <div className="space-y-1">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubCategoryClick(sub)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    currentSubCategory === sub
                      ? "bg-rose-50 text-[#720018] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{sub}</span>
                  {currentSubCategory === sub && <Check className="w-3.5 h-3.5 text-[#720018]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tamanhos */}
          <div>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Tamanhos
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
                      isSelected
                        ? "bg-[#720018] text-white border-[#720018]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cores */}
          <div>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Cores
            </p>
            <div className="grid grid-cols-2 gap-2">
              {allColors.map((c) => {
                const isSelected = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-xs text-left transition-all ${
                      isSelected
                        ? "border-[#720018] bg-rose-50/60 font-semibold text-[#720018]"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preço Máximo */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-900 mb-2">
              <span className="uppercase tracking-wider">Preço Máximo</span>
              <span className="text-[#720018]">Até R$ {maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#720018] cursor-pointer"
            />
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Bar: Results count, Active tags & Sorting */}
          <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#720018] font-bold text-xs border border-rose-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <span className="text-xs text-slate-600">
                Exibindo <strong>{sortedProducts.length}</strong> produtos
              </span>
            </div>

            {/* Sorting dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="text-xs text-slate-500 hidden sm:inline">
                Ordenar por:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-[#F8F5F3] border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#720018]"
              >
                <option value="relevancia">Relevância / Destaques</option>
                <option value="novidades">Lançamentos Recentes</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
                <option value="avaliacoes">Mais Bem Avaliados</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {currentCategory !== "Todos" && (
                <span className="inline-flex items-center gap-1 text-xs bg-rose-50 text-[#720018] px-3 py-1 rounded-full border border-rose-200">
                  Categoria: {currentCategory}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleCategoryClick("Todos")} />
                </span>
              )}
              {currentSubCategory !== "Todos" && (
                <span className="inline-flex items-center gap-1 text-xs bg-rose-50 text-[#720018] px-3 py-1 rounded-full border border-rose-200">
                  Tipo: {currentSubCategory}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleSubCategoryClick("Todos")} />
                </span>
              )}
              {currentQuery && (
                <span className="inline-flex items-center gap-1 text-xs bg-rose-50 text-[#720018] px-3 py-1 rounded-full border border-rose-200">
                  Busca: "{currentQuery}"
                  <X
                    className="w-3.5 h-3.5 cursor-pointer"
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.delete("busca");
                      setSearchParams(newParams);
                    }}
                  />
                </span>
              )}
              {selectedColors.map((color) => (
                <span key={color} className="inline-flex items-center gap-1 text-xs bg-rose-50 text-[#720018] px-3 py-1 rounded-full border border-rose-200">
                  Cor: {color}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => toggleColor(color)} />
                </span>
              ))}
              {selectedSizes.map((size) => (
                <span key={size} className="inline-flex items-center gap-1 text-xs bg-rose-50 text-[#720018] px-3 py-1 rounded-full border border-rose-200">
                  Tam: {size}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => toggleSize(size)} />
                </span>
              ))}
              <button
                onClick={resetAllFilters}
                className="text-xs text-slate-500 hover:text-[#720018] underline ml-2"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-rose-100 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#720018] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-slate-800">
                Nenhum produto encontrado
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Não encontramos produtos correspondentes aos filtros selecionados. Experimente ajustar ou limpar os filtros.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#720018] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0010] transition-colors cursor-pointer"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenCart={onOpenCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-6 space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-brand-title font-bold text-sm text-slate-900">Filtrar Produtos</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Categorias</p>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleCategoryClick(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                      currentCategory === cat ? "bg-[#720018] text-white font-bold" : "text-slate-700 bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sizes */}
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Tamanhos</p>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 text-xs rounded-lg border ${
                      selectedSizes.includes(size)
                        ? "bg-[#720018] text-white border-[#720018]"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

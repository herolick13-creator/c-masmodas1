import {
  Product,
  Category,
  User,
  Order,
  InventoryMovement,
  Coupon,
  SupportTicket,
  AuditLog,
  StoreSettings,
  CartItem,
  Address,
  ProductReview,
  UserRole,
  OrderStatus,
  PaymentMethod,
  DeliveryType
} from "@/types";

const STORAGE_KEYS = {
  PRODUCTS: "cmas_products_v2",
  CATEGORIES: "cmas_categories_v2",
  USERS: "cmas_users_v1",
  CURRENT_USER: "cmas_current_user_v1",
  ORDERS: "cmas_orders_v1",
  CART: "cmas_cart_v1",
  FAVORITES: "cmas_favorites_v1",
  COUPONS: "cmas_coupons_v1",
  INVENTORY_LOGS: "cmas_inventory_logs_v1",
  AUDIT_LOGS: "cmas_audit_logs_v1",
  TICKETS: "cmas_tickets_v1",
  SETTINGS: "cmas_settings_v2",
  REVIEWS: "cmas_reviews_v1",
  ADDRESSES: "cmas_addresses_v1",
  CURTAIN_SEEN: "cmas_curtain_seen_v1",
};

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "C-MAS Modas",
  tagline: "Elegância que combina com você.",
  phone: "(67) 99619-4762",
  whatsapp: "5567996194762",
  email: "c.mas.modas@gmail.com",
  address: "Av. Afonso Pena, 3450 - Centro",
  city: "Campo Grande",
  state: "MS",
  postalCode: "79002-072",
  openingHours: "Segunda a Sábado das 09h às 19h",
  deliveryFee: 15.0,
  freeShippingThreshold: 250.0,
  deliveryAreaNote: "Entregas expressas em todos os bairros de Campo Grande - MS",
  announcementText: "✨ 25% DE CASH BACK com o cupom CASHBACK25 • Frete Grátis acima de R$ 250 • Retirada na Loja física no Centro de Campo Grande",
  heroHeadline: "Elegância que combina com você.",
  heroSubheadline: "Descubra a nova coleção exclusiva da C-MAS Modas. Peças selecionadas com alfaiataria impecável, tecidos nobres e sofisticação atemporal.",
  heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
  enableOnlineSales: true,
  enablePhysicalStorePickup: true,
  pixKey: "c.mas.modas@gmail.com",
  pixKeyType: "E-mail",
  pixBeneficiary: "C-MAS MODAS LTDA - CNPJ 42.890.123/0001-45",
  instagram: "@cmasmodas",
  facebook: "cmasmodasoficial",
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-fem",
    name: "Feminino",
    slug: "feminino",
    description: "Vestidos de gala, alfaiataria, blusas de seda e conjuntos de alta costura.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    itemCount: 18,
    active: true,
    featured: true,
  },
  {
    id: "cat-masc",
    name: "Masculino",
    slug: "masculino",
    description: "Camisaria nobre, blazers de linho, calças de alfaiataria e pólos elegantes.",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
    itemCount: 14,
    active: true,
    featured: true,
  },
  {
    id: "cat-unisex",
    name: "Unissex",
    slug: "unissex",
    description: "Peças atemporais, cardigãs de tricot, trench coats e cortes neutros.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
    itemCount: 8,
    active: true,
    featured: true,
  },
  {
    id: "cat-teen",
    name: "Teen",
    slug: "teen",
    description: "Moda jovem sofisticada, tendências contemporâneas e estilo autêntico.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    itemCount: 10,
    active: true,
    featured: true,
  },
  {
    id: "cat-infantil",
    name: "Infantil",
    slug: "infantil",
    description: "Linha infantil nobre com tecidos macios, confortáveis e cheios de charme.",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop",
    itemCount: 8,
    active: true,
    featured: true,
  },
  {
    id: "cat-vestidos",
    name: "Vestidos",
    slug: "vestidos",
    description: "Vestidos midi, longos fluidos e modelos estruturados para ocasiões especiais.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    itemCount: 12,
    active: true,
    featured: false,
  },
  {
    id: "cat-alfaiataria",
    name: "Alfaiataria & Blazers",
    slug: "alfaiataria",
    description: "Cortes precisos, forro acetinado e estruturação impecável.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    itemCount: 9,
    active: true,
    featured: false,
  },
  {
    id: "cat-acessorios",
    name: "Acessórios",
    slug: "acessorios",
    description: "Cintos em couro legítimo, echarpes de seda, lenços e bolsas refinadas.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
    itemCount: 6,
    active: true,
    featured: false,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-camisa-dourada-royale-500",
    name: "Camisa Blusa Dourada Metalizada Royale Alta Costura - Edição Limitada",
    slug: "camisa-blusa-dourada-metalizada-royale-edicao-limitada-500",
    skuBase: "CM-LUX-GOLD-500",
    description: "Obra-prima de alta costura C-MAS Royale inspirada no glamour e na opulência das passarelas internacionais. Confeccionada em tecido nobre com acabamento 'Liquid Gold' metalizado espelhado de alta resistência e caimento fluido impecável. Apresenta gola colarinho clássica perfeitamente estruturada, abotoamento frontal com botões finamente banhados a ouro, mangas longas anatômicas com punhos ajustáveis e costuras invisíveis de alta precisão. Peça exclusiva avaliada internacionalmente em US$ 15.000,00 (corrigido e cotado em R$ 86.250,00 na cotação comercial oficial). Produção global estritamente limitada a apenas 500 unidades numeradas mundiais acompanhadas de Certificado de Autenticidade C-MAS Haute Couture.",
    shortDescription: "Edição Limitada de 500 unidades numeradas. Acabamento metalizado espelhado ouro, botões banhados a ouro. Valor internacional: US$ 15.000 (R$ 86.250,00).",
    details: [
      "Acabamento tecnológico Liquid Gold com reflexo espelhado dourado permanente",
      "Valor internacional de US$ 15.000,00 corrigido para R$ 86.250,00",
      "Tiragem mundial estritamente limitada a apenas 500 unidades com número de série gravado",
      "Gola colarinho turn-down perfeitamente alinhada e estruturada",
      "Abotoamento frontal e punhos com botões com banho de ouro 18k",
      "Mangas longas sob medida com caimento fluido refinado",
      "Acompanha Certificado de Autenticidade e Embalagem Caixa Rígida Aveludada C-MAS Royale"
    ],
    fabric: "Tecido Nobre Tecnológico Liquid Gold Acetinado com Fios Metálicos Ouro e Forro em Seda Pura Italiana",
    price: 86250.00,
    category: "Unissex",
    subCategory: "Blusas & Camisas",
    images: [
      "/images/gold_metallic_shirt.jpg",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Dourado Metalizado Royale", hex: "#D4AF37" }
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    variants: [
      { id: "v-gold-pp", sku: "CM-GOLD-500-PP", colorName: "Dourado Metalizado Royale", colorHex: "#D4AF37", size: "PP", stock: 50 },
      { id: "v-gold-p", sku: "CM-GOLD-500-P", colorName: "Dourado Metalizado Royale", colorHex: "#D4AF37", size: "P", stock: 125 },
      { id: "v-gold-m", sku: "CM-GOLD-500-M", colorName: "Dourado Metalizado Royale", colorHex: "#D4AF37", size: "M", stock: 150 },
      { id: "v-gold-g", sku: "CM-GOLD-500-G", colorName: "Dourado Metalizado Royale", colorHex: "#D4AF37", size: "G", stock: 125 },
      { id: "v-gold-gg", sku: "CM-GOLD-500-GG", colorName: "Dourado Metalizado Royale", colorHex: "#D4AF37", size: "GG", stock: 50 }
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: false,
    rating: 5.0,
    reviewCount: 32,
    createdAt: "2026-09-04T10:50:00Z",
    active: true
  },
  {
    id: "prod-st-bomber",
    name: "Jaqueta Bomber Streetwear em Couro Ecológico All-Black",
    slug: "jaqueta-bomber-streetwear-couro-ecologico-all-black",
    skuBase: "CM-BOM-101",
    description: "Inspirada no visual minimalista e na atitude urbana contemporânea da foto. Confeccionada em couro ecológico nobre com acabamento fosco suave, gola clássica estruturada, fechamento frontal por zíper reforçado, punhos e barra com elástico estruturado e forro térmico acetinado. A peça-chave para compor o autêntico look All-Black com presença e sofisticação.",
    shortDescription: "Couro ecológico nobre fosco com gola clássica, zíper metálico e forro acetinado.",
    details: [
      "Couro sintético PU nobre de alta durabilidade e toque macio",
      "Modelagem bomber relaxada com ombros no lugar",
      "Gola colarinho estruturada e punhos elásticos anatômicos",
      "Zíper frontal metálico resistente com puxador personalizado",
      "Bolsos laterais embutidos e forro interno respirável"
    ],
    fabric: "100% Poliuretano Nobre (Exterior), Forro 100% Poliéster Acetinado",
    price: 379.90,
    promoPrice: 329.90,
    category: "Masculino",
    subCategory: "Jaquetas",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Preto Noite", hex: "#111111" },
      { name: "Marrom Café", hex: "#2A1810" }
    ],
    sizes: ["P", "M", "G", "GG"],
    variants: [
      { id: "v101-1", sku: "CM-BOM-101-PRT-P", colorName: "Preto Noite", colorHex: "#111111", size: "P", stock: 8 },
      { id: "v101-2", sku: "CM-BOM-101-PRT-M", colorName: "Preto Noite", colorHex: "#111111", size: "M", stock: 12 },
      { id: "v101-3", sku: "CM-BOM-101-PRT-G", colorName: "Preto Noite", colorHex: "#111111", size: "G", stock: 9 },
      { id: "v101-4", sku: "CM-BOM-101-PRT-GG", colorName: "Preto Noite", colorHex: "#111111", size: "GG", stock: 5 },
      { id: "v101-5", sku: "CM-BOM-101-MAR-M", colorName: "Marrom Café", colorHex: "#2A1810", size: "M", stock: 4 },
      { id: "v101-6", sku: "CM-BOM-101-MAR-G", colorName: "Marrom Café", colorHex: "#2A1810", size: "G", stock: 3 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 38,
    createdAt: "2026-08-28T10:00:00Z",
    active: true
  },
  {
    id: "prod-st-baggy",
    name: "Calça Baggy Trousers Streetwear Preta",
    slug: "calca-baggy-trousers-streetwear-preta",
    skuBase: "CM-CAL-102",
    description: "Corte baggy contemporâneo que combina a alfaiataria urbana ao conforto do streetwear, exatamente como no look de referência. Confeccionada em sarja pesada de algodão com toque encorpado, cós com passantes para cinto médio/largo, pregas frontais sutis e caimento amplo reto que cai perfeitamente sobre tênis e sapatos.",
    shortDescription: "Sarja nobre pesada 100% algodão com modelagem baggy e caimento reto amplo.",
    details: [
      "Sarja 100% algodão encorpado de alta densidade",
      "Modelagem baggy com pernas amplas e caimento reto",
      "Cós estruturado com passantes reforçados e botão metálico",
      "Bolsos frontais faca profundos e bolsos traseiros embutidos",
      "Barra desconstruída com acabamento reforçado"
    ],
    fabric: "100% Algodão Sarjado Penteado",
    price: 249.90,
    promoPrice: 219.90,
    category: "Masculino",
    subCategory: "Calças",
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Preto Absoluto", hex: "#111111" },
      { name: "Grafite Escuro", hex: "#2D2D2D" }
    ],
    sizes: ["38", "40", "42", "44", "46"],
    variants: [
      { id: "v102-1", sku: "CM-CAL-102-PRT-38", colorName: "Preto Absoluto", colorHex: "#111111", size: "38", stock: 7 },
      { id: "v102-2", sku: "CM-CAL-102-PRT-40", colorName: "Preto Absoluto", colorHex: "#111111", size: "40", stock: 10 },
      { id: "v102-3", sku: "CM-CAL-102-PRT-42", colorName: "Preto Absoluto", colorHex: "#111111", size: "42", stock: 8 },
      { id: "v102-4", sku: "CM-CAL-102-PRT-44", colorName: "Preto Absoluto", colorHex: "#111111", size: "44", stock: 6 },
      { id: "v102-5", sku: "CM-CAL-102-PRT-46", colorName: "Preto Absoluto", colorHex: "#111111", size: "46", stock: 4 },
      { id: "v102-6", sku: "CM-CAL-102-GRA-40", colorName: "Grafite Escuro", colorHex: "#2D2D2D", size: "40", stock: 5 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.9,
    reviewCount: 29,
    createdAt: "2026-08-28T09:30:00Z",
    active: true
  },
  {
    id: "prod-st-look-completo",
    name: "Look Completo All-Black Streetwear: Bomber + Baggy + Cinto",
    slug: "look-completo-all-black-streetwear-bomber-baggy",
    skuBase: "CM-LOOK-103",
    description: "Composição completa da foto: Jaqueta Bomber em Couro Ecológico Preto + Calça Baggy Trousers Streetwear + Cinto em Couro Legítimo com Fivela Prata. O look definitivo para quem busca elegância rebelde, conforto e estética monocromática impecável com desconto especial de conjunto.",
    shortDescription: "Conjunto completo com Jaqueta Bomber de Couro, Calça Baggy Preta e Cinto.",
    details: [
      "Inclui 1 Jaqueta Bomber Couro Ecológico Streetwear Preto",
      "Inclui 1 Calça Baggy Trousers em Sarja Encorpada Preta",
      "Inclui 1 Cinto em Couro Legítimo com Fivela Prateada Clássica",
      "Economize comprando o look completo",
      "Combina perfeitamente com camiseta preta interna e sapatos/coturnos"
    ],
    fabric: "Couro Ecológico PU, Sarja 100% Algodão, Couro Legítimo",
    price: 649.90,
    promoPrice: 529.90,
    category: "Masculino",
    subCategory: "Conjuntos",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Total All-Black", hex: "#111111" }
    ],
    sizes: ["P", "M", "G", "GG"],
    variants: [
      { id: "v103-1", sku: "CM-LOOK-103-PRT-P", colorName: "Total All-Black", colorHex: "#111111", size: "P", stock: 5 },
      { id: "v103-2", sku: "CM-LOOK-103-PRT-M", colorName: "Total All-Black", colorHex: "#111111", size: "M", stock: 8 },
      { id: "v103-3", sku: "CM-LOOK-103-PRT-G", colorName: "Total All-Black", colorHex: "#111111", size: "G", stock: 6 },
      { id: "v103-4", sku: "CM-LOOK-103-PRT-GG", colorName: "Total All-Black", colorHex: "#111111", size: "GG", stock: 3 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 46,
    createdAt: "2026-08-28T09:00:00Z",
    active: true
  },
  {
    id: "prod-y2k-camisa-gravata",
    name: "Camisa Social Oversized Popeline Branca com Gravata Listrada Vinho",
    slug: "camisa-social-oversized-popeline-gravata-listrada-vinho",
    skuBase: "CM-CAM-104",
    description: "Destaque da coleção jovem Y2K & Dark Academia conforme o look de referência. Camisa social confeccionada em popeline de algodão nobre 100%, com corte oversized descontraído, ombros caídos, colarinho clássico aberto, bolso frontal funcional e acompanha gravata slim listrada em tons de vinho bordô e marfim. Peça versátil que pode ser usada solta, semi-colocada por dentro da calça ou com mangas dobradas.",
    shortDescription: "Popeline 100% algodão com modelagem oversized e gravata listrada vinho inclusa.",
    details: [
      "100% Algodão Popeline Premium com toque macio e arejado",
      "Modelagem oversized fluida com ombros caídos modernos",
      "Acompanha gravata slim listrada nas cores vinho bordô e marfim",
      "Bolso frontal no peito e botões frontais em madrepérola sintética",
      "Estilo unissex atemporal para sobreposições contemporâneas"
    ],
    fabric: "100% Algodão Popeline Fio 60",
    price: 239.90,
    promoPrice: 199.90,
    category: "Unissex",
    subCategory: "Camisas",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Branco Neve (Gravata Vinho)", hex: "#FFFFFF" },
      { name: "Azul Bebê (Gravata Marinho)", hex: "#D6E4EE" },
      { name: "Preto Noite (Gravata Grafite)", hex: "#111111" }
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    variants: [
      { id: "v104-1", sku: "CM-CAM-104-BRA-PP", colorName: "Branco Neve (Gravata Vinho)", colorHex: "#FFFFFF", size: "PP", stock: 6 },
      { id: "v104-2", sku: "CM-CAM-104-BRA-P", colorName: "Branco Neve (Gravata Vinho)", colorHex: "#FFFFFF", size: "P", stock: 10 },
      { id: "v104-3", sku: "CM-CAM-104-BRA-M", colorName: "Branco Neve (Gravata Vinho)", colorHex: "#FFFFFF", size: "M", stock: 14 },
      { id: "v104-4", sku: "CM-CAM-104-BRA-G", colorName: "Branco Neve (Gravata Vinho)", colorHex: "#FFFFFF", size: "G", stock: 8 },
      { id: "v104-5", sku: "CM-CAM-104-BRA-GG", colorName: "Branco Neve (Gravata Vinho)", colorHex: "#FFFFFF", size: "GG", stock: 5 },
      { id: "v104-6", sku: "CM-CAM-104-AZU-M", colorName: "Azul Bebê (Gravata Marinho)", colorHex: "#D6E4EE", size: "M", stock: 7 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 33,
    createdAt: "2026-08-28T08:30:00Z",
    active: true
  },
  {
    id: "prod-y2k-jeans-cinza",
    name: "Calça Jeans Baggy Lavagem Vintage Cinza Estonada",
    slug: "calca-jeans-baggy-lavagem-vintage-cinza-estonada",
    skuBase: "CM-JNS-105",
    description: "O jeans streetwear definitivo da referência. Confeccionada em denim 100% algodão de alta gramatura com lavagem vintage acid-wash em tons de cinza grafite estonado. Modelagem ultra baggy com pernas amplas e caimento reto e folgado que cobre o calçado, cós com passantes reforçados para mosquetões e chaveiros e 5 bolsos clássicos.",
    shortDescription: "Denim pesado 100% algodão com lavagem vintage estonada e modelagem ultra baggy.",
    details: [
      "100% Algodão Denim Pesado (13.5 oz)",
      "Processo de lavagem artesanal com efeito estonado e degradê único",
      "Modelagem baggy ampla de cintura média e pernas largas",
      "Fechamento com zíper metálico e botão envelhecido exclusivo",
      "Costuras duplas reforçadas e rebites antioxidantes"
    ],
    fabric: "100% Algodão Denim Puro",
    price: 279.90,
    promoPrice: 239.90,
    category: "Unissex",
    subCategory: "Calças",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Cinza Estonado Vintage", hex: "#5E5E60" },
      { name: "Azul Faded Acid", hex: "#6E87A2" },
      { name: "Preto Lavado", hex: "#2B2B2B" }
    ],
    sizes: ["36", "38", "40", "42", "44", "46"],
    variants: [
      { id: "v105-1", sku: "CM-JNS-105-CIN-36", colorName: "Cinza Estonado Vintage", colorHex: "#5E5E60", size: "36", stock: 6 },
      { id: "v105-2", sku: "CM-JNS-105-CIN-38", colorName: "Cinza Estonado Vintage", colorHex: "#5E5E60", size: "38", stock: 11 },
      { id: "v105-3", sku: "CM-JNS-105-CIN-40", colorName: "Cinza Estonado Vintage", colorHex: "#5E5E60", size: "40", stock: 15 },
      { id: "v105-4", sku: "CM-JNS-105-CIN-42", colorName: "Cinza Estonado Vintage", colorHex: "#5E5E60", size: "42", stock: 9 },
      { id: "v105-5", sku: "CM-JNS-105-CIN-44", colorName: "Cinza Estonado Vintage", colorHex: "#5E5E60", size: "44", stock: 7 },
      { id: "v105-6", sku: "CM-JNS-105-CIN-46", colorName: "Cinza Estonado Vintage", colorHex: "#5E5E60", size: "46", stock: 4 },
      { id: "v105-7", sku: "CM-JNS-105-AZU-40", colorName: "Azul Faded Acid", colorHex: "#6E87A2", size: "40", stock: 8 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.9,
    reviewCount: 41,
    createdAt: "2026-08-28T08:00:00Z",
    active: true
  },
  {
    id: "prod-y2k-look-completo",
    name: "Look Completo Y2K Grunge Prep: Camisa Oversized + Gravata + Jeans Baggy",
    slug: "look-completo-y2k-grunge-prep-camisa-gravata-jeans-baggy",
    skuBase: "CM-LOOK-106",
    description: "A composição completa da referência: Camisa Oversized Popeline Branca 100% Algodão + Gravata Slim Listrada Vinho Bordô + Calça Jeans Baggy Lavagem Vintage Cinza Estonada. O visual que conquistou as capitais da moda, unindo o formal desconstruído ao caimento solto e despojado com desconto exclusivo.",
    shortDescription: "Look completo com Camisa Popeline, Gravata Listrada Vinho e Jeans Baggy Estonado.",
    details: [
      "Inclui 1 Camisa Social Oversized Popeline Branca 100% Algodão",
      "Inclui 1 Gravata Slim Listrada Vinho Bordô e Marfim",
      "Inclui 1 Calça Jeans Baggy Lavagem Vintage Cinza Estonada",
      "Kit com desconto especial de conjunto C-MAS Modas",
      "Ideal para usar com tênis chunky brancos e ecobag preta"
    ],
    fabric: "100% Algodão Popeline, Jacquard de Seda (Gravata), Denim 100% Algodão",
    price: 499.90,
    promoPrice: 419.90,
    category: "Teen",
    subCategory: "Conjuntos",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Look Oficial (Branco + Vinho + Cinza)", hex: "#5E5E60" }
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    variants: [
      { id: "v106-1", sku: "CM-LOOK-106-OFF-PP", colorName: "Look Oficial (Branco + Vinho + Cinza)", colorHex: "#5E5E60", size: "PP", stock: 4 },
      { id: "v106-2", sku: "CM-LOOK-106-OFF-P", colorName: "Look Oficial (Branco + Vinho + Cinza)", colorHex: "#5E5E60", size: "P", stock: 8 },
      { id: "v106-3", sku: "CM-LOOK-106-OFF-M", colorName: "Look Oficial (Branco + Vinho + Cinza)", colorHex: "#5E5E60", size: "M", stock: 12 },
      { id: "v106-4", sku: "CM-LOOK-106-OFF-G", colorName: "Look Oficial (Branco + Vinho + Cinza)", colorHex: "#5E5E60", size: "G", stock: 7 },
      { id: "v106-5", sku: "CM-LOOK-106-OFF-GG", colorName: "Look Oficial (Branco + Vinho + Cinza)", colorHex: "#5E5E60", size: "GG", stock: 4 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 52,
    createdAt: "2026-08-28T07:30:00Z",
    active: true
  },
  {
    id: "prod-1",
    name: "Vestido Midi Alfaiataria Vinho Imperial",
    slug: "vestido-midi-alfaiataria-vinho-imperial",
    skuBase: "CM-VES-001",
    description: "Um ícone da elegância C-MAS Modas. Confeccionado em crepe de alfaiataria encorpado, com decote sutil em V, fenda lateral refinada e cinto com fivela dourada exclusiva. Caimento perfeito que valoriza a silhueta com extremo conforto e distinção.",
    shortDescription: "Crepe nobre estruturado com cinto e acabamento em aviamentos dourados.",
    details: [
      "Tecido crepe de alta densidade com toque acetinado",
      "Modelagem evasê com comprimento midi clássico",
      "Forro interno 100% poliéster antialérgico",
      "Fechamento traseiro por zíper invisível YKK",
      "Fabricado no Brasil com padrão de alta costura"
    ],
    fabric: "96% Poliéster nobre, 4% Elastano",
    price: 389.90,
    promoPrice: 329.90,
    category: "Feminino",
    subCategory: "Vestidos",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Vinho C-MAS", hex: "#720018" },
      { name: "Preto Noite", hex: "#1A1A1A" },
      { name: "Off-White Pérola", hex: "#F5F3EF" }
    ],
    sizes: ["P", "M", "G", "GG"],
    variants: [
      { id: "v1-1", sku: "CM-VES-001-VIN-P", colorName: "Vinho C-MAS", colorHex: "#720018", size: "P", stock: 6 },
      { id: "v1-2", sku: "CM-VES-001-VIN-M", colorName: "Vinho C-MAS", colorHex: "#720018", size: "M", stock: 8 },
      { id: "v1-3", sku: "CM-VES-001-VIN-G", colorName: "Vinho C-MAS", colorHex: "#720018", size: "G", stock: 4 },
      { id: "v1-4", sku: "CM-VES-001-VIN-GG", colorName: "Vinho C-MAS", colorHex: "#720018", size: "GG", stock: 2 },
      { id: "v1-5", sku: "CM-VES-001-PRT-P", colorName: "Preto Noite", colorHex: "#1A1A1A", size: "P", stock: 5 },
      { id: "v1-6", sku: "CM-VES-001-PRT-M", colorName: "Preto Noite", colorHex: "#1A1A1A", size: "M", stock: 7 },
      { id: "v1-7", sku: "CM-VES-001-PRT-G", colorName: "Preto Noite", colorHex: "#1A1A1A", size: "G", stock: 3 },
      { id: "v1-8", sku: "CM-VES-001-OFF-M", colorName: "Off-White Pérola", colorHex: "#F5F3EF", size: "M", stock: 4 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.9,
    reviewCount: 28,
    createdAt: "2026-08-15T10:00:00Z",
    active: true
  },
  {
    id: "prod-2",
    name: "Camisa Social Slim em Algodão Egípcio",
    slug: "camisa-social-slim-algodao-egipcio",
    skuBase: "CM-CAM-002",
    description: "A essência do homem elegante. Camisa social masculina confeccionada em fio 80 de algodão egípcio puro, com toque suave, respirabilidade excepcional e colarinho italiano estruturado. Ideal tanto para eventos formais quanto para um visual casual chic.",
    shortDescription: "Algodão Egípcio Fio 80 com colarinho estruturado e botões perolados.",
    details: [
      "100% Algodão Egípcio acetinado",
      "Modelagem Slim Fit anatômica",
      "Botões com acabamento perolizado gravados",
      "Costuras francesas reforçadas",
      "Excelente caimento e fácil de passar"
    ],
    fabric: "100% Algodão Egípcio Penteado",
    price: 279.90,
    promoPrice: undefined,
    category: "Masculino",
    subCategory: "Camisas",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Branco Clássico", hex: "#FFFFFF" },
      { name: "Vinho Tinto", hex: "#720018" },
      { name: "Azul Marinho Real", hex: "#1C2D42" }
    ],
    sizes: ["P", "M", "G", "GG"],
    variants: [
      { id: "v2-1", sku: "CM-CAM-002-BRA-P", colorName: "Branco Clássico", colorHex: "#FFFFFF", size: "P", stock: 8 },
      { id: "v2-2", sku: "CM-CAM-002-BRA-M", colorName: "Branco Clássico", colorHex: "#FFFFFF", size: "M", stock: 12 },
      { id: "v2-3", sku: "CM-CAM-002-BRA-G", colorName: "Branco Clássico", colorHex: "#FFFFFF", size: "G", stock: 6 },
      { id: "v2-4", sku: "CM-CAM-002-VIN-M", colorName: "Vinho Tinto", colorHex: "#720018", size: "M", stock: 5 },
      { id: "v2-5", sku: "CM-CAM-002-VIN-G", colorName: "Vinho Tinto", colorHex: "#720018", size: "G", stock: 4 },
      { id: "v2-6", sku: "CM-CAM-002-AZU-M", colorName: "Azul Marinho Real", colorHex: "#1C2D42", size: "M", stock: 7 },
    ],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.8,
    reviewCount: 34,
    createdAt: "2026-08-10T12:00:00Z",
    active: true
  },
  {
    id: "prod-3",
    name: "Blazer Estruturado Tailoring Vinho Nobre",
    slug: "blazer-estruturado-tailoring-vinho-nobre",
    skuBase: "CM-BLZ-003",
    description: "Peça assinatura da boutique C-MAS Modas. Blazer com lapela notched clássica, ombreiras suaves para postura imponente, forro em cetim de seda e botões forrados. Ideal para composições de poder e sofisticação.",
    shortDescription: "Alfaiataria impecável com forro em cetim e botões forrados artesanalmente.",
    details: [
      "Alfaiataria premium com forro acetinado personalizado",
      "Lapela clássica e bolsos embutidos com lapela",
      "Modelagem acinturada que realça o visual",
      "Ideal para composições do dia à noite"
    ],
    fabric: "92% Poliéster, 8% Viscose Nobre",
    price: 499.00,
    promoPrice: 429.00,
    category: "Feminino",
    subCategory: "Alfaiataria",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Vinho Borgonha", hex: "#4A0010" },
      { name: "Preto Absoluto", hex: "#111111" },
      { name: "Bege Areia", hex: "#D8C7B5" }
    ],
    sizes: ["PP", "P", "M", "G"],
    variants: [
      { id: "v3-1", sku: "CM-BLZ-003-VIN-P", colorName: "Vinho Borgonha", colorHex: "#4A0010", size: "P", stock: 3 },
      { id: "v3-2", sku: "CM-BLZ-003-VIN-M", colorName: "Vinho Borgonha", colorHex: "#4A0010", size: "M", stock: 5 },
      { id: "v3-3", sku: "CM-BLZ-003-VIN-G", colorName: "Vinho Borgonha", colorHex: "#4A0010", size: "G", stock: 2 },
      { id: "v3-4", sku: "CM-BLZ-003-PRT-M", colorName: "Preto Absoluto", colorHex: "#111111", size: "M", stock: 6 },
    ],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 19,
    createdAt: "2026-08-20T14:30:00Z",
    active: true
  },
  {
    id: "prod-4",
    name: "Conjunto Moletinho Premium Unissex Essential",
    slug: "conjunto-moletinho-premium-unissex-essential",
    skuBase: "CM-CNJ-004",
    description: "O equilíbrio sublime entre conforto aconchegante e estética contemporânea. Blusão com capuz anatômico e calça jogger com cordão em ponteira metálica dourada. Tecido encorpado que não amassa e não forma bolinhas.",
    shortDescription: "Algodão com elastano ultra macio e acabamentos metálicos.",
    details: [
      "Algodão sustentável com toque aveludado interno",
      "Ponteiras metálicas com banho dourado antioxidante",
      "Bolsos laterais profundos e funcionais",
      "Unissex - caimento perfeito para todos os públicos"
    ],
    fabric: "88% Algodão, 12% Poliéster Premium",
    price: 349.90,
    promoPrice: 299.90,
    category: "Unissex",
    subCategory: "Conjuntos",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Terracota Vinho", hex: "#720018" },
      { name: "Cinza Mescla Chumbo", hex: "#4A4A4A" },
      { name: "Off-White", hex: "#F5F3EF" }
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    variants: [
      { id: "v4-1", sku: "CM-CNJ-004-TER-P", colorName: "Terracota Vinho", colorHex: "#720018", size: "P", stock: 7 },
      { id: "v4-2", sku: "CM-CNJ-004-TER-M", colorName: "Terracota Vinho", colorHex: "#720018", size: "M", stock: 9 },
      { id: "v4-3", sku: "CM-CNJ-004-TER-G", colorName: "Terracota Vinho", colorHex: "#720018", size: "G", stock: 4 },
      { id: "v4-4", sku: "CM-CNJ-004-CIN-M", colorName: "Cinza Mescla Chumbo", colorHex: "#4A4A4A", size: "M", stock: 5 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.9,
    reviewCount: 42,
    createdAt: "2026-08-18T08:00:00Z",
    active: true
  },
  {
    id: "prod-5",
    name: "Vestido Juvenil Teen Romântico em Tule Bordado",
    slug: "vestido-juvenil-teen-romantico-tule-bordado",
    skuBase: "CM-TEEN-005",
    description: "Delicadeza e charme para momentos marcantes. Vestido juvenil com saia em tule suavemente armada, busto em bordado floral delicado e forro em algodão 100% confortável para a pele jovem.",
    shortDescription: "Tule bordado com forro macio e laço delicado na cintura.",
    details: [
      "Bordados florais exclusivos",
      "Forro 100% algodão respirável",
      "Fecho em zíper traseiro embutido",
      "Ideal para festas, formaturas e celebrações"
    ],
    fabric: "Tule 100% Poliamida, Forro 100% Algodão",
    price: 249.90,
    promoPrice: undefined,
    category: "Teen",
    subCategory: "Vestidos",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Rosa Chá Suave", hex: "#E8B4B8" },
      { name: "Branco Neve", hex: "#FFFFFF" },
      { name: "Vinho Marsala", hex: "#720018" }
    ],
    sizes: ["12", "14", "16", "PP"],
    variants: [
      { id: "v5-1", sku: "CM-TEEN-005-ROS-12", colorName: "Rosa Chá Suave", colorHex: "#E8B4B8", size: "12", stock: 4 },
      { id: "v5-2", sku: "CM-TEEN-005-ROS-14", colorName: "Rosa Chá Suave", colorHex: "#E8B4B8", size: "14", stock: 6 },
      { id: "v5-3", sku: "CM-TEEN-005-ROS-16", colorName: "Rosa Chá Suave", colorHex: "#E8B4B8", size: "16", stock: 5 },
      { id: "v5-4", sku: "CM-TEEN-005-VIN-14", colorName: "Vinho Marsala", colorHex: "#720018", size: "14", stock: 3 },
    ],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    isOnSale: false,
    rating: 4.7,
    reviewCount: 15,
    createdAt: "2026-08-05T11:00:00Z",
    active: true
  },
  {
    id: "prod-6",
    name: "Conjunto Petit Infantil Linho Nobre e Algodão",
    slug: "conjunto-petit-infantil-linho-nobre",
    skuBase: "CM-INF-006",
    description: "Projetado com o máximo carinho para os pequenos. Camisa bata em linho misto com bermudinha com elástico regulável na cintura e suspensório opcional removível. Conforto térmico e elegância impecável.",
    shortDescription: "Linho misto respirável com bermuda de cós ajustável.",
    details: [
      "Linho misto pré-encolhido macio",
      "Cintura ajustável interna",
      "Não pinica e não esquenta",
      "Ideal para batizados, aniversários e fotos de família"
    ],
    fabric: "55% Linho, 45% Algodão Puro",
    price: 199.90,
    promoPrice: 169.90,
    category: "Infantil",
    subCategory: "Conjuntos",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503944546555-5f60665f80d7?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Bege Areia Natural", hex: "#E2D7C8" },
      { name: "Branco Alabastro", hex: "#FFFFFF" },
      { name: "Vinho Tinto", hex: "#720018" }
    ],
    sizes: ["2", "4", "6", "8"],
    variants: [
      { id: "v6-1", sku: "CM-INF-006-BEG-2", colorName: "Bege Areia Natural", colorHex: "#E2D7C8", size: "2", stock: 5 },
      { id: "v6-2", sku: "CM-INF-006-BEG-4", colorName: "Bege Areia Natural", colorHex: "#E2D7C8", size: "4", stock: 6 },
      { id: "v6-3", sku: "CM-INF-006-BEG-6", colorName: "Bege Areia Natural", colorHex: "#E2D7C8", size: "6", stock: 4 },
      { id: "v6-4", sku: "CM-INF-006-VIN-4", colorName: "Vinho Tinto", colorHex: "#720018", size: "4", stock: 3 },
    ],
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: true,
    isOnSale: true,
    rating: 4.9,
    reviewCount: 22,
    createdAt: "2026-08-01T15:00:00Z",
    active: true
  },
  {
    id: "prod-7",
    name: "Calça Pantalona em Alfaiataria Fluida",
    slug: "calca-pantalona-alfaiataria-fluida",
    skuBase: "CM-CAL-007",
    description: "A clássica pantalona de cintura alta com cós anatômico e pregas frontais impecáveis. Caimento alongado e fluido que traz imponência e elegância instantânea para qualquer ocasião.",
    shortDescription: "Cintura alta com pregas sofisticadas e caimento impecável.",
    details: [
      "Crepe alfaiataria com elastano",
      "Passantes para cinto largo",
      "Bolsos faca laterais",
      "Bainha generosa para ajuste personalizado de salto"
    ],
    fabric: "95% Poliéster, 5% Elastano",
    price: 289.90,
    promoPrice: undefined,
    category: "Feminino",
    subCategory: "Calças",
    images: [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Vinho Borgonha", hex: "#4A0010" },
      { name: "Off-White", hex: "#F5F3EF" },
      { name: "Preto", hex: "#111111" }
    ],
    sizes: ["36", "38", "40", "42", "44"],
    variants: [
      { id: "v7-1", sku: "CM-CAL-007-VIN-38", colorName: "Vinho Borgonha", colorHex: "#4A0010", size: "38", stock: 6 },
      { id: "v7-2", sku: "CM-CAL-007-VIN-40", colorName: "Vinho Borgonha", colorHex: "#4A0010", size: "40", stock: 8 },
      { id: "v7-3", sku: "CM-CAL-007-OFF-38", colorName: "Off-White", colorHex: "#F5F3EF", size: "38", stock: 5 },
      { id: "v7-4", sku: "CM-CAL-007-PRT-40", colorName: "Preto", colorHex: "#111111", size: "40", stock: 7 },
    ],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.8,
    reviewCount: 31,
    createdAt: "2026-08-12T10:00:00Z",
    active: true
  },
  {
    id: "prod-8",
    name: "Cinto em Couro Legítimo com Fivela Monograma CM",
    slug: "cinto-couro-legitimo-monograma-cm",
    skuBase: "CM-ACC-008",
    description: "Acessório indispensável com acabamento manual. Couro legítimo de flor integral com fivela polida em banho ouro envelhecido com o monograma C-MAS Modas. Acompanha saquinho em veludo protetor.",
    shortDescription: "Couro nobre legítimo com fivela dourada exclusiva CM.",
    details: [
      "100% Couro Bovino legítimo de alta durabilidade",
      "Fivela em liga metálica nobre com banho dourado antioxidante",
      "Largura clássica de 3,5 cm",
      "Fabricação artesanal em Campo Grande"
    ],
    fabric: "100% Couro Legítimo",
    price: 189.90,
    promoPrice: 149.90,
    category: "Acessórios",
    subCategory: "Acessórios",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Vinho Escuro Nobre", hex: "#4A0010" },
      { name: "Caramelo Dourado", hex: "#8C5428" },
      { name: "Preto Clássico", hex: "#111111" }
    ],
    sizes: ["P (85cm)", "M (95cm)", "G (105cm)"],
    variants: [
      { id: "v8-1", sku: "CM-ACC-008-VIN-M", colorName: "Vinho Escuro Nobre", colorHex: "#4A0010", size: "M (95cm)", stock: 12 },
      { id: "v8-2", sku: "CM-ACC-008-VIN-G", colorName: "Vinho Escuro Nobre", colorHex: "#4A0010", size: "G (105cm)", stock: 8 },
      { id: "v8-3", sku: "CM-ACC-008-CAR-M", colorName: "Caramelo Dourado", colorHex: "#8C5428", size: "M (95cm)", stock: 6 },
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 47,
    createdAt: "2026-08-22T09:00:00Z",
    active: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: "usr-adm-hero",
    name: "Administrador (Hero)",
    email: "herolick13@gmail.com",
    password: "adm123",
    cpf: "001.002.003-04",
    phone: "(67) 99619-4762",
    role: "ADMINISTRADOR",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "usr-adm-natali",
    name: "Administradora (Natali Priscila)",
    email: "natalipriscila09@gmail.com",
    password: "adm123",
    cpf: "005.006.007-08",
    phone: "(67) 99619-4762",
    role: "ADMINISTRADOR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "usr-admin-1",
    name: "Helena Carvalho (Admin)",
    email: "admin@cmasmodas.com.br",
    password: "adm123",
    cpf: "111.222.333-44",
    phone: "(67) 99619-4762",
    role: "ADMINISTRADOR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "usr-gerente-1",
    name: "Rodrigo Mendonça (Gerente)",
    email: "gerente@cmasmodas.com.br",
    password: "123",
    cpf: "222.333.444-55",
    phone: "(67) 99619-4762",
    role: "GERENTE",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-01-15T00:00:00Z"
  },
  {
    id: "usr-vendedor-1",
    name: "Camila Barros (Vendedora Loja Física)",
    email: "vendedor@cmasmodas.com.br",
    password: "123",
    cpf: "333.444.555-66",
    phone: "(67) 99619-4762",
    role: "VENDEDOR",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-02-01T00:00:00Z"
  },
  {
    id: "usr-vendedor-2",
    name: "Lucas Sales (Vendedor Loja Física)",
    email: "lucas.vendedor@cmasmodas.com.br",
    password: "123",
    cpf: "444.333.222-11",
    phone: "(67) 99812-4455",
    role: "VENDEDOR",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-02-10T00:00:00Z"
  },
  {
    id: "usr-vendedor-3",
    name: "Juliana Rocha (Consultora de Moda)",
    email: "juliana.rocha@cmasmodas.com.br",
    password: "123",
    cpf: "777.888.999-00",
    phone: "(67) 99123-7788",
    role: "VENDEDOR",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-03-01T00:00:00Z"
  },
  {
    id: "usr-vendedor-4",
    name: "Marcos Vinícius (Atendente Balcão)",
    email: "marcos.vinicius@cmasmodas.com.br",
    password: "123",
    cpf: "666.555.444-33",
    phone: "(67) 98455-1122",
    role: "VENDEDOR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-03-05T00:00:00Z"
  },
  {
    id: "usr-cliente-1",
    name: "Mariana Albuquerque",
    email: "cliente@exemplo.com.br",
    password: "123",
    cpf: "444.555.666-77",
    phone: "(67) 99234-5678",
    role: "CLIENTE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    emailVerified: true,
    createdAt: "2026-03-10T14:20:00Z"
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-cb25",
    code: "CASHBACK25",
    description: "25% de CashBack / Desconto Especial em toda a loja",
    discountType: "percentage",
    discountValue: 25,
    minOrderValue: 0.0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: 1000,
    usageCount: 0,
    active: true,
  },
  {
    id: "coup-1",
    code: "BEMVINDO10",
    description: "10% de desconto no seu primeiro pedido",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 150.0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: 500,
    usageCount: 42,
    active: true,
  },
  {
    id: "coup-2",
    code: "CMAS15",
    description: "15% de desconto especial em compras acima de R$ 350",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 350.0,
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    usageLimit: 200,
    usageCount: 18,
    active: true,
  },
  {
    id: "coup-3",
    code: "CAMPOGRANDE50",
    description: "R$ 50,00 OFF em compras acima de R$ 400",
    discountType: "fixed",
    discountValue: 50,
    minOrderValue: 400.0,
    startDate: "2026-08-10",
    endDate: "2026-10-31",
    usageLimit: 100,
    usageCount: 7,
    active: true,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "CMAS-8491",
    channel: "online",
    userId: "usr-cliente-1",
    customerName: "Mariana Albuquerque",
    customerEmail: "cliente@exemplo.com.br",
    customerPhone: "(67) 99234-5678",
    customerCpf: "444.555.666-77",
    items: [
      {
        productId: "prod-1",
        variantId: "v1-1",
        productName: "Vestido Midi Alfaiataria Vinho Imperial",
        colorName: "Vinho C-MAS",
        size: "P",
        sku: "CM-VES-001-VIN-P",
        unitPrice: 329.90,
        quantity: 1,
        totalPrice: 329.90,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=300&auto=format&fit=crop"
      }
    ],
    subtotal: 329.90,
    discount: 32.99, // BEMVINDO10
    deliveryFee: 0, // acima de 250
    total: 296.91,
    deliveryType: "Entrega em Campo Grande",
    shippingAddress: {
      street: "Rua Euclides da Cunha",
      number: "1420",
      neighborhood: "Jardim dos Estados",
      complement: "Apto 82",
      city: "Campo Grande",
      state: "MS",
      cep: "79020-230"
    },
    paymentMethod: "PIX",
    paymentStatus: "Aprovado",
    paymentDetails: {
      transactionId: "PIX-CMAS-982347-CG",
    },
    status: "Saiu para entrega",
    statusHistory: [
      { status: "Aguardando pagamento", timestamp: "2026-08-27T14:10:00Z" },
      { status: "Pagamento aprovado", timestamp: "2026-08-27T14:12:00Z", note: "PIX confirmado instantaneamente" },
      { status: "Em preparação", timestamp: "2026-08-27T15:00:00Z", updatedBy: "Rodrigo Mendonça" },
      { status: "Saiu para entrega", timestamp: "2026-08-28T09:30:00Z", note: "Entregador expresso C-MAS a caminho" }
    ],
    createdAt: "2026-08-27T14:10:00Z",
    updatedAt: "2026-08-28T09:30:00Z"
  },
  {
    id: "ord-1002",
    orderNumber: "CMAS-8492",
    channel: "fisica",
    customerName: "Lucas Pinheiro (Venda Presencial)",
    customerEmail: "lucas.pinheiro@gmail.com",
    customerPhone: "(67) 98122-3344",
    customerCpf: "555.666.777-88",
    soldByEmployeeId: "usr-vendedor-1",
    soldByEmployeeName: "Camila Barros",
    items: [
      {
        productId: "prod-2",
        variantId: "v2-2",
        productName: "Camisa Social Slim em Algodão Egípcio",
        colorName: "Branco Clássico",
        size: "M",
        sku: "CM-CAM-002-BRA-M",
        unitPrice: 279.90,
        quantity: 1,
        totalPrice: 279.90,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=300&auto=format&fit=crop"
      },
      {
        productId: "prod-8",
        variantId: "v8-1",
        productName: "Cinto em Couro Legítimo com Fivela Monograma CM",
        colorName: "Vinho Escuro Nobre",
        size: "M (95cm)",
        sku: "CM-ACC-008-VIN-M",
        unitPrice: 149.90,
        quantity: 1,
        totalPrice: 149.90,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=300&auto=format&fit=crop"
      }
    ],
    subtotal: 429.80,
    discount: 29.80,
    deliveryFee: 0,
    total: 400.00,
    deliveryType: "Retirada na Loja Física",
    paymentMethod: "Cartão de Crédito",
    paymentStatus: "Aprovado",
    status: "Entregue",
    statusHistory: [
      { status: "Pagamento aprovado", timestamp: "2026-08-28T10:15:00Z", note: "Maquininha Loja Física" },
      { status: "Entregue", timestamp: "2026-08-28T10:17:00Z", note: "Retirado no balcão da loja" }
    ],
    createdAt: "2026-08-28T10:15:00Z",
    updatedAt: "2026-08-28T10:17:00Z"
  },
  {
    id: "ord-1003",
    orderNumber: "CMAS-8493",
    channel: "fisica",
    customerName: "Beatriz Fontes",
    customerEmail: "beatriz.fontes@gmail.com",
    customerPhone: "(67) 99111-2233",
    customerCpf: "123.456.789-00",
    soldByEmployeeId: "usr-vendedor-1",
    soldByEmployeeName: "Camila Barros",
    items: [
      {
        productId: "prod-1",
        variantId: "v1-2",
        productName: "Vestido Midi Alfaiataria Vinho Imperial",
        colorName: "Vinho C-MAS",
        size: "M",
        sku: "CM-VES-001-VIN-M",
        unitPrice: 329.90,
        quantity: 1,
        totalPrice: 329.90,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=300&auto=format&fit=crop"
      }
    ],
    subtotal: 329.90,
    discount: 0,
    deliveryFee: 0,
    total: 329.90,
    deliveryType: "Retirada na Loja Física",
    paymentMethod: "PIX",
    paymentStatus: "Aprovado",
    status: "Entregue",
    statusHistory: [
      { status: "Pagamento aprovado", timestamp: "2026-08-29T11:20:00Z", note: "PIX no Balcão" },
      { status: "Entregue", timestamp: "2026-08-29T11:25:00Z", note: "Entregue pela Vendedora Camila" }
    ],
    createdAt: "2026-08-29T11:20:00Z",
    updatedAt: "2026-08-29T11:25:00Z"
  },
  {
    id: "ord-1004",
    orderNumber: "CMAS-8494",
    channel: "fisica",
    customerName: "Carlos Eduardo Silva",
    customerEmail: "carlos.eduardo@outlook.com",
    customerPhone: "(67) 98765-4321",
    customerCpf: "234.567.890-11",
    soldByEmployeeId: "usr-vendedor-2",
    soldByEmployeeName: "Lucas Sales",
    items: [
      {
        productId: "prod-3",
        variantId: "v3-2",
        productName: "Blazer Estruturado Tailoring Vinho Nobre",
        colorName: "Vinho Borgonha",
        size: "M",
        sku: "CM-BLZ-003-VIN-M",
        unitPrice: 579.80,
        quantity: 1,
        totalPrice: 579.80,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop"
      },
      {
        productId: "prod-2",
        variantId: "v2-2",
        productName: "Camisa Social Slim em Algodão Egípcio",
        colorName: "Branco Clássico",
        size: "M",
        sku: "CM-CAM-002-BRA-M",
        unitPrice: 279.90,
        quantity: 1,
        totalPrice: 279.90,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=300&auto=format&fit=crop"
      }
    ],
    subtotal: 859.70,
    discount: 50.00,
    deliveryFee: 0,
    total: 809.70,
    deliveryType: "Retirada na Loja Física",
    paymentMethod: "Cartão de Crédito",
    paymentStatus: "Aprovado",
    status: "Entregue",
    statusHistory: [
      { status: "Pagamento aprovado", timestamp: "2026-08-30T16:00:00Z", note: "Parcelado em 3x no balcão" },
      { status: "Entregue", timestamp: "2026-08-30T16:05:00Z", note: "Atendido por Lucas Sales" }
    ],
    createdAt: "2026-08-30T16:00:00Z",
    updatedAt: "2026-08-30T16:05:00Z"
  },
  {
    id: "ord-1005",
    orderNumber: "CMAS-8495",
    channel: "fisica",
    customerName: "Fernanda Meirelles",
    customerEmail: "fernanda.meirelles@uol.com.br",
    customerPhone: "(67) 99222-8899",
    customerCpf: "345.678.901-22",
    soldByEmployeeId: "usr-gerente-1",
    soldByEmployeeName: "Rodrigo Mendonça",
    items: [
      {
        productId: "prod-4",
        variantId: "v4-1",
        productName: "Calça Alfaiataria Reta com Pregas Vinho C-MAS",
        colorName: "Vinho Imperial",
        size: "38",
        sku: "CM-CAL-004-VIN-38",
        unitPrice: 259.90,
        quantity: 1,
        totalPrice: 259.90,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop"
      }
    ],
    subtotal: 259.90,
    discount: 0,
    deliveryFee: 0,
    total: 259.90,
    deliveryType: "Retirada na Loja Física",
    paymentMethod: "PIX",
    paymentStatus: "Aprovado",
    status: "Entregue",
    statusHistory: [
      { status: "Pagamento aprovado", timestamp: "2026-08-31T14:40:00Z", note: "PIX Balcão" }
    ],
    createdAt: "2026-08-31T14:40:00Z",
    updatedAt: "2026-08-31T14:45:00Z"
  }
];

export const INITIAL_INVENTORY_LOGS: InventoryMovement[] = [
  {
    id: "inv-log-gold-500",
    productId: "prod-camisa-dourada-royale-500",
    productName: "Camisa Blusa Dourada Metalizada Royale Alta Costura - Edição Limitada",
    variantId: "v-gold-all",
    colorName: "Dourado Metalizado Royale",
    size: "PP-GG",
    sku: "CM-LUX-GOLD-500",
    type: "ENTRADA",
    quantityChange: 500,
    previousStock: 0,
    newStock: 500,
    reason: "Recebimento de Lote Exclusivo de Alta Costura - Edição Limitada 500 Unidades (US$ 15.000 / R$ 86.250,00)",
    userName: "Natali Priscila & Hero (Diretoria)",
    userRole: "ADMINISTRADOR",
    createdAt: "2026-09-04T10:50:00Z"
  },
  {
    id: "inv-log-1",
    productId: "prod-1",
    productName: "Vestido Midi Alfaiataria Vinho Imperial",
    variantId: "v1-1",
    colorName: "Vinho C-MAS",
    size: "P",
    sku: "CM-VES-001-VIN-P",
    type: "SAIDA_VENDA_ONLINE",
    quantityChange: -1,
    previousStock: 7,
    newStock: 6,
    reason: "Pedido Online CMAS-8491",
    userName: "Sistema E-commerce",
    userRole: "ADMINISTRADOR",
    createdAt: "2026-08-27T14:10:00Z"
  },
  {
    id: "inv-log-2",
    productId: "prod-2",
    productName: "Camisa Social Slim em Algodão Egípcio",
    variantId: "v2-2",
    colorName: "Branco Clássico",
    size: "M",
    sku: "CM-CAM-002-BRA-M",
    type: "SAIDA_VENDA_FISICA",
    quantityChange: -1,
    previousStock: 13,
    newStock: 12,
    reason: "Venda Presencial no Balcão CMAS-8492",
    userName: "Camila Barros",
    userRole: "VENDEDOR",
    createdAt: "2026-08-28T10:15:00Z"
  },
  {
    id: "inv-log-3",
    productId: "prod-3",
    productName: "Blazer Estruturado Tailoring Vinho Nobre",
    variantId: "v3-2",
    colorName: "Vinho Borgonha",
    size: "M",
    sku: "CM-BLZ-003-VIN-M",
    type: "ENTRADA",
    quantityChange: +5,
    previousStock: 0,
    newStock: 5,
    reason: "Recebimento lote de alfaiataria outono",
    userName: "Rodrigo Mendonça",
    userRole: "GERENTE",
    createdAt: "2026-08-20T14:30:00Z"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-1",
    userId: "usr-admin-1",
    userName: "Helena Carvalho",
    userRole: "ADMINISTRADOR",
    action: "Criação de Cupom",
    entity: "Cupom",
    entityId: "CMAS15",
    details: "Cupom de 15% criado para a campanha de outono/inverno",
    createdAt: "2026-08-01T08:30:00Z"
  },
  {
    id: "aud-2",
    userId: "usr-gerente-1",
    userName: "Rodrigo Mendonça",
    userRole: "GERENTE",
    action: "Entrada de Estoque",
    entity: "Produto",
    entityId: "prod-3",
    details: "Adicionadas 5 unidades do Blazer Vinho Tam M",
    createdAt: "2026-08-20T14:30:00Z"
  },
  {
    id: "aud-3",
    userId: "usr-vendedor-1",
    userName: "Camila Barros",
    userRole: "VENDEDOR",
    action: "Venda Física Registrada",
    entity: "Pedido",
    entityId: "CMAS-8492",
    details: "Venda presencial de R$ 400,00 concluída no PDV",
    createdAt: "2026-08-28T10:15:00Z"
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "tck-1",
    protocol: "CM-TCK-928",
    userName: "Mariana Albuquerque",
    userEmail: "cliente@exemplo.com.br",
    userPhone: "(67) 99234-5678",
    subject: "Dúvida sobre o prazo de entrega no Jardim dos Estados",
    category: "Entrega / Retirada",
    message: "Boa tarde! Gostaria de saber se o pedido feito hoje pela manhã sai para entrega ainda hoje à tarde.",
    status: "Resolvido",
    orderNumber: "CMAS-8491",
    createdAt: "2026-08-27T15:30:00Z",
    reply: "Olá Mariana! Sim, todas as entregas para bairros de Campo Grande são feitas no mesmo dia ou em até 24h úteis. Seu pedido já está com nosso entregador parceiro!",
    repliedAt: "2026-08-27T16:00:00Z",
    repliedBy: "Helena Carvalho (Admin)"
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userId: "usr-cliente-1",
    userName: "Mariana A.",
    rating: 5,
    title: "Perfeição absoluta!",
    comment: "O vestido é simplesmente deslumbrante! O tom de vinho é maravilhoso e o caimento da alfaiataria é padrão boutique de luxo. A entrega em Campo Grande foi super rápida.",
    createdAt: "2026-08-25T11:20:00Z",
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    productId: "prod-2",
    userId: "usr-cliente-2",
    userName: "Carlos E.",
    rating: 5,
    title: "Melhor camisa que já comprei",
    comment: "O algodão egípcio tem um toque incrível. O corte slim veste perfeitamente. Recomendo muito a C-MAS Modas!",
    createdAt: "2026-08-22T19:40:00Z",
    verifiedPurchase: true
  }
];

class DataStoreService {
  private listeners: Set<() => void> = new Set();

  private load<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.notify();
    } catch (e) {
      console.error(`Erro salvando ${key}:`, e);
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- SETTINGS ---
  getSettings(): StoreSettings {
    return this.load<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  updateSettings(settings: Partial<StoreSettings>, user?: User) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.save(STORAGE_KEYS.SETTINGS, updated);

    if (user) {
      this.addAuditLog(user, "Atualização de Configurações", "Loja", "Config", "Parâmetros gerais da C-MAS Modas atualizados.");
    }
  }

  // --- PRODUCTS & INVENTORY ---
  getProducts(): Product[] {
    const loaded = this.load<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    let productsList = [...loaded];
    let changed = false;

    // Ensure the Royale Gold 500 Limited Edition product is always up-to-date
    const goldProd = INITIAL_PRODUCTS.find((p) => p.id === "prod-camisa-dourada-royale-500");
    if (goldProd) {
      const idx = productsList.findIndex((p) => p.id === goldProd.id);
      if (idx === -1) {
        productsList.unshift(goldProd);
        changed = true;
      } else {
        const existing = productsList[idx];
        const currentStock = existing.variants.reduce((acc, v) => acc + (v.stock || 0), 0);
        if (existing.price !== 86250 || currentStock !== 500) {
          productsList[idx] = {
            ...existing,
            ...goldProd,
            price: 86250,
            variants: goldProd.variants
          };
          changed = true;
        }
      }
    }

    const missing = INITIAL_PRODUCTS.filter((ip) => !productsList.some((lp) => lp.id === ip.id));
    if (missing.length > 0) {
      productsList = [...missing, ...productsList];
      changed = true;
    }

    if (changed) {
      this.save(STORAGE_KEYS.PRODUCTS, productsList);
    }
    return productsList;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug || p.id === slug);
  }

  saveProducts(products: Product[]) {
    this.save(STORAGE_KEYS.PRODUCTS, products);
  }

  addProduct(productData: Omit<Product, "id" | "createdAt" | "rating" | "reviewCount">, user: User | { name: string; role: UserRole; id?: string }): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...productData,
      id: "prod-" + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
      active: true,
    };
    products.unshift(newProduct);
    this.saveProducts(products);

    this.addAuditLog(user, "Cadastro de Produto", "Produto", newProduct.id, `Produto "${newProduct.name}" cadastrado com sucesso.`);
    return newProduct;
  }

  updateProduct(productId: string, data: Partial<Product>, user: User | { name: string; role: UserRole; id?: string }): Product | null {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === productId);
    if (idx === -1) return null;

    const oldProduct = products[idx];
    const updated: Product = { ...oldProduct, ...data };
    products[idx] = updated;
    this.saveProducts(products);

    this.addAuditLog(user, "Edição de Produto", "Produto", productId, `Produto "${updated.name}" atualizado.`);
    return updated;
  }

  deleteProduct(productId: string, user: User | { name: string; role: UserRole; id?: string }): boolean {
    const products = this.getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) return false;

    const filtered = products.filter((p) => p.id !== productId);
    this.saveProducts(filtered);

    this.addAuditLog(user, "Exclusão de Produto", "Produto", productId, `Produto "${product.name}" desativado/removido.`);
    return true;
  }

  // --- UNIFIED INVENTORY ADJUSTMENT ---
  adjustStock(
    productId: string,
    variantId: string,
    quantityChange: number,
    type: InventoryMovement["type"],
    reason: string,
    user: { name: string; role: UserRole }
  ): { success: boolean; newStock: number; message: string } {
    const products = this.getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return { success: false, newStock: 0, message: "Produto não encontrado." };
    }

    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) {
      return { success: false, newStock: 0, message: "Variação do produto não encontrada." };
    }

    const previousStock = variant.stock;
    const newStock = previousStock + quantityChange;

    if (newStock < 0) {
      return {
        success: false,
        newStock: previousStock,
        message: `Estoque insuficiente! Disponível: ${previousStock}, Solicitado: ${Math.abs(quantityChange)}.`
      };
    }

    // Update variant stock atomically
    variant.stock = newStock;
    this.saveProducts(products);

    // Record in unified inventory movements
    const movements = this.getInventoryLogs();
    const log: InventoryMovement = {
      id: "inv-" + Math.random().toString(36).substring(2, 9),
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      colorName: variant.colorName,
      size: variant.size,
      sku: variant.sku,
      type,
      quantityChange,
      previousStock,
      newStock,
      reason,
      userName: user.name,
      userRole: user.role,
      createdAt: new Date().toISOString()
    };
    movements.unshift(log);
    this.save(STORAGE_KEYS.INVENTORY_LOGS, movements);

    return { success: true, newStock, message: "Estoque unificado atualizado com sucesso." };
  }

  getInventoryLogs(): InventoryMovement[] {
    return this.load<InventoryMovement[]>(STORAGE_KEYS.INVENTORY_LOGS, INITIAL_INVENTORY_LOGS);
  }

  // --- CATEGORIES ---
  getCategories(): Category[] {
    return this.load<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  saveCategories(categories: Category[]) {
    this.save(STORAGE_KEYS.CATEGORIES, categories);
  }

  addCategory(data: Omit<Category, "id" | "itemCount">, user: User): Category {
    const categories = this.getCategories();
    const newCat: Category = {
      ...data,
      id: "cat-" + Math.random().toString(36).substring(2, 9),
      itemCount: 0
    };
    categories.push(newCat);
    this.saveCategories(categories);
    this.addAuditLog(user, "Criação de Categoria", "Categoria", newCat.id, `Categoria "${newCat.name}" criada.`);
    return newCat;
  }

  // --- USERS & AUTH ---
  getUsers(): User[] {
    const loaded = this.load<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    let updated = false;

    // Ensure all INITIAL_USERS (especially admins) are present and properly assigned
    const userMap = new Map<string, User>();
    for (const u of loaded) {
      userMap.set(u.email.toLowerCase().trim(), u);
    }

    for (const initUser of INITIAL_USERS) {
      const emailKey = initUser.email.toLowerCase().trim();
      const existing = userMap.get(emailKey);
      if (!existing) {
        userMap.set(emailKey, initUser);
        updated = true;
      } else {
        // Enforce role and password updates for administrators
        if (initUser.role === "ADMINISTRADOR" && (existing.role !== "ADMINISTRADOR" || existing.password !== initUser.password)) {
          userMap.set(emailKey, {
            ...existing,
            role: "ADMINISTRADOR",
            password: initUser.password
          });
          updated = true;
        }
      }
    }

    const merged = Array.from(userMap.values());
    if (updated) {
      this.save(STORAGE_KEYS.USERS, merged);
    }
    return merged;
  }

  saveUsers(users: User[]) {
    this.save(STORAGE_KEYS.USERS, users);
  }

  getCurrentUser(): User | null {
    return this.load<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  setCurrentUser(user: User | null) {
    this.save(STORAGE_KEYS.CURRENT_USER, user);
  }

  login(email: string, password?: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const found = users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (!found) {
      return { success: false, error: "Usuário não encontrado com este e-mail." };
    }

    if (password && password.trim() !== "") {
      const storedPass = found.password || "123456";
      if (found.password && found.password !== password.trim() && storedPass !== password.trim()) {
        return { success: false, error: "Senha incorreta. Por favor, tente novamente." };
      }
    }

    this.setCurrentUser(found);
    return { success: true, user: found };
  }

  register(userData: { name: string; email: string; cpf?: string; phone?: string; password?: string }): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const emailExists = users.some((u) => u.email.toLowerCase().trim() === userData.email.toLowerCase().trim());
    if (emailExists) {
      return { success: false, error: "Este e-mail já está cadastrado na C-MAS Modas." };
    }

    if (userData.cpf) {
      const cpfExists = users.some((u) => u.cpf && u.cpf.replace(/\D/g, "") === userData.cpf?.replace(/\D/g, ""));
      if (cpfExists) {
        return { success: false, error: "Já existe uma conta cadastrada com este CPF." };
      }
    }

    const isSystemAdmin =
      userData.email.toLowerCase().trim() === "herolick13@gmail.com" ||
      userData.email.toLowerCase().trim() === "natalipriscila09@gmail.com";

    const newUser: User = {
      id: "usr-" + Math.random().toString(36).substring(2, 9),
      name: userData.name,
      email: userData.email,
      password: userData.password || (isSystemAdmin ? "adm123" : "123456"),
      cpf: userData.cpf,
      phone: userData.phone,
      role: isSystemAdmin ? "ADMINISTRADOR" : "CLIENTE",
      emailVerified: true,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.save(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  isMasterAdmin(userOrEmail?: User | string | null): boolean {
    if (!userOrEmail) return false;
    const email = typeof userOrEmail === "string" ? userOrEmail : userOrEmail.email;
    const cleanEmail = (email || "").toLowerCase().trim();
    return (
      cleanEmail === "herolick13@gmail.com" ||
      cleanEmail === "natalipriscila09@gmail.com" ||
      cleanEmail === "admin@cmasmodas.com.br"
    );
  }

  verifyAdminPassword(password: string): boolean {
    if (!password || password.trim() === "") return false;
    const users = this.getUsers();
    const admins = users.filter((u) => u.role === "ADMINISTRADOR");
    return admins.some((adm) => (adm.password || "adm123") === password.trim());
  }

  updateUserPassword(userId: string, newPassword: string): { success: boolean; error?: string } {
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, error: "A nova senha deve ter no mínimo 4 caracteres." };
    }

    const users = this.getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return { success: false, error: "Usuário não encontrado." };
    }

    user.password = newPassword.trim();
    this.saveUsers(users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser({ ...currentUser, password: newPassword.trim() });
    }

    return { success: true };
  }

  switchUserRole(role: UserRole) {
    const users = this.getUsers();
    const match = users.find((u) => u.role === role);
    if (match) {
      this.setCurrentUser(match);
      return match;
    }
    return null;
  }

  logout() {
    this.setCurrentUser(null);
  }

  // --- ORDERS & PURCHASES ---
  getOrders(): Order[] {
    const loaded = this.load<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const missing = INITIAL_ORDERS.filter(
      (init) => !loaded.some((l) => l.id === init.id)
    );
    if (missing.length > 0) {
      const merged = [...loaded, ...missing];
      this.save(STORAGE_KEYS.ORDERS, merged);
      return merged;
    }
    return loaded;
  }

  getOrderByNumber(orderNumber: string): Order | undefined {
    const clean = orderNumber.replace(/#/g, "").trim().toUpperCase();
    return this.getOrders().find(
      (o) => o.orderNumber.toUpperCase() === clean || o.id === orderNumber
    );
  }

  saveOrders(orders: Order[]) {
    this.save(STORAGE_KEYS.ORDERS, orders);
  }

  assignOrderSeller(orderId: string, sellerId: string, sellerName: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.soldByEmployeeId = sellerId;
      order.soldByEmployeeName = sellerName;
      order.updatedAt = new Date().toISOString();
      this.saveOrders(orders);
      return true;
    }
    return false;
  }

  createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt" | "statusHistory">): { success: boolean; order?: Order; error?: string } {
    const products = this.getProducts();

    // 1. Verify availability of ALL items first (atomic verification)
    for (const item of orderData.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return { success: false, error: `Produto ${item.productName} não encontrado.` };
      }
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return { success: false, error: `Variação ${item.colorName} / ${item.size} de ${item.productName} não encontrada.` };
      }
      if (variant.stock < item.quantity) {
        return {
          success: false,
          error: `Estoque insuficiente para "${item.productName}" (${item.colorName}, ${item.size}). Disponível: ${variant.stock} un.`
        };
      }
    }

    // 2. Decrement stock atomically from unified inventory
    const isPhysical = orderData.channel === "fisica";
    const movementType = isPhysical ? "SAIDA_VENDA_FISICA" : "SAIDA_VENDA_ONLINE";
    const orderNum = "CMAS-" + Math.floor(1000 + Math.random() * 9000).toString();

    for (const item of orderData.items) {
      this.adjustStock(
        item.productId,
        item.variantId,
        -item.quantity,
        movementType,
        isPhysical ? `Venda Presencial PDV ${orderNum}` : `Pedido Online ${orderNum}`,
        {
          name: orderData.soldByEmployeeName || orderData.customerName || "Cliente Online",
          role: isPhysical ? "VENDEDOR" : "CLIENTE"
        }
      );
    }

    // 3. Create the order record
    const newOrder: Order = {
      ...orderData,
      id: "ord-" + Math.random().toString(36).substring(2, 9),
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: orderData.status || (orderData.paymentMethod === "PIX" ? "Aguardando pagamento" : "Pagamento aprovado"),
          timestamp: new Date().toISOString(),
          note: isPhysical ? "Venda balcão registrada na loja física" : "Pedido realizado pelo e-commerce C-MAS"
        }
      ]
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Clear cart if online order
    if (!isPhysical) {
      this.clearCart();
    }

    return { success: true, order: newOrder };
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus, user: User, note?: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note,
      updatedBy: user.name
    });

    if (newStatus === "Pagamento aprovado") {
      order.paymentStatus = "Aprovado";
    } else if (newStatus === "Cancelado") {
      order.paymentStatus = "Cancelado";
      // Restock products upon cancellation!
      for (const item of order.items) {
        this.adjustStock(
          item.productId,
          item.variantId,
          item.quantity,
          "LIBERACAO",
          `Estorno por cancelamento do pedido ${order.orderNumber}`,
          { name: user.name, role: user.role }
        );
      }
    }

    this.saveOrders(orders);
    this.addAuditLog(user, "Atualização de Pedido", "Pedido", order.orderNumber, `Status alterado para "${newStatus}".`);
    return true;
  }

  // --- CART ---
  getCart(): CartItem[] {
    return this.load<CartItem[]>(STORAGE_KEYS.CART, []);
  }

  saveCart(cart: CartItem[]) {
    this.save(STORAGE_KEYS.CART, cart);
  }

  addToCart(item: CartItem): { success: boolean; message: string } {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      (c) => c.productId === item.productId && c.variantId === item.variantId
    );

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const desiredQty = currentQty + item.quantity;
      if (desiredQty > item.maxStock) {
        return {
          success: false,
          message: `Desculpe, o estoque máximo disponível para esta variação é de ${item.maxStock} unidades.`
        };
      }
      cart[existingIndex].quantity = desiredQty;
    } else {
      if (item.quantity > item.maxStock) {
        return {
          success: false,
          message: `Desculpe, o estoque disponível para esta variação é de ${item.maxStock} unidades.`
        };
      }
      cart.push(item);
    }

    this.saveCart(cart);
    return { success: true, message: `"${item.productName}" adicionado ao carrinho com sucesso!` };
  }

  updateCartQuantity(productId: string, variantId: string, quantity: number) {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter((c) => !(c.productId === productId && c.variantId === variantId));
    } else {
      const item = cart.find((c) => c.productId === productId && c.variantId === variantId);
      if (item) {
        item.quantity = Math.min(quantity, item.maxStock);
      }
    }
    this.saveCart(cart);
  }

  removeFromCart(productId: string, variantId: string) {
    const cart = this.getCart().filter((c) => !(c.productId === productId && c.variantId === variantId));
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart([]);
  }

  // --- FAVORITES ---
  getFavorites(): string[] {
    return this.load<string[]>(STORAGE_KEYS.FAVORITES, ["prod-1", "prod-3"]);
  }

  toggleFavorite(productId: string): boolean {
    const favs = this.getFavorites();
    let isFav = false;
    let updated: string[];
    if (favs.includes(productId)) {
      updated = favs.filter((id) => id !== productId);
      isFav = false;
    } else {
      updated = [...favs, productId];
      isFav = true;
    }
    this.save(STORAGE_KEYS.FAVORITES, updated);
    return isFav;
  }

  // --- COUPONS ---
  getCoupons(): Coupon[] {
    const loaded = this.load<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
    // Ensure all base coupons exist in the active storage
    const missing = INITIAL_COUPONS.filter(
      (init) => !loaded.some((l) => l.code.toUpperCase() === init.code.toUpperCase())
    );
    if (missing.length > 0) {
      const merged = [...loaded, ...missing];
      this.save(STORAGE_KEYS.COUPONS, merged);
      return merged;
    }
    return loaded;
  }

  saveCoupons(coupons: Coupon[]) {
    this.save(STORAGE_KEYS.COUPONS, coupons);
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; coupon?: Coupon; error?: string } {
    const coupons = this.getCoupons();
    let cleanCode = code.trim().toUpperCase();

    // Map common cashback coupon variations
    if (
      cleanCode === "CASHBACK" ||
      cleanCode === "CB25" ||
      cleanCode === "CASHBACK 25" ||
      cleanCode === "CASHBACK-25" ||
      cleanCode === "VOLTA25" ||
      cleanCode === "25CASHBACK"
    ) {
      cleanCode = "CASHBACK25";
    }

    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!coupon) {
      return { valid: false, discount: 0, error: "Cupom não encontrado ou inativo." };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        error: `O cupom ${coupon.code} exige pedido mínimo de R$ ${coupon.minOrderValue.toFixed(2).replace(".", ",")}.`
      };
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    return { valid: true, discount, coupon };
  }

  // --- REVIEWS ---
  getReviews(): ProductReview[] {
    return this.load<ProductReview[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  }

  getProductReviews(productId: string): ProductReview[] {
    return this.getReviews().filter((r) => r.productId === productId);
  }

  addReview(reviewData: Omit<ProductReview, "id" | "createdAt">) {
    const reviews = this.getReviews();
    const newRev: ProductReview = {
      ...reviewData,
      id: "rev-" + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newRev);
    this.save(STORAGE_KEYS.REVIEWS, reviews);
    return newRev;
  }

  // --- SUPPORT TICKETS ---
  getTickets(): SupportTicket[] {
    return this.load<SupportTicket[]>(STORAGE_KEYS.TICKETS, INITIAL_TICKETS);
  }

  createTicket(ticketData: Omit<SupportTicket, "id" | "protocol" | "createdAt" | "status">): SupportTicket {
    const tickets = this.getTickets();
    const newTicket: SupportTicket = {
      ...ticketData,
      id: "tck-" + Math.random().toString(36).substring(2, 9),
      protocol: "CM-TCK-" + Math.floor(100 + Math.random() * 900),
      status: "Aberto",
      createdAt: new Date().toISOString()
    };
    tickets.unshift(newTicket);
    this.save(STORAGE_KEYS.TICKETS, tickets);
    return newTicket;
  }

  addTicket(ticketData: Omit<SupportTicket, "id" | "protocol" | "createdAt" | "status">): SupportTicket {
    return this.createTicket(ticketData);
  }

  replyTicket(ticketId: string, reply: string, user: User): boolean {
    const tickets = this.getTickets();
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return false;

    ticket.reply = reply;
    ticket.repliedAt = new Date().toISOString();
    ticket.repliedBy = `${user.name} (${user.role})`;
    ticket.status = "Resolvido";
    this.save(STORAGE_KEYS.TICKETS, tickets);
    return true;
  }

  // --- AUDIT LOGS ---
  getAuditLogs(): AuditLog[] {
    return this.load<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  addAuditLog(user: User | { name: string; role: UserRole; id?: string }, action: string, entity: string, entityId: string, details: string) {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: "aud-" + Math.random().toString(36).substring(2, 9),
      userId: user.id || "system",
      userName: user.name,
      userRole: user.role,
      action,
      entity,
      entityId,
      details,
      createdAt: new Date().toISOString()
    };
    logs.unshift(newLog);
    this.save(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  // --- CURTAIN ANIMATION SEEN STATUS ---
  hasSeenCurtain(): boolean {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.CURTAIN_SEEN) === "true";
    } catch {
      return false;
    }
  }

  setCurtainSeen() {
    try {
      sessionStorage.setItem(STORAGE_KEYS.CURTAIN_SEEN, "true");
    } catch {
      // ignore
    }
  }
}

export const dataStore = new DataStoreService();

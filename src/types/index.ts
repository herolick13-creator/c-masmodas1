export type UserRole = "ADMINISTRADOR" | "GERENTE" | "VENDEDOR" | "CLIENTE";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  cpf?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string; // "Casa", "Trabalho"
  recipientName: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: string; // "PP", "P", "M", "G", "GG", "38", "40", etc.
  stock: number;
  reservedStock?: number;
  barcode?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  title?: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  skuBase: string;
  description: string;
  shortDescription: string;
  details: string[];
  fabric: string; // e.g. "100% Algodão Egípcio", "Seda Pura", "Linho Premium"
  price: number;
  promoPrice?: number;
  category: string; // "Feminino", "Masculino", "Unissex", "Teen", "Infantil"
  subCategory: string; // "Vestidos", "Blusas", "Calças", "Camisas", "Conjuntos", "Acessórios"
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  variants: ProductVariant[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  itemCount: number;
  active: boolean;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  image: string;
  colorName: string;
  colorHex: string;
  size: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  maxStock: number;
}

export type OrderStatus =
  | "Aguardando pagamento"
  | "Pagamento aprovado"
  | "Em preparação"
  | "Pronto para retirada"
  | "Saiu para entrega"
  | "Entregue"
  | "Cancelado";

export type PaymentMethod = "PIX" | "Cartão de Crédito" | "Dinheiro na Retirada" | "Cartão na Loja";
export type DeliveryType = "Entrega em Campo Grande" | "Retirada na Loja Física";

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  colorName: string;
  size: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g., "CMAS-8492"
  channel: "online" | "fisica";
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCpf: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  deliveryType: DeliveryType;
  shippingAddress?: {
    street: string;
    number: string;
    neighborhood: string;
    complement?: string;
    city: string;
    state: string;
    cep: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: "Pendente" | "Aprovado" | "Cancelado";
  paymentDetails?: {
    pixQrCode?: string;
    pixCopyPaste?: string;
    cardLast4?: string;
    installments?: number;
    transactionId?: string;
  };
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
    updatedBy?: string;
  }[];
  notes?: string;
  soldByEmployeeId?: string;
  soldByEmployeeName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  colorName: string;
  size: string;
  sku: string;
  type: "ENTRADA" | "SAIDA_VENDA_ONLINE" | "SAIDA_VENDA_FISICA" | "AJUSTE" | "RESERVA" | "LIBERACAO";
  quantityChange: number; // positive or negative
  previousStock: number;
  newStock: number;
  reason: string;
  userName: string;
  userRole: UserRole;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  protocol: string; // e.g. "CM-TCK-928"
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  subject: string;
  category: string;
  message: string;
  status: "Aberto" | "Em Atendimento" | "Resolvido";
  orderNumber?: string;
  createdAt: string;
  reply?: string;
  repliedAt?: string;
  repliedBy?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  openingHours: string;
  deliveryFee: number;
  freeShippingThreshold: number;
  deliveryAreaNote: string;
  announcementText: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  enableOnlineSales: boolean;
  enablePhysicalStorePickup: boolean;
  pixKey: string;
  pixKeyType: string;
  pixBeneficiary: string;
  instagram: string;
  facebook: string;
}

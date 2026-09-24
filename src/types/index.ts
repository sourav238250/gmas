export type Role = 'admin' | 'supplier' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  companyName?: string;
  gstin?: string;
  address?: string;
  supplierId?: string; // If role is supplier
}

export type ProductCategory = 
  | 'Fasteners & Bolts'
  | 'Valves & Pipe Fittings'
  | 'Wire Ropes & Rigging'
  | 'Power Tools & Abrasives'
  | 'Industrial Safety'
  | 'Paints & Lubricants'
  | 'General Hardware';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sku: string;
  hsnCode: string;
  description: string;
  specs: Record<string, string>;
  unit: 'Pcs' | 'Kg' | 'Box' | 'Meter' | 'Bundle' | 'Set';
  price: number; // In INR
  mrp: number;
  gstRate: number; // 5, 12, 18, 28%
  stock: number;
  minStockLevel: number;
  supplierId: string;
  supplierName: string;
  imageUrl?: string;
  locationRack?: string;
  lastRestocked?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packing' | 'Dispatched' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Partial' | 'Pending' | 'Credit-30Days';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  gstRate: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerGstin?: string;
  shippingAddress: string;
  billingAddress: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'UPI' | 'NEFT/RTGS' | 'Cheque' | 'Cash on Delivery' | '30-Day Credit';
  poNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  invoiceId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstin: string;
  categories: ProductCategory[];
  rating: number;
  paymentTerms: string;
  balanceDue: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
    costPrice: number;
    total: number;
  }[];
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  createdDate: string;
  expectedDate: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  orderNumber: string;
  invoiceDate: string;
  dueDate: string;
  buyerName: string;
  buyerAddress: string;
  buyerGstin?: string;
  buyerPhone: string;
  items: OrderItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  grandTotal: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentMode: string;
  sellerDetails: {
    firmName: string;
    subtitle: string;
    address: string;
    cityStateZip: string;
    stateCode: string;
    phone: string;
    email: string;
    gstin: string;
    pan: string;
    bankName: string;
    accountNo: string;
    ifsc: string;
    branch: string;
  };
}

export interface StockLog {
  id: string;
  productId: string;
  productName: string;
  changeType: 'Order' | 'Restock' | 'Adjustment' | 'Return';
  quantityDelta: number;
  remainingStock: number;
  notes: string;
  timestamp: string;
  user: string;
}

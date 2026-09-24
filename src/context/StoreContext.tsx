import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Supplier, Order, Invoice, StockLog, OrderStatus, PaymentStatus } from '../types/index.ts';
import { INITIAL_PRODUCTS, INITIAL_SUPPLIERS, INITIAL_ORDERS, INITIAL_INVOICES, INITIAL_STOCK_LOGS, FIRM_DETAILS } from '../data/initialData.ts';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  suppliers: Supplier[];
  orders: Order[];
  invoices: Invoice[];
  stockLogs: StockLog[];
  cart: CartItem[];
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Product & Inventory Actions
  updateProductStock: (productId: string, newStock: number, reason: string, user: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  lowStockProducts: Product[];

  // Order & Billing Actions
  createOrder: (orderData: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerGstin?: string;
    shippingAddress: string;
    billingAddress: string;
    paymentMethod: Order['paymentMethod'];
    poNumber?: string;
    notes?: string;
    items?: { product: Product; quantity: number }[];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;

  // Invoicing Actions
  generateInvoiceForOrder: (orderId: string) => Invoice | null;
  getInvoiceById: (invoiceId: string) => Invoice | undefined;

  // Supplier Actions
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Supplier;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  quickRestock: (productId: string, quantity: number, supplierName: string, userName: string) => void;

  // Reset demo data
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'gms_store_products_v1',
  SUPPLIERS: 'gms_store_suppliers_v1',
  ORDERS: 'gms_store_orders_v1',
  INVOICES: 'gms_store_invoices_v1',
  LOGS: 'gms_store_logs_v1',
  CART: 'gms_store_cart_v1'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPPLIERS);
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [stockLogs, setStockLogs] = useState<StockLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : INITIAL_STOCK_LOGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(stockLogs));
  }, [stockLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      const initialQty = Math.min(quantity, Math.max(1, product.stock));
      return [...prev, { product, quantity: initialQty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const clamped = Math.min(quantity, item.product.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Low stock list
  const lowStockProducts = products.filter(p => p.stock <= p.minStockLevel);

  // Stock management
  const updateProductStock = (productId: string, newStock: number, reason: string, user: string) => {
    setProducts(prev => {
      const prod = prev.find(p => p.id === productId);
      if (!prod) return prev;
      const delta = newStock - prod.stock;

      const log: StockLog = {
        id: `log-${Date.now()}`,
        productId,
        productName: prod.name,
        changeType: delta >= 0 ? 'Restock' : 'Adjustment',
        quantityDelta: delta,
        remainingStock: newStock,
        notes: reason,
        timestamp: new Date().toISOString(),
        user
      };
      setStockLogs(l => [log, ...l]);

      return prev.map(p => (p.id === productId ? { ...p, stock: newStock } : p));
    });
  };

  const quickRestock = (productId: string, quantity: number, supplierName: string, userName: string) => {
    setProducts(prev => {
      const target = prev.find(p => p.id === productId);
      if (!target) return prev;
      const nextStock = target.stock + quantity;

      const log: StockLog = {
        id: `log-${Date.now()}`,
        productId,
        productName: target.name,
        changeType: 'Restock',
        quantityDelta: quantity,
        remainingStock: nextStock,
        notes: `Quick restock from ${supplierName}`,
        timestamp: new Date().toISOString(),
        user: userName
      };
      setStockLogs(l => [log, ...l]);

      return prev.map(p =>
        p.id === productId
          ? { ...p, stock: nextStock, lastRestocked: new Date().toISOString().split('T')[0] }
          : p
      );
    });
  };

  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);

    const log: StockLog = {
      id: `log-${Date.now()}`,
      productId: newProd.id,
      productName: newProd.name,
      changeType: 'Restock',
      quantityDelta: newProd.stock,
      remainingStock: newProd.stock,
      notes: 'Initial inventory catalog entry',
      timestamp: new Date().toISOString(),
      user: 'Admin'
    };
    setStockLogs(l => [log, ...l]);

    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Order placement & immediate stock deduction
  const createOrder = (orderData: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerGstin?: string;
    shippingAddress: string;
    billingAddress: string;
    paymentMethod: Order['paymentMethod'];
    poNumber?: string;
    notes?: string;
    items?: { product: Product; quantity: number }[];
  }): Order => {
    const rawItems = orderData.items || cart;
    if (rawItems.length === 0) {
      throw new Error("Cannot place an empty order");
    }

    const orderNumber = `GMS/ORD/2026-27/${String(orders.length + 91).padStart(3, '0')}`;
    const invoiceNumber = `GMS/TAX-INV/26-27/${String(invoices.length + 91).padStart(3, '0')}`;

    let subtotal = 0;
    let cgst = 0;
    let sgst = 0;
    const igst = 0; // Local West Bengal supply (same state code 19)

    const orderItems = rawItems.map(item => {
      const lineSubtotal = item.product.price * item.quantity;
      const gstAmount = (lineSubtotal * item.product.gstRate) / 100;
      subtotal += lineSubtotal;
      cgst += gstAmount / 2;
      sgst += gstAmount / 2;

      return {
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        hsnCode: item.product.hsnCode,
        quantity: item.quantity,
        unit: item.product.unit,
        unitPrice: item.product.price,
        gstRate: item.product.gstRate,
        total: lineSubtotal
      };
    });

    const taxAmount = cgst + sgst + igst;
    const totalAmount = subtotal + taxAmount;
    const orderId = `ord-${Date.now()}`;
    const invoiceId = `inv-${Date.now()}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerId: orderData.customerId,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      customerGstin: orderData.customerGstin,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      items: orderItems,
      subtotal,
      cgst,
      sgst,
      igst,
      taxAmount,
      totalAmount,
      status: 'Confirmed',
      paymentStatus: orderData.paymentMethod === '30-Day Credit' ? 'Credit-30Days' : 'Paid',
      paymentMethod: orderData.paymentMethod,
      poNumber: orderData.poNumber,
      notes: orderData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      invoiceId
    };

    // Auto-generate GST Tax Invoice
    const newInvoice: Invoice = {
      id: invoiceId,
      invoiceNumber,
      orderId,
      orderNumber,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: orderData.paymentMethod === '30-Day Credit' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      buyerName: orderData.customerName,
      buyerAddress: orderData.billingAddress,
      buyerGstin: orderData.customerGstin,
      buyerPhone: orderData.customerPhone,
      items: orderItems,
      subtotal,
      cgst,
      sgst,
      igst,
      totalTax: taxAmount,
      grandTotal: totalAmount,
      status: orderData.paymentMethod === '30-Day Credit' ? 'Unpaid' : 'Paid',
      paymentMode: orderData.paymentMethod,
      sellerDetails: {
        firmName: FIRM_DETAILS.name,
        subtitle: FIRM_DETAILS.tagline,
        address: FIRM_DETAILS.address,
        cityStateZip: FIRM_DETAILS.locality,
        stateCode: FIRM_DETAILS.stateCode,
        phone: FIRM_DETAILS.phones.join(" / "),
        email: FIRM_DETAILS.email,
        gstin: FIRM_DETAILS.gstin,
        pan: FIRM_DETAILS.pan,
        bankName: FIRM_DETAILS.bankDetails.bankName,
        accountNo: FIRM_DETAILS.bankDetails.accountNo,
        ifsc: FIRM_DETAILS.bankDetails.ifsc,
        branch: FIRM_DETAILS.bankDetails.branch
      }
    };

    // Deduct stock in real-time & create logs
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const ordered = rawItems.find(ri => ri.product.id === p.id);
        if (ordered) {
          const remaining = Math.max(0, p.stock - ordered.quantity);
          const log: StockLog = {
            id: `log-${Date.now()}-${p.id}`,
            productId: p.id,
            productName: p.name,
            changeType: 'Order',
            quantityDelta: -ordered.quantity,
            remainingStock: remaining,
            notes: `Order placed #${orderNumber}`,
            timestamp: new Date().toISOString(),
            user: orderData.customerName
          };
          setStockLogs(l => [log, ...l]);
          return { ...p, stock: remaining };
        }
        return p;
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    setInvoices(prev => [newInvoice, ...prev]);
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, _notes?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      })
    );
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: PaymentStatus) => {
    setOrders(prev => {
      const updated = prev.map(ord => (ord.id === orderId ? { ...ord, paymentStatus } : ord));
      const target = prev.find(ord => ord.id === orderId);
      if (target?.invoiceId) {
        setInvoices(invs =>
          invs.map(i =>
            i.id === target.invoiceId
              ? { ...i, status: paymentStatus === 'Paid' ? 'Paid' : 'Unpaid' }
              : i
          )
        );
      }
      return updated;
    });
  };

  const generateInvoiceForOrder = (orderId: string): Invoice | null => {
    const existing = invoices.find(i => i.orderId === orderId);
    if (existing) return existing;

    const ord = orders.find(o => o.id === orderId);
    if (!ord) return null;

    const invoiceNumber = `GMS/TAX-INV/26-27/${String(invoices.length + 91).padStart(3, '0')}`;
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      orderId: ord.id,
      orderNumber: ord.orderNumber,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: ord.paymentStatus === 'Paid' 
        ? new Date().toISOString().split('T')[0]
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      buyerName: ord.customerName,
      buyerAddress: ord.billingAddress,
      buyerGstin: ord.customerGstin,
      buyerPhone: ord.customerPhone,
      items: ord.items,
      subtotal: ord.subtotal,
      cgst: ord.cgst,
      sgst: ord.sgst,
      igst: ord.igst,
      totalTax: ord.taxAmount,
      grandTotal: ord.totalAmount,
      status: ord.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid',
      paymentMode: ord.paymentMethod,
      sellerDetails: {
        firmName: FIRM_DETAILS.name,
        subtitle: FIRM_DETAILS.tagline,
        address: FIRM_DETAILS.address,
        cityStateZip: FIRM_DETAILS.locality,
        stateCode: FIRM_DETAILS.stateCode,
        phone: FIRM_DETAILS.phones.join(" / "),
        email: FIRM_DETAILS.email,
        gstin: FIRM_DETAILS.gstin,
        pan: FIRM_DETAILS.pan,
        bankName: FIRM_DETAILS.bankDetails.bankName,
        accountNo: FIRM_DETAILS.bankDetails.accountNo,
        ifsc: FIRM_DETAILS.bankDetails.ifsc,
        branch: FIRM_DETAILS.bankDetails.branch
      }
    };

    setInvoices(prev => [newInvoice, ...prev]);
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, invoiceId: newInvoice.id } : o)));
    return newInvoice;
  };

  const getInvoiceById = (invoiceId: string) => {
    return invoices.find(i => i.id === invoiceId);
  };

  // Suppliers
  const addSupplier = (supData: Omit<Supplier, 'id'>): Supplier => {
    const newSup: Supplier = {
      ...supData,
      id: `sup-${Date.now()}`
    };
    setSuppliers(prev => [...prev, newSup]);
    return newSup;
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setSuppliers(INITIAL_SUPPLIERS);
    setOrders(INITIAL_ORDERS);
    setInvoices(INITIAL_INVOICES);
    setStockLogs(INITIAL_STOCK_LOGS);
    setCart([]);
    localStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        suppliers,
        orders,
        invoices,
        stockLogs,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        updateProductStock,
        addProduct,
        updateProduct,
        deleteProduct,
        lowStockProducts,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        generateInvoiceForOrder,
        getInvoiceById,
        addSupplier,
        updateSupplier,
        quickRestock,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

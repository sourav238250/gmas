export type Language = 'en' | 'bn';

export interface Translations {
  [key: string]: string;
  // Brand & Firm
  firmName: string;
  firmTagline: string;
  firmAddress: string;
  firmLocality: string;
  establishedText: string;
  orderCart: string;
  roleView: string;
  adminRole: string;
  supplierRole: string;
  customerRole: string;
  switchPersona: string;
  manageAccount: string;
  logout: string;
  signIn: string;
  lowStockAlertBadge: string;

  // Nav tabs
  navCatalog: string;
  navInventory: string;
  navReports: string;
  navSuppliers: string;
  navSupplierPortal: string;
  navInvoices: string;
  navCustomerPortal: string;

  // Catalog
  catalogTitle: string;
  catalogSubtitle: string;
  wholesaleTag: string;
  orderEnquiries: string;
  warehouseActive: string;
  searchPlaceholder: string;
  allCategories: string;
  allStockStatus: string;
  inStockOnly: string;
  lowStockOnly: string;
  mySuppliedOnly: string;
  showingItems: string;
  pricesExclusiveGst: string;
  inStock: string;
  lowStock: string;
  outOfStock: string;
  unitPrice: string;
  addToOrder: string;
  soldOut: string;
  currentlyInCart: string;
  viewSpecs: string;
  quickSpecs: string;
  noProductsFound: string;
  resetFilters: string;

  // Cart & Checkout
  cartTitle: string;
  checkoutTitle: string;
  successTitle: string;
  cartEmpty: string;
  cartEmptySub: string;
  browseCatalogBtn: string;
  taxableValue: string;
  cgstLabel: string;
  sgstLabel: string;
  totalInvoiceValue: string;
  clientName: string;
  phoneDispatch: string;
  companyName: string;
  gstinLabel: string;
  deliverySiteLocation: string;
  poNumberLabel: string;
  paymentMethodLabel: string;
  specialInstructions: string;
  immediateStockReservation: string;
  immediateStockNote: string;
  proceedToBilling: string;
  confirmOrderBtn: string;
  confirmingOrder: string;
  continueBrowsing: string;
  clearCart: string;
  backToCart: string;
  orderPlacedSuccess: string;
  viewPrintGstInvoice: string;
  trackInPortal: string;

  // Stock Dashboard
  stockManagementTitle: string;
  stockManagementSubtitle: string;
  stockDashboardTitle: string;
  stockDashboardSubtitle: string;
  addItemBtn: string;
  inventoryTable: string;
  auditLogsTab: string;
  lowStockAlertBanner: string;
  lowStockAlertSub: string;
  raisePoBtn: string;
  quickRestockBtn: string;
  thItemSpecs: string;
  thSkuHsn: string;
  thWarehouseRack: string;
  thCurrentStock: string;
  thMinSafeLevel: string;
  thBaseRate: string;
  thStockValue: string;
  thActions: string;
  addHardwareItem: string;
  inventoryTableTab: string;
  stockAuditLogsTab: string;
  criticalLowStockTitle: string;
  criticalLowStockDesc: string;
  raisePurchaseOrdersBtn: string;
  currentStock: string;
  minSafeLevel: string;
  restockBtn: string;
  adjustStockBtn: string;
  warehouseRack: string;
  stockValue: string;
  totalInventoryValuation: string;
  inwardBatchReceived: string;

  // Sales Reports
  salesReportsTitle: string;
  salesReportsSub: string;
  salesTurnoverTitle: string;
  salesSubtitle: string;
  grossTurnover: string;
  totalOrders: string;
  totalOrdersCount: string;
  paidSettled: string;
  tradeCredit: string;
  creditOutstanding: string;
  categoryTurnover: string;
  categoryTurnoverTitle: string;
  topSellingProducts: string;
  topSellingLinesTitle: string;
  recentSalesLedger: string;
  exportCsvBtn: string;
  thOrderPo: string;
  thDate: string;
  thClientOrg: string;
  thOrderItems: string;
  thTotalInclGst: string;
  thPaymentTerms: string;
  thStatus: string;
  thTaxInvoice: string;

  // Supplier Management
  supplierMgmtTitle: string;
  supplierMgmtSub: string;
  supplierNetworkTitle: string;
  supplierSubtitle: string;
  onboardSupplierBtn: string;
  suppliedLines: string;
  suppliedProductLines: string;
  ledgerBalanceDue: string;
  receiveRestockBatchBtn: string;
  inwardPurchaseOrderModal: string;

  // Invoices & Billing
  invoiceViewerTitle: string;
  invoiceViewerSub: string;
  printInvoiceBtn: string;
  viewInvoiceBtn: string;
  gstInvoicingTitle: string;
  gstInvoicingSubtitle: string;
  printOfficialInvoice: string;
  taxInvoiceRule: string;
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  orderRef: string;
  billedTo: string;
  descriptionOfGoods: string;
  bankDetailsHeading: string;
  grandTotalLabel: string;
  declarationHeading: string;
  authSignatory: string;
  markAsPaid: string;
  markAsUnpaid: string;

  // Customer Portal
  customerPortalTitle: string;
  customerPortalSub: string;
  newOrderBtn: string;
  clickToTrack: string;
  requestCustomQuote: string;
  requestCustomQuoteSub: string;
  indentSubmittedMsg: string;
  orderTrackingTimeline: string;
  milestoneProgression: string;
  deliveryLogisticsNotes: string;
  estimatedDelivery: string;
  orderedItems: string;
  stepPending: string;
  stepConfirmed: string;
  stepPacking: string;
  stepDispatched: string;
  stepDelivered: string;
  clientPortalTitle: string;
  clientPortalSubtitle: string;
  yourOrders: string;
  shipmentMilestones: string;
  reorderBtn: string;
  deliverySiteAddress: string;
  estimatedDeliveryLabel: string;
  requestCustomQuoteTitle: string;
  sendInquiryBtn: string;
  inquirySubmittedSuccess: string;

  // Auth
  roleAdmin: string;
  roleSupplier: string;
  roleCustomer: string;
  login: string;

  // Categories
  catFasteners: string;
  catValves: string;
  catWireRopes: string;
  catPowerTools: string;
  catSafety: string;
  catGeneral: string;

  // Footer
  footerAbout: string;
  footerRegOffice: string;
  footerBusinessPortals: string;
  footerCopyright: string;
  gstRegisteredMerchant: string;
  standardCompliant: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    firmName: "GUNADHAR MAITY & SONS",
    firmTagline: "Hardware Merchant & General Order Suppliers",
    firmAddress: "76/B Netaji Subhas Road",
    firmLocality: "Kolkata - 700 007, West Bengal",
    establishedText: "Est. 1974",
    orderCart: "Order Cart",
    roleView: "Role View",
    adminRole: "Admin (Proprietor)",
    supplierRole: "Supplier Partner",
    customerRole: "Client / Contractor",
    switchPersona: "Switch Active Persona",
    manageAccount: "Manage Account",
    logout: "Log Out",
    signIn: "Sign In",
    lowStockAlertBadge: "Low Stock Alert",

    navCatalog: "Product Catalog",
    navInventory: "Stock Management",
    navReports: "Sales Reports",
    navSuppliers: "Supplier Management",
    navSupplierPortal: "Supplier Portal",
    navInvoices: "GST Invoices & Billing",
    navCustomerPortal: "Client Order Tracking",

    catalogTitle: "Industrial Hardware & General Order Supplies",
    catalogSubtitle: "Serving structural fabricators, river dockyards, infrastructure contractors, and industrial plants across West Bengal. Real-time live inventory, certified HSN codes, and instant GST-compliant tax invoicing.",
    wholesaleTag: "Wholesale & Industrial Hardware Suppliers",
    orderEnquiries: "Order Enquiries / Urgent Dispatch",
    warehouseActive: "Warehouse Stock Active & Verified",
    searchPlaceholder: "Search by product name, bolt size, valve type, SKU, or HSN code...",
    allCategories: "All Categories",
    allStockStatus: "All Inventory Status",
    inStockOnly: "In Stock Only",
    lowStockOnly: "Low Stock Alerts Only",
    mySuppliedOnly: "My Supplied Lines Only",
    showingItems: "Showing items",
    pricesExclusiveGst: "All prices exclusive of GST (applied at checkout)",
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    unitPrice: "Unit Price",
    addToOrder: "Add to Order",
    soldOut: "Sold Out",
    currentlyInCart: "currently in cart",
    viewSpecs: "View Specifications & HSN",
    quickSpecs: "Quick Specs",
    noProductsFound: "No hardware products found",
    resetFilters: "Reset All Filters",

    cartTitle: "Client Hardware Order Placement",
    checkoutTitle: "Shipping & GST Billing Details",
    successTitle: "Order Confirmed & Invoice Issued",
    cartEmpty: "Your order cart is empty",
    cartEmptySub: "Browse our high-tensile bolts, industrial valves, wire ropes, and tools in the catalog.",
    browseCatalogBtn: "Browse Catalog",
    taxableValue: "Taxable Value (Subtotal)",
    cgstLabel: "CGST (Central Tax)",
    sgstLabel: "SGST (West Bengal State Tax - Code 19)",
    totalInvoiceValue: "Total Invoice Value (Incl. GST)",
    clientName: "Client Name / Representative",
    phoneDispatch: "Phone Number for Dispatch Alert",
    companyName: "Company / Contracting Firm",
    gstinLabel: "GSTIN (For 100% Tax Credit)",
    deliverySiteLocation: "Delivery Site / Unloading Location",
    poNumberLabel: "Purchase Order (PO) / Indent Ref #",
    paymentMethodLabel: "Payment Method / Terms",
    specialInstructions: "Special Instructions / Quality Remarks",
    immediateStockReservation: "Immediate Stock Reservation",
    immediateStockNote: "Warehouse stock will be instantly allocated & deducted upon order creation.",
    proceedToBilling: "Proceed to Billing",
    confirmOrderBtn: "Confirm Order & Issue GST Invoice",
    confirmingOrder: "Confirming Order...",
    continueBrowsing: "Continue Browsing",
    clearCart: "Clear Cart",
    backToCart: "Back to Cart",
    orderPlacedSuccess: "Hardware Order Placed Successfully!",
    viewPrintGstInvoice: "View & Print GST Tax Invoice",
    trackInPortal: "Track Order in Customer Portal",

    stockManagementTitle: "Warehouse Stock Management & Inventory Control",
    stockManagementSubtitle: "Real-time multi-location tracking, reorder thresholds, and bin allocations for Gunadhar Maity & Sons.",
    stockDashboardTitle: "Warehouse Stock Management & Inventory Control",
    stockDashboardSubtitle: "Real-time multi-location tracking, reorder thresholds, and bin allocations for Gunadhar Maity & Sons.",
    addItemBtn: "Add Hardware Item",
    inventoryTable: "Live Hardware Inventory",
    auditLogsTab: "Stock Audit Logs",
    lowStockAlertBanner: "Critical Low Stock Alert",
    lowStockAlertSub: "Inventory levels are approaching minimum safety limits. Initiate immediate supplier replenishment.",
    raisePoBtn: "Raise Purchase Orders",
    quickRestockBtn: "Restock",
    thItemSpecs: "Item & Specifications",
    thSkuHsn: "SKU / HSN",
    thWarehouseRack: "Warehouse Rack",
    thCurrentStock: "Current Stock",
    thMinSafeLevel: "Min Safe Level",
    thBaseRate: "Base Rate (₹)",
    thStockValue: "Stock Value (₹)",
    thActions: "Actions",
    addHardwareItem: "Add Hardware Item",
    inventoryTableTab: "Inventory Table",
    stockAuditLogsTab: "Stock Audit Logs",
    criticalLowStockTitle: "Critical Low Stock Alert",
    criticalLowStockDesc: "Inventory levels are approaching minimum safety limits. Initiate immediate supplier replenishment.",
    raisePurchaseOrdersBtn: "Raise Purchase Orders",
    currentStock: "Current Stock",
    minSafeLevel: "Min Safe Level",
    restockBtn: "Restock",
    adjustStockBtn: "Adjust Stock",
    warehouseRack: "Warehouse Rack",
    stockValue: "Stock Value",
    totalInventoryValuation: "Total Inventory Valuation",
    inwardBatchReceived: "Inward restock batch received",

    salesReportsTitle: "Sales Performance & Turnover Reports",
    salesReportsSub: "Financial analytics, credit realization, and category turnover for Gunadhar Maity & Sons.",
    salesTurnoverTitle: "Sales Performance & Turnover Reports",
    salesSubtitle: "Financial analytics, credit realization, and category turnover for Gunadhar Maity & Sons.",
    grossTurnover: "Gross Turnover",
    totalOrders: "Total Orders",
    totalOrdersCount: "Total Orders",
    paidSettled: "Paid / Settled",
    tradeCredit: "30-Day Trade Credit",
    creditOutstanding: "30-Day Trade Credit",
    categoryTurnover: "Revenue by Hardware Classification",
    categoryTurnoverTitle: "Revenue by Hardware Classification",
    topSellingProducts: "Top Selling Hardware Lines",
    topSellingLinesTitle: "Top Selling Hardware Lines",
    recentSalesLedger: "Recent Customer Sales Ledger",
    exportCsvBtn: "Export CSV",
    thOrderPo: "Order & PO",
    thDate: "Date",
    thClientOrg: "Client / Organization",
    thOrderItems: "Hardware Items",
    thTotalInclGst: "Total (Incl GST)",
    thPaymentTerms: "Payment Terms",
    thStatus: "Status",
    thTaxInvoice: "Tax Invoice",

    supplierMgmtTitle: "Supplier Network & Procurement Management",
    supplierMgmtSub: "Managing verified manufacturers, stockists in Burrabazar, and procurement orders for Gunadhar Maity & Sons.",
    supplierNetworkTitle: "Supplier Network & Procurement Management",
    supplierSubtitle: "Managing verified manufacturers, stockists in Burrabazar, and procurement orders for Gunadhar Maity & Sons.",
    onboardSupplierBtn: "Onboard New Supplier",
    suppliedLines: "Supplied Hardware Product Lines",
    suppliedProductLines: "Supplied Hardware Product Lines",
    ledgerBalanceDue: "Ledger Balance Due",
    receiveRestockBatchBtn: "Receive Restock Batch",
    inwardPurchaseOrderModal: "Inward Restock Purchase Order",

    invoiceViewerTitle: "Tax Invoice & Official Billing Document",
    invoiceViewerSub: "Standard GST compliant tax invoice issued under Rule 46 of CGST Rules, 2017.",
    printInvoiceBtn: "Print Official Invoice",
    viewInvoiceBtn: "View Tax Invoice",
    gstInvoicingTitle: "GST Tax Invoicing & Automated Billing",
    gstInvoicingSubtitle: "Official GST-compliant tax invoices, e-way bill references, and input tax credit (ITC) documentation.",
    printOfficialInvoice: "Print Official Invoice",
    taxInvoiceRule: "TAX INVOICE (RULE 46 OF CGST RULES, 2017)",
    invoiceNo: "Invoice No",
    invoiceDate: "Invoice Date",
    dueDate: "Due Date",
    orderRef: "Order Ref",
    billedTo: "Details of Receiver (Billed To)",
    descriptionOfGoods: "Description of Hardware Goods",
    bankDetailsHeading: "Bank Details for Electronic NEFT / RTGS / UPI",
    grandTotalLabel: "Grand Total (Invoice Value)",
    declarationHeading: "Declaration",
    authSignatory: "Authorised Signatory / Partner",
    markAsPaid: "Mark as Paid",
    markAsUnpaid: "Mark as Unpaid",

    customerPortalTitle: "Client Portal & Live Order Tracking",
    customerPortalSub: "Tracking shipments from Gunadhar Maity & Sons warehouse to your Kolkata & Howrah project sites.",
    newOrderBtn: "New Order from Catalog",
    clickToTrack: "Click to track",
    requestCustomQuote: "Request Custom Hardware Quote",
    requestCustomQuoteSub: "Non-catalog general order supply indents",
    indentSubmittedMsg: "Indent submitted! Our sales desk at Netaji Subhas Road will review and call you shortly.",
    orderTrackingTimeline: "Order Tracking & Dispatch Timeline",
    milestoneProgression: "Shipment Milestone Progression",
    deliveryLogisticsNotes: "Delivery Logistics & Notes",
    estimatedDelivery: "Estimated Delivery",
    orderedItems: "Hardware Items Ordered",
    stepPending: "Order Received",
    stepConfirmed: "Confirmed",
    stepPacking: "Packing & Inspection",
    stepDispatched: "Dispatched",
    stepDelivered: "Delivered at Site",
    clientPortalTitle: "Client Portal & Live Order Tracking",
    clientPortalSubtitle: "Tracking shipments from Gunadhar Maity & Sons warehouse to your Kolkata & Howrah project sites.",
    yourOrders: "Your Orders",
    shipmentMilestones: "Shipment Milestone Progression",
    reorderBtn: "Reorder",
    deliverySiteAddress: "Delivery Site Address",
    estimatedDeliveryLabel: "Estimated Delivery",
    requestCustomQuoteTitle: "Request Custom Hardware Quote",
    sendInquiryBtn: "Send Inquiry to Gunadhar Maity",
    inquirySubmittedSuccess: "Indent submitted! Our sales desk at Netaji Subhas Road will review and call you shortly.",

    roleAdmin: "Admin (Proprietor)",
    roleSupplier: "Supplier Partner",
    roleCustomer: "Customer / Client",
    login: "Sign In",

    catFasteners: "Fasteners & Bolts",
    catValves: "Valves & Pipe Fittings",
    catWireRopes: "Wire Ropes & Rigging",
    catPowerTools: "Power Tools & Abrasives",
    catSafety: "Industrial Safety",
    catGeneral: "General Hardware",

    footerAbout: "Premier suppliers of high-tensile fasteners, valves, wire ropes, power tools, and industrial order supplies to fabrication units, ports, and construction engineering companies across Eastern India.",
    footerRegOffice: "Kolkata Registered Office",
    footerBusinessPortals: "Business Portals",
    footerCopyright: "© 2026 GUNADHAR MAITY & SONS. All Rights Reserved. General Order Suppliers, Kolkata.",
    gstRegisteredMerchant: "GST Registered Merchant",
    standardCompliant: "IS / DIN Compliant Hardware"
  },
  bn: {
    firmName: "গুণধর মাইতি অ্যান্ড সনস",
    firmTagline: "হার্ডওয়্যার মার্চেন্ট ও জেনারেল অর্ডার সাপ্লায়ার্স",
    firmAddress: "৭৬/বি নেতাজী সুভাষ রোড",
    firmLocality: "কলকাতা - ৭০০ ০০৭, পশ্চিমবঙ্গ",
    establishedText: "স্থাপিত ১৯৭৪",
    orderCart: "অর্ডার কার্ট",
    roleView: "ভূমিকা পরিবর্তন",
    adminRole: "অ্যাডমিন (মালিক)",
    supplierRole: "সরবরাহকারী অংশীদার",
    customerRole: "ক্রেতা / ঠিকাদার",
    switchPersona: "সক্রিয় ব্যবহারকারী পরিবর্তন করুন",
    manageAccount: "অ্যাকাউন্ট পরিচালনা",
    logout: "লগ আউট",
    signIn: "লগ ইন করুন",
    lowStockAlertBadge: "কম মজুত সতর্কতা",

    navCatalog: "পণ্যের ক্যাটালগ",
    navInventory: "স্টক ব্যবস্থাপনা",
    navReports: "বিক্রয় রিপোর্ট ও হিসাব",
    navSuppliers: "সরবরাহকারী তালিকা",
    navSupplierPortal: "সাপ্লায়ার পোর্টাল",
    navInvoices: "জিএসটি ট্যাক্স ইনভয়েস",
    navCustomerPortal: "অর্ডার ট্র্যাকিং ও পোর্টাল",

    catalogTitle: "শিল্পোদ্যোগ হার্ডওয়্যার ও জেনারেল অর্ডার সরবরাহ",
    catalogSubtitle: "পশ্চিমবঙ্গ জুড়ে স্ট্রাকচারাল ফেব্রিকেটর, রিভার ডকইয়ার্ড, নির্মাণ ঠিকাদার ও শিল্প কারখানার বিশ্বস্ত সরবরাহকারী। রিয়েল-টাইম লাইভ স্টক, সার্টিফাইড এইচএসএন কোড এবং তাত্ক্ষণিক জিএসটি ট্যাক্স ইনভয়েস সুবিধা।",
    wholesaleTag: "পাইকারি ও শিল্প হার্ডওয়্যার মার্চেন্ট",
    orderEnquiries: "অর্ডার ও জরুরি অনুসন্ধানের ফোন নম্বর",
    warehouseActive: "গুদামজাত স্টক সক্রিয় ও পরীক্ষিত",
    searchPlaceholder: "পণ্যের নাম, বোল্টের মাপ, ভালভ, এসকেইউ বা এইচএসএন কোড দিয়ে খুঁজুন...",
    allCategories: "সকল ক্যাটাগরি",
    allStockStatus: "সকল স্টক অবস্থা",
    inStockOnly: "মজুত আছে কেবল সেগুলি",
    lowStockOnly: "কম মজুত সতর্কতা যুক্ত পণ্য",
    mySuppliedOnly: "আমার সরবরাহকৃত পণ্যসমূহ",
    showingItems: "পণ্য প্রদর্শিত হচ্ছে",
    pricesExclusiveGst: "সমস্ত মূল্য জিএসটি ছাড়া (চেকআউটে জিএসটি যোগ করা হবে)",
    inStock: "মজুত আছে",
    lowStock: "কম মজুত",
    outOfStock: "স্টক শেষ",
    unitPrice: "প্রতি ইউনিটের দাম",
    addToOrder: "অর্ডারে যোগ করুন",
    soldOut: "স্টক নিঃশেষ",
    currentlyInCart: "বর্তমানে কার্টে রয়েছে",
    viewSpecs: "প্রযুক্তিগত বিবরণ ও এইচএসএন",
    quickSpecs: "সংক্ষিপ্ত বিবরণ",
    noProductsFound: "কোনো হার্ডওয়্যার পণ্য খুঁজে পাওয়া যায়নি",
    resetFilters: "ফিল্টার রিসেট করুন",

    cartTitle: "ক্লায়েন্ট হার্ডওয়্যার অর্ডার প্রক্রিয়া",
    checkoutTitle: "ডেলিভারি ও জিএসটি বিলিং বিবরণ",
    successTitle: "অর্ডার নিশ্চিত ও ইনভয়েস প্রস্তুত",
    cartEmpty: "আপনার অর্ডার কার্ট খালি রয়েছে",
    cartEmptySub: "ক্যাটালগ থেকে হাই-টেনসিল বোল্ট, শিল্প ভালভ, স্টিল ওয়্যার রোপ বা কাটিং টুলস যোগ করুন।",
    browseCatalogBtn: "ক্যাটালগ ব্রাউজ করুন",
    taxableValue: "করযোগ্য মূল্য (সাবটোটাল)",
    cgstLabel: "সিজিএসটি (CGST - কেন্দ্রীয় কর)",
    sgstLabel: "এসজিএসটি (SGST - পশ্চিমবঙ্গ রাজ্য কর ১৯)",
    totalInvoiceValue: "সর্বমোট ইনভয়েস মূল্য (জিএসটি সহ)",
    clientName: "ক্রেতার নাম / প্রতিনিধির নাম",
    phoneDispatch: "ডেলিভারি ট্র্যাকিং মোবাইল নম্বর",
    companyName: "কোম্পানি / কনস্ট্রাকশন ফার্ম",
    gstinLabel: "জিএসটিআইএন (GSTIN - ইনপুট ট্যাক্স ক্রেডিটের জন্য)",
    deliverySiteLocation: "সাইট ডেলিভারি / আনলোডিং ঠিকানা",
    poNumberLabel: "পারচেজ অর্ডার (PO) / ইনডেন্ট নম্বর",
    paymentMethodLabel: "মূল্য পরিশোধের মাধ্যম / শর্তাবলী",
    specialInstructions: "বিশেষ নির্দেশাবলী / টেস্টিং সার্টিফিকেট নির্দেশ",
    immediateStockReservation: "তাত্ক্ষণিক গুদামজাত স্টক বরাদ্দ",
    immediateStockNote: "অর্ডার নিশ্চিত হওয়ামাত্রই গুদাম থেকে পণ্যের পরিমাণ বিয়োগ হয়ে সংরক্ষিত হবে।",
    proceedToBilling: "বিলিং ও চেকআউটে যান",
    confirmOrderBtn: "অর্ডার নিশ্চিত করুন ও জিএসটি ইনভয়েস তৈরি করুন",
    confirmingOrder: "অর্ডার প্রক্রিয়াধীন...",
    continueBrowsing: "আরও কেনাকাটা করুন",
    clearCart: "কার্ট খালি করুন",
    backToCart: "কার্টে ফিরে যান",
    orderPlacedSuccess: "হার্ডওয়্যার অর্ডার সফলভাবে নিশ্চিত হয়েছে!",
    viewPrintGstInvoice: "জিএসটি ট্যাক্স ইনভয়েস দেখুন ও প্রিন্ট করুন",
    trackInPortal: "অর্ডার ট্র্যাকিং পোর্টালে যান",

    stockManagementTitle: "গুদাম স্টক ব্যবস্থাপনা ও ইনভেন্টরি কন্ট্রোল",
    stockManagementSubtitle: "গুণধর মাইতি অ্যান্ড সনস-এর রিয়েল-টাইম গুদাম ট্র্যাকিং, রিঅর্ডার সীমা এবং বিন অবস্থান।",
    stockDashboardTitle: "গুদাম স্টক ব্যবস্থাপনা ও ইনভেন্টরি কন্ট্রোল",
    stockDashboardSubtitle: "গুণধর মাইতি অ্যান্ড সনস-এর রিয়েল-টাইম গুদাম ট্র্যাকিং, রিঅর্ডার সীমা এবং বিন অবস্থান।",
    addItemBtn: "নতুন হার্ডওয়্যার পণ্য যোগ করুন",
    inventoryTable: "লাইভ হার্ডওয়্যার ইনভেন্টরি",
    auditLogsTab: "স্টক অডিট রেজিস্টার",
    lowStockAlertBanner: "জরুরি কম মজুত সতর্কতা",
    lowStockAlertSub: "নিম্নলিখিত পণ্যগুলির স্টক ন্যূনতম সীমার নিচে নেমে গেছে। অবিলম্বে সরবরাহকারীর কাছে রিকুইজিশন পাঠান।",
    raisePoBtn: "পারচেজ অর্ডার ইস্যু করুন",
    quickRestockBtn: "রিস্টক করুন",
    thItemSpecs: "পণ্য ও স্পেসিফিকেশন",
    thSkuHsn: "SKU / HSN কোড",
    thWarehouseRack: "গুদাম র্যাক / বিন",
    thCurrentStock: "বর্তমান স্টক",
    thMinSafeLevel: "ন্যূনতম নিরাপদ মাত্রা",
    thBaseRate: "একক দর (₹)",
    thStockValue: "স্টক মূল্য (₹)",
    thActions: "অ্যাকশন",
    addHardwareItem: "নতুন হার্ডওয়্যার পণ্য যোগ করুন",
    inventoryTableTab: "ইনভেন্টরি তালিকা",
    stockAuditLogsTab: "স্টক অডিট রেজিস্টার",
    criticalLowStockTitle: "জরুরি কম মজুত সতর্কতা",
    criticalLowStockDesc: "নিম্নলিখিত পণ্যগুলির স্টক ন্যূনতম সীমার নিচে নেমে গেছে। অবিলম্বে সরবরাহকারীর কাছে রিকুইজিশন পাঠান।",
    raisePurchaseOrdersBtn: "পারচেজ অর্ডার ইস্যু করুন",
    currentStock: "বর্তমান স্টক",
    minSafeLevel: "ন্যূনতম নিরাপদ মাত্রা",
    restockBtn: "রিস্টক করুন",
    adjustStockBtn: "স্টক সমন্বয়",
    warehouseRack: "গুদাম র্যাক / বিন",
    stockValue: "মোট পণ্যের মূল্য",
    totalInventoryValuation: "গুদামের মোট ইনভেন্টরি মূল্যায়ন",
    inwardBatchReceived: "ইনওয়ার্ড রিস্টক ব্যাচ গ্রহণ করা হয়েছে",

    salesReportsTitle: "বিক্রয় পর্যালোচনা ও ব্যবসায়িক হিসাব",
    salesReportsSub: "গুণধর মাইতি অ্যান্ড সনস-এর মোট রাজস্ব, বকেয়া ক্রেডিট ও ক্যাটাগরি অনুযায়ী টার্নওভার বিশ্লেষণ।",
    salesTurnoverTitle: "বিক্রয় পর্যালোচনা ও ব্যবসায়িক হিসাব",
    salesSubtitle: "গুণধর মাইতি অ্যান্ড সনস-এর মোট রাজস্ব, বকেয়া ক্রেডিট ও ক্যাটাগরি অনুযায়ী টার্নওভার বিশ্লেষণ।",
    grossTurnover: "মোট টার্নওভার",
    totalOrders: "মোট অর্ডার সংখ্যা",
    totalOrdersCount: "মোট অর্ডার সংখ্যা",
    paidSettled: "পরিশোধিত অর্থ",
    tradeCredit: "৩০ দিনের বকেয়া বাণিজ্য ক্রেডিট",
    creditOutstanding: "৩০ দিনের বকেয়া বাণিজ্য ক্রেডিট",
    categoryTurnover: "হার্ডওয়্যার ক্যাটাগরি ভিত্তিক আয়",
    categoryTurnoverTitle: "হার্ডওয়্যার ক্যাটাগরি ভিত্তিক আয়",
    topSellingProducts: "শীর্ষ বিক্রীত হার্ডওয়্যার পণ্যসমূহ",
    topSellingLinesTitle: "শীর্ষ বিক্রীত হার্ডওয়্যার পণ্যসমূহ",
    recentSalesLedger: "সাম্প্রতিক ক্লায়েন্ট সেলস রেজিস্টার",
    exportCsvBtn: "সিএসভি রিপোর্ট ডাউনলোড",
    thOrderPo: "অর্ডার ও পিও",
    thDate: "তারিখ",
    thClientOrg: "ক্লায়েন্ট / সংস্থা",
    thOrderItems: "হার্ডওয়্যার আইটেম",
    thTotalInclGst: "মোট (জিএসটি সহ)",
    thPaymentTerms: "পেমেন্ট শর্তাবলী",
    thStatus: "স্থিতি",
    thTaxInvoice: "ট্যাক্স ইনভয়েস",

    supplierMgmtTitle: "সরবরাহকারী নেটওয়ার্ক ও প্রকিউরমেন্ট",
    supplierMgmtSub: "বড়বাজার, স্ট্র্যান্ড রোড ও ক্যানিং স্ট্রিটের বিশ্বস্ত নির্মাতা ও সরবরাহকারী তালিকা।",
    supplierNetworkTitle: "সরবরাহকারী নেটওয়ার্ক ও প্রকিউরমেন্ট",
    supplierSubtitle: "বড়বাজার, স্ট্র্যান্ড রোড ও ক্যানিং স্ট্রিটের বিশ্বস্ত নির্মাতা ও সরবরাহকারী তালিকা।",
    onboardSupplierBtn: "নতুন সরবরাহকারী যুক্ত করুন",
    suppliedLines: "সরবরাহকৃত হার্ডওয়্যার পণ্যসমূহ",
    suppliedProductLines: "সরবরাহকৃত হার্ডওয়্যার পণ্যসমূহ",
    ledgerBalanceDue: "লেজার বকেয়া পাওনা",
    receiveRestockBatchBtn: "রিস্টক চালান গ্রহণ করুন",
    inwardPurchaseOrderModal: "ইনওয়ার্ড রিস্টক পারচেজ অর্ডার",

    invoiceViewerTitle: "ট্যাক্স ইনভয়েস ও প্রাতিষ্ঠানিক বিলিং নথি",
    invoiceViewerSub: "CGST রুলস, ২০১৭ এর রুল ৪৬ অনুসারে জারি করা অনুমোদিত ট্যাক্স ইনভয়েস।",
    printInvoiceBtn: "অফিসিয়াল ইনভয়েস প্রিন্ট করুন",
    viewInvoiceBtn: "ট্যাক্স চালান দেখুন",
    gstInvoicingTitle: "জিএসটি ট্যাক্স ইনভয়েস ও স্বয়ংক্রিয় বিলিং",
    gstInvoicingSubtitle: "সরকারি জিএসটি নিয়মাবলী (রুল ৪৬) মেনে প্রাতিষ্ঠানিক ট্যাক্স ইনভয়েস এবং আইটিসি নথি।",
    printOfficialInvoice: "অফিসিয়াল ইনভয়েস প্রিন্ট করুন",
    taxInvoiceRule: "ট্যাক্স ইনভয়েস (CGST রুলস, ২০১৭ এর রুল ৪৬ অনুসারে)",
    invoiceNo: "ইনভয়েস নম্বর",
    invoiceDate: "ইনভয়েসের তারিখ",
    dueDate: "পরিশোধের শেষ তারিখ",
    orderRef: "অর্ডার রেফারেন্স",
    billedTo: "প্রাপকের বিবরণ (বিল প্রাপক)",
    descriptionOfGoods: "হার্ডওয়্যার পণ্যের বিবরণ",
    bankDetailsHeading: "ব্যাংক অ্যাকাউন্ট ও অনলাইন আরটিজিএস / ইউপিআই বিবরণ",
    grandTotalLabel: "সর্বমোট প্রদেয় মূল্য (Grand Total)",
    declarationHeading: "ঘোষণাপত্র",
    authSignatory: "অনুমোদিত স্বাক্ষরকারী / অংশীদার",
    markAsPaid: "পরিশোধিত হিসেবে চিহ্নিত করুন",
    markAsUnpaid: "বকেয়া (ক্রেডিট) হিসেবে চিহ্নিত করুন",

    customerPortalTitle: "ক্লায়েন্ট পোর্টাল ও লাইভ অর্ডার ট্র্যাকিং",
    customerPortalSub: "গুণধর মাইতি অ্যান্ড সনস গুদাম থেকে আপনার কলকাতা ও হাওড়ার প্রজেক্ট সাইটে ডেলিভারি ট্র্যাকিং।",
    newOrderBtn: "ক্যাটালগ থেকে নতুন অর্ডার",
    clickToTrack: "ট্র্যাকিং দেখতে ক্লিক করুন",
    requestCustomQuote: "কাস্টম হার্ডওয়্যার কোটেশন অনুরোধ",
    requestCustomQuoteSub: "তালিকার বাইরের যেকোনো হার্ডওয়্যার পণ্যের জন্য ইনডেন্ট পাঠান",
    indentSubmittedMsg: "আপনার অনুরোধ গৃহীত হয়েছে! আমাদের নেতাজী সুভাষ রোডের বিক্রয় প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।",
    orderTrackingTimeline: "অর্ডার ট্র্যাকিং ও ডেলিভারি টাইমলাইন",
    milestoneProgression: "ডেলিভারি প্রক্রিয়ার পর্যায়ক্রম",
    deliveryLogisticsNotes: "ডেলিভারি লজিস্টিকস ও বিবরণ",
    estimatedDelivery: "সম্ভাব্য ডেলিভারি",
    orderedItems: "অর্ডারকৃত হার্ডওয়্যার আইটেম",
    stepPending: "অর্ডার গৃহীত",
    stepConfirmed: "অনুমোদিত",
    stepPacking: "প্যাকিং ও পরীক্ষণ",
    stepDispatched: "পাঠানো হয়েছে",
    stepDelivered: "সাইটে পৌঁছেছে",
    clientPortalTitle: "ক্লায়েন্ট পোর্টাল ও লাইভ অর্ডার ট্র্যাকিং",
    clientPortalSubtitle: "গুণধর মাইতি অ্যান্ড সনস গুদাম থেকে আপনার কলকাতা ও হাওড়ার প্রজেক্ট সাইটে ডেলিভারি ট্র্যাকিং।",
    yourOrders: "আপনার পূর্ববর্তী অর্ডারসমূহ",
    shipmentMilestones: "ডেলিভারি প্রক্রিয়ার পর্যায়ক্রম",
    reorderBtn: "পুনরায় অর্ডার করুন",
    deliverySiteAddress: "ডেলিভারি প্রজেক্ট সাইট",
    estimatedDeliveryLabel: "সম্ভাব্য ডেলিভারি তারিখ",
    requestCustomQuoteTitle: "কাস্টম হার্ডওয়্যার কোটেশন অনুরোধ",
    sendInquiryBtn: "গুণধর মাইতি অ্যান্ড সনস-এ পাঠান",
    inquirySubmittedSuccess: "আপনার অনুরোধ গৃহীত হয়েছে! আমাদের নেতাজী সুভাষ রোডের বিক্রয় প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।",

    roleAdmin: "অ্যাডমিন (মালিকপক্ষ)",
    roleSupplier: "সরবরাহকারী পার্টনার",
    roleCustomer: "গ্রাহক / কনট্রাক্টর",
    login: "প্রবেশ করুন",

    catFasteners: "নাট, বোল্ট ও ফাস্টেনার্স",
    catValves: "ভালভ ও পাইপ ফিটিংস",
    catWireRopes: "স্টিল ওয়্যার রোপ ও রিগিং",
    catPowerTools: "পাওয়ার টুলস ও কাটিং হুইল",
    catSafety: "শিল্প নিরাপত্তা সরঞ্জাম",
    catGeneral: "সাধারণ হার্ডওয়্যার ও ক্ল্যাম্প",

    footerAbout: "পূর্ব ভারতের ফেব্রিকেশন ওয়ার্কশপ, জাহাজ ডক ও কনস্ট্রাকশন ইঞ্জিনিয়ারিং প্রজেক্টে উচ্চমানের ফাস্টেনার্স, পাইপ ভালভ, ওয়্যার রোপ ও জেনারেল অর্ডারের বিশ্বস্ত সরবরাহকারী প্রতিষ্ঠান।",
    footerRegOffice: "কলকাতা প্রধান কার্যালয়",
    footerBusinessPortals: "ওয়েব পোর্টালসমূহ",
    footerCopyright: "© ২০২৬ গুণধর মাইতি অ্যান্ড সনস। সর্বস্বত্ব সংরক্ষিত। জেনারেল অর্ডার সাপ্লায়ার্স, কলকাতা।",
    gstRegisteredMerchant: "জিএসটি নিবন্ধিত মার্চেন্ট",
    standardCompliant: "আইএস / ডিন স্ট্যান্ডার্ড হার্ডওয়্যার"
  }
};

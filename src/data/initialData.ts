import { Product, Supplier, Order, Invoice, User, StockLog } from '../types/index.ts';

export const FIRM_DETAILS = {
  name: "GUNADHAR MAITY & SONS",
  tagline: "Hardware Merchant & General Order Suppliers",
  established: "Est. 1974",
  address: "76/B Netaji Subhas Road",
  locality: "Kolkata - 700 007, West Bengal, India",
  phones: ["+91 98366 80161", "+91 97751 29654"],
  email: "sales.gunadharmaity@gmail.com",
  gstin: "19AABCG1234F1Z8",
  pan: "AABCG1234F",
  stateCode: "19 (West Bengal)",
  bankDetails: {
    bankName: "State Bank of India",
    accountNo: "30281948572",
    ifsc: "SBIN0000001",
    branch: "Kolkata Main Branch, Strand Road",
    upiId: "9836680161@sbi"
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: "usr-admin",
    name: "Subrata Maity",
    email: "admin@gunadharmaity.com",
    role: "admin",
    phone: "9836680161",
    companyName: "Gunadhar Maity & Sons",
    address: "76/B Netaji Subhas Road, Kolkata-700 007",
    gstin: "19AABCG1234F1Z8"
  },
  {
    id: "usr-supplier-1",
    name: "Rajesh Agarwal",
    email: "rajesh@tatasteelfasteners.com",
    role: "supplier",
    phone: "9831098221",
    companyName: "Tata Steel & Industrial Fasteners",
    supplierId: "sup-1",
    address: "43 Strand Road, Burrabazar, Kolkata-700001",
    gstin: "19AAACT2941E1ZT"
  },
  {
    id: "usr-supplier-2",
    name: "Debashis Mukherjee",
    email: "debashis@ushawirerope.com",
    role: "supplier",
    phone: "9433129845",
    companyName: "Usha Martin Rigging & Wire Rope Agency",
    supplierId: "sup-2",
    address: "14 Pollock Street, Kolkata-700001",
    gstin: "19AABUM7721H1ZQ"
  },
  {
    id: "usr-customer-1",
    name: "Amitava Roy (Roy Infra)",
    email: "procurement@royinfra.com",
    role: "customer",
    phone: "9830114522",
    companyName: "Bengal Bridge & Infrastructure Ltd.",
    address: "Sector V, Salt Lake, Kolkata-700091",
    gstin: "19AAACB9012K1Z5"
  },
  {
    id: "usr-customer-2",
    name: "Gautam Sengupta",
    email: "gautam.fab@gmail.com",
    role: "customer",
    phone: "9831987654",
    companyName: "Hooghly Ship Repair & Marine Fabrication",
    address: "Dock Eastern Gate, Garden Reach, Kolkata-700024",
    gstin: "19AAAFH3341P1Z9"
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    name: "Tata Steel & Industrial Fasteners Ltd.",
    contactPerson: "Rajesh Agarwal",
    email: "rajesh@tatasteelfasteners.com",
    phone: "9831098221",
    address: "43 Strand Road, Burrabazar, Kolkata-700001",
    gstin: "19AAACT2941E1ZT",
    categories: ["Fasteners & Bolts", "General Hardware"],
    rating: 4.8,
    paymentTerms: "30 Days Net",
    balanceDue: 45000
  },
  {
    id: "sup-2",
    name: "Usha Martin Rigging & Wire Rope Agency",
    contactPerson: "Debashis Mukherjee",
    email: "debashis@ushawirerope.com",
    phone: "9433129845",
    address: "14 Pollock Street, Kolkata-700001",
    gstin: "19AABUM7721H1ZQ",
    categories: ["Wire Ropes & Rigging"],
    rating: 4.9,
    paymentTerms: "45 Days Net",
    balanceDue: 82000
  },
  {
    id: "sup-3",
    name: "Kirloskar & Leader Valve Distributors",
    contactPerson: "Bikash Ghosh",
    email: "leadervalves.kol@gmail.com",
    phone: "9830234567",
    address: "28 Brabourne Road, Kolkata-700001",
    gstin: "19AABCK4490M1Z2",
    categories: ["Valves & Pipe Fittings"],
    rating: 4.7,
    paymentTerms: "15 Days Net",
    balanceDue: 18500
  },
  {
    id: "sup-4",
    name: "Bosch & Dewalt Power Equipment Corp",
    contactPerson: "Snehasish Das",
    email: "snehasish@boschtools-east.in",
    phone: "9836543210",
    address: "102 Canning Street, Kolkata-700001",
    gstin: "19AABBD8812N1Z4",
    categories: ["Power Tools & Abrasives", "Industrial Safety"],
    rating: 4.9,
    paymentTerms: "Immediate Bank Transfer",
    balanceDue: 0
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Grade 8.8 High-Tensile Hex Bolt (M16 x 65mm)",
    category: "Fasteners & Bolts",
    sku: "HTB-M16-65",
    hsnCode: "7318",
    description: "Cold-forged carbon steel high-tensile bolt with zinc phosphate finish, suited for heavy structural fabrication & crane girders.",
    specs: {
      "Grade": "8.8 Heavy Duty",
      "Material": "Carbon Alloy Steel",
      "Size": "M16 x 65mm",
      "Pitch": "2.0 mm",
      "Standard": "IS 1364 / DIN 933"
    },
    unit: "Kg",
    price: 135,
    mrp: 165,
    gstRate: 18,
    stock: 240,
    minStockLevel: 50,
    supplierId: "sup-1",
    supplierName: "Tata Steel & Industrial Fasteners Ltd.",
    imageUrl: "/src/assets/images/product_fasteners_1790218779346.jpg",
    locationRack: "Aisle A-02 / Bin 14",
    lastRestocked: "2026-09-10"
  },
  {
    id: "prod-2",
    name: "Stainless Steel 304 Hex Nut & Washer Combo (M12)",
    category: "Fasteners & Bolts",
    sku: "SSN-M12-SET",
    hsnCode: "7318",
    description: "Marine-grade AISI 304 anti-corrosion hex nuts with matching spring washers for chemical plants and ship docks.",
    specs: {
      "Grade": "SS-304 (A2-70)",
      "Thread": "M12 Coarse",
      "Finish": "Electropolished Bright",
      "Standard": "DIN 934 & DIN 127"
    },
    unit: "Box",
    price: 680,
    mrp: 820,
    gstRate: 18,
    stock: 18, // LOW STOCK
    minStockLevel: 25,
    supplierId: "sup-1",
    supplierName: "Tata Steel & Industrial Fasteners Ltd.",
    imageUrl: "/src/assets/images/product_fasteners_1790218779346.jpg",
    locationRack: "Aisle A-03 / Bin 08",
    lastRestocked: "2026-08-20"
  },
  {
    id: "prod-3",
    name: "Industrial Stainless Steel 316 Flanged Ball Valve 2-Inch (50mm)",
    category: "Valves & Pipe Fittings",
    sku: "VAL-SS-BV50",
    hsnCode: "8481",
    description: "Full-bore 3-piece flanged ball valve with PTFE seat, designed for steam, hydraulic oil, and high pressure fluids up to 40 Bar.",
    specs: {
      "Size": "2\" (50mm NB)",
      "Body Material": "CF8M / SS-316",
      "Pressure Rating": "Class 150 / PN40",
      "End Connection": "Flanged ANSI B16.5",
      "Operation": "Manual Lever with Lock"
    },
    unit: "Pcs",
    price: 3450,
    mrp: 4200,
    gstRate: 18,
    stock: 12,
    minStockLevel: 10,
    supplierId: "sup-3",
    supplierName: "Kirloskar & Leader Valve Distributors",
    imageUrl: "/src/assets/images/product_valves_1790218792671.jpg",
    locationRack: "Aisle B-01 / Rack 04",
    lastRestocked: "2026-09-02"
  },
  {
    id: "prod-4",
    name: "Forged Heavy Duty Cast Iron Gate Valve (100mm / 4-Inch)",
    category: "Valves & Pipe Fittings",
    sku: "VAL-CI-GV100",
    hsnCode: "8481",
    description: "Rising stem cast iron industrial gate valve with gunmetal internals, bronze trim, for municipal & factory water pipelines.",
    specs: {
      "Size": "4\" (100mm NB)",
      "Body Material": "Cast Iron FG 220",
      "Seat Trim": "Leaded Gunmetal IS:318",
      "Pressure Test": "Hydraulic Body 1.5 MPa",
      "Standard": "IS: 778 Class 1"
    },
    unit: "Pcs",
    price: 5200,
    mrp: 6400,
    gstRate: 18,
    stock: 4, // CRITICAL LOW STOCK
    minStockLevel: 8,
    supplierId: "sup-3",
    supplierName: "Kirloskar & Leader Valve Distributors",
    imageUrl: "/src/assets/images/product_valves_1790218792671.jpg",
    locationRack: "Bay B-04 / Ground Pallet",
    lastRestocked: "2026-08-15"
  },
  {
    id: "prod-5",
    name: "Galvanized Steel Wire Rope 6x36 IWRC (16mm Diameter)",
    category: "Wire Ropes & Rigging",
    sku: "WR-GALV-16MM",
    hsnCode: "7312",
    description: "High breaking strength galvanized wire rope with steel core (IWRC), ideal for wharf cranes, winches, and heavy material hoists.",
    specs: {
      "Diameter": "16 mm",
      "Construction": "6 x 36 Warrington Seale IWRC",
      "Tensile Strength": "1960 N/mm²",
      "Breaking Load": "178 kN",
      "Coating": "Class A Galvanized"
    },
    unit: "Meter",
    price: 240,
    mrp: 290,
    gstRate: 18,
    stock: 450,
    minStockLevel: 100,
    supplierId: "sup-2",
    supplierName: "Usha Martin Rigging & Wire Rope Agency",
    imageUrl: "/src/assets/images/hero_industrial_hardware_1790218766621.jpg",
    locationRack: "Spool Yard C-01",
    lastRestocked: "2026-09-15"
  },
  {
    id: "prod-6",
    name: "Forged Alloy Steel Dee Shackle & Bow Shackle (5.0 Ton SWL)",
    category: "Wire Ropes & Rigging",
    sku: "RIG-SHACKLE-5T",
    hsnCode: "7326",
    description: "Drop-forged alloy steel shackle with safety screw pin, stamped with safe working load certification for shipping docks.",
    specs: {
      "Capacity (SWL)": "5.0 Tonnes",
      "Safety Factor": "6:1 Tested",
      "Pin Type": "Screw Pin Yellow Lacquer",
      "Standard": "US Fed Spec RR-C-271D"
    },
    unit: "Pcs",
    price: 490,
    mrp: 620,
    gstRate: 18,
    stock: 65,
    minStockLevel: 20,
    supplierId: "sup-2",
    supplierName: "Usha Martin Rigging & Wire Rope Agency",
    imageUrl: "/src/assets/images/hero_industrial_hardware_1790218766621.jpg",
    locationRack: "Aisle C-03 / Box 12",
    lastRestocked: "2026-09-01"
  },
  {
    id: "prod-7",
    name: "Industrial Heavy Angle Grinder 850W (4-Inch / 100mm)",
    category: "Power Tools & Abrasives",
    sku: "PT-GRIND-850",
    hsnCode: "8467",
    description: "Compact ergonomic electric angle grinder with dust-proof motor, spindle lock, and overload protection for fabrication sheds.",
    specs: {
      "Power Input": "850 Watts",
      "No Load Speed": "11,000 RPM",
      "Spindle Thread": "M10",
      "Disc Diameter": "100 mm (4\")",
      "Warranty": "1 Year Manufacturer"
    },
    unit: "Pcs",
    price: 2450,
    mrp: 2950,
    gstRate: 18,
    stock: 22,
    minStockLevel: 10,
    supplierId: "sup-4",
    supplierName: "Bosch & Dewalt Power Equipment Corp",
    imageUrl: "/src/assets/images/product_power_tools_1790218804827.jpg",
    locationRack: "Tool Vault T-01",
    lastRestocked: "2026-09-12"
  },
  {
    id: "prod-8",
    name: "Reinforced Thin Stainless Steel Cut-Off Wheels (4\" x 1.2mm - 50 Pcs Box)",
    category: "Power Tools & Abrasives",
    sku: "ABR-CUT-4IN",
    hsnCode: "6804",
    description: "Ultra-fast burr-free cutting discs with dual fiberglass mesh reinforcement for MS angles, pipes, and SS channels.",
    specs: {
      "Dimensions": "105 x 1.2 x 16 mm",
      "Max Speed": "15,300 RPM (80 m/s)",
      "Abrasive": "White Aluminum Oxide WA60",
      "Packaging": "Metal Airtight Tub of 50"
    },
    unit: "Box",
    price: 850,
    mrp: 1100,
    gstRate: 18,
    stock: 9, // LOW STOCK
    minStockLevel: 15,
    supplierId: "sup-4",
    supplierName: "Bosch & Dewalt Power Equipment Corp",
    imageUrl: "/src/assets/images/product_power_tools_1790218804827.jpg",
    locationRack: "Aisle D-01 / Shelf 2",
    lastRestocked: "2026-08-28"
  },
  {
    id: "prod-9",
    name: "Ratchet Adjustable Industrial Safety Helmet (ISI Certified)",
    category: "Industrial Safety",
    sku: "SAF-HELM-ISI",
    hsnCode: "6506",
    description: "High-density polymer impact resistant safety helmet with 6-point textile cradle, chin strap, and sweatband.",
    specs: {
      "Standard": "IS 2925:1984 Mark",
      "Suspension": "6-Point Ratchet Wheel Adjustment",
      "Ventilation": "Side Cooling Louvers",
      "Color": "High-Visibility Safety Yellow"
    },
    unit: "Pcs",
    price: 220,
    mrp: 310,
    gstRate: 12,
    stock: 85,
    minStockLevel: 30,
    supplierId: "sup-4",
    supplierName: "Bosch & Dewalt Power Equipment Corp",
    imageUrl: "/src/assets/images/hero_industrial_hardware_1790218766621.jpg",
    locationRack: "Safety Section S-01",
    lastRestocked: "2026-09-18"
  },
  {
    id: "prod-10",
    name: "Galvanized M.S. Girder Clamp / Beam Clamp (2 Tonnes)",
    category: "General Hardware",
    sku: "GH-GIRD-2T",
    hsnCode: "7326",
    description: "Heavy forged steel beam clamp providing a quick and versatile rigging point for hoists, pulley blocks, and loads on I-beams.",
    specs: {
      "Flange Width": "75 mm to 220 mm",
      "Capacity": "2000 Kg (2 Tonnes)",
      "Finish": "Zinc Hot Dip Galvanized",
      "Locking": "Threaded Bar with Locking Collar"
    },
    unit: "Pcs",
    price: 1150,
    mrp: 1450,
    gstRate: 18,
    stock: 28,
    minStockLevel: 10,
    supplierId: "sup-1",
    supplierName: "Tata Steel & Industrial Fasteners Ltd.",
    imageUrl: "/src/assets/images/hero_industrial_hardware_1790218766621.jpg",
    locationRack: "Aisle A-05 / Shelf 3",
    lastRestocked: "2026-09-08"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "GMS/ORD/2026-27/089",
    customerId: "usr-customer-1",
    customerName: "Amitava Roy (Roy Infra)",
    customerPhone: "9830114522",
    customerEmail: "procurement@royinfra.com",
    customerGstin: "19AAACB9012K1Z5",
    shippingAddress: "Vidyasagar Setu Toll Plaza Expansion Yard, Howrah, WB",
    billingAddress: "Sector V, Salt Lake, Kolkata-700091",
    items: [
      {
        productId: "prod-1",
        productName: "Grade 8.8 High-Tensile Hex Bolt (M16 x 65mm)",
        sku: "HTB-M16-65",
        hsnCode: "7318",
        quantity: 120,
        unit: "Kg",
        unitPrice: 135,
        gstRate: 18,
        total: 16200
      },
      {
        productId: "prod-5",
        productName: "Galvanized Steel Wire Rope 6x36 IWRC (16mm Diameter)",
        sku: "WR-GALV-16MM",
        hsnCode: "7312",
        quantity: 150,
        unit: "Meter",
        unitPrice: 240,
        gstRate: 18,
        total: 36000
      }
    ],
    subtotal: 52200,
    cgst: 4698,
    sgst: 4698,
    igst: 0,
    taxAmount: 9396,
    totalAmount: 61596,
    status: "Dispatched",
    paymentStatus: "Credit-30Days",
    paymentMethod: "30-Day Credit",
    poNumber: "PO/ROY/2026/0412",
    notes: "Deliver via Chhota Hathi pickup van at Gate 2 between 10 AM - 4 PM.",
    createdAt: "2026-09-21T11:30:00Z",
    updatedAt: "2026-09-22T14:15:00Z",
    estimatedDelivery: "2026-09-24",
    invoiceId: "inv-2026-089"
  },
  {
    id: "ord-102",
    orderNumber: "GMS/ORD/2026-27/090",
    customerId: "usr-customer-2",
    customerName: "Gautam Sengupta",
    customerPhone: "9831987654",
    customerEmail: "gautam.fab@gmail.com",
    customerGstin: "19AAAFH3341P1Z9",
    shippingAddress: "Dry Dock No. 3, Garden Reach Shipbuilders Yard, Kolkata-700024",
    billingAddress: "Dock Eastern Gate, Garden Reach, Kolkata-700024",
    items: [
      {
        productId: "prod-3",
        productName: "Industrial Stainless Steel 316 Flanged Ball Valve 2-Inch (50mm)",
        sku: "VAL-SS-BV50",
        hsnCode: "8481",
        quantity: 4,
        unit: "Pcs",
        unitPrice: 3450,
        gstRate: 18,
        total: 13800
      },
      {
        productId: "prod-6",
        productName: "Forged Alloy Steel Dee Shackle & Bow Shackle (5.0 Ton SWL)",
        sku: "RIG-SHACKLE-5T",
        hsnCode: "7326",
        quantity: 12,
        unit: "Pcs",
        unitPrice: 490,
        gstRate: 18,
        total: 5880
      }
    ],
    subtotal: 19680,
    cgst: 1771.2,
    sgst: 1771.2,
    igst: 0,
    taxAmount: 3542.4,
    totalAmount: 23222.4,
    status: "Confirmed",
    paymentStatus: "Paid",
    paymentMethod: "NEFT/RTGS",
    poNumber: "GRSE/SUB/7881",
    notes: "Test certificates required along with the delivery challan.",
    createdAt: "2026-09-23T09:15:00Z",
    updatedAt: "2026-09-23T10:00:00Z",
    estimatedDelivery: "2026-09-25",
    invoiceId: "inv-2026-090"
  },
  {
    id: "ord-103",
    orderNumber: "GMS/ORD/2026-27/085",
    customerId: "usr-customer-1",
    customerName: "Amitava Roy (Roy Infra)",
    customerPhone: "9830114522",
    customerEmail: "procurement@royinfra.com",
    customerGstin: "19AAACB9012K1Z5",
    shippingAddress: "New Town Action Area 3 Project Site, Kolkata",
    billingAddress: "Sector V, Salt Lake, Kolkata-700091",
    items: [
      {
        productId: "prod-7",
        productName: "Industrial Heavy Angle Grinder 850W (4-Inch / 100mm)",
        sku: "PT-GRIND-850",
        hsnCode: "8467",
        quantity: 3,
        unit: "Pcs",
        unitPrice: 2450,
        gstRate: 18,
        total: 7350
      },
      {
        productId: "prod-9",
        productName: "Ratchet Adjustable Industrial Safety Helmet (ISI Certified)",
        sku: "SAF-HELM-ISI",
        hsnCode: "6506",
        quantity: 20,
        unit: "Pcs",
        unitPrice: 220,
        gstRate: 12,
        total: 4400
      }
    ],
    subtotal: 11750,
    cgst: 925.5,
    sgst: 925.5,
    igst: 0,
    taxAmount: 1851,
    totalAmount: 13601,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    poNumber: "PO/ROY/2026/0398",
    notes: "Delivered and received in good condition.",
    createdAt: "2026-09-17T15:20:00Z",
    updatedAt: "2026-09-19T16:30:00Z",
    estimatedDelivery: "2026-09-19",
    invoiceId: "inv-2026-085"
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "inv-2026-089",
    invoiceNumber: "GMS/TAX-INV/26-27/089",
    orderId: "ord-101",
    orderNumber: "GMS/ORD/2026-27/089",
    invoiceDate: "2026-09-22",
    dueDate: "2026-10-22",
    buyerName: "Bengal Bridge & Infrastructure Ltd.",
    buyerAddress: "Sector V, Salt Lake, Kolkata-700091, WB",
    buyerGstin: "19AAACB9012K1Z5",
    buyerPhone: "9830114522",
    items: [
      {
        productId: "prod-1",
        productName: "Grade 8.8 High-Tensile Hex Bolt (M16 x 65mm)",
        sku: "HTB-M16-65",
        hsnCode: "7318",
        quantity: 120,
        unit: "Kg",
        unitPrice: 135,
        gstRate: 18,
        total: 16200
      },
      {
        productId: "prod-5",
        productName: "Galvanized Steel Wire Rope 6x36 IWRC (16mm Diameter)",
        sku: "WR-GALV-16MM",
        hsnCode: "7312",
        quantity: 150,
        unit: "Meter",
        unitPrice: 240,
        gstRate: 18,
        total: 36000
      }
    ],
    subtotal: 52200,
    cgst: 4698,
    sgst: 4698,
    igst: 0,
    totalTax: 9396,
    grandTotal: 61596,
    status: "Unpaid",
    paymentMode: "30-Day Credit (Net 30)",
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
  },
  {
    id: "inv-2026-085",
    invoiceNumber: "GMS/TAX-INV/26-27/085",
    orderId: "ord-103",
    orderNumber: "GMS/ORD/2026-27/085",
    invoiceDate: "2026-09-17",
    dueDate: "2026-09-17",
    buyerName: "Bengal Bridge & Infrastructure Ltd.",
    buyerAddress: "Sector V, Salt Lake, Kolkata-700091, WB",
    buyerGstin: "19AAACB9012K1Z5",
    buyerPhone: "9830114522",
    items: [
      {
        productId: "prod-7",
        productName: "Industrial Heavy Angle Grinder 850W (4-Inch / 100mm)",
        sku: "PT-GRIND-850",
        hsnCode: "8467",
        quantity: 3,
        unit: "Pcs",
        unitPrice: 2450,
        gstRate: 18,
        total: 7350
      },
      {
        productId: "prod-9",
        productName: "Ratchet Adjustable Industrial Safety Helmet (ISI Certified)",
        sku: "SAF-HELM-ISI",
        hsnCode: "6506",
        quantity: 20,
        unit: "Pcs",
        unitPrice: 220,
        gstRate: 12,
        total: 4400
      }
    ],
    subtotal: 11750,
    cgst: 925.5,
    sgst: 925.5,
    igst: 0,
    totalTax: 1851,
    grandTotal: 13601,
    status: "Paid",
    paymentMode: "UPI Instant Transfer",
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
  }
];

export const INITIAL_STOCK_LOGS: StockLog[] = [
  {
    id: "log-1",
    productId: "prod-1",
    productName: "Grade 8.8 High-Tensile Hex Bolt (M16 x 65mm)",
    changeType: "Order",
    quantityDelta: -120,
    remainingStock: 240,
    notes: "Order dispatched to Roy Infra (GMS/ORD/2026-27/089)",
    timestamp: "2026-09-22T14:15:00Z",
    user: "Subrata Maity"
  },
  {
    id: "log-2",
    productId: "prod-4",
    productName: "Forged Heavy Duty Cast Iron Gate Valve (100mm / 4-Inch)",
    changeType: "Adjustment",
    quantityDelta: -2,
    remainingStock: 4,
    notes: "Physical verification discrepancy in Bay B-04 pallet",
    timestamp: "2026-09-20T10:00:00Z",
    user: "Subrata Maity"
  },
  {
    id: "log-3",
    productId: "prod-5",
    productName: "Galvanized Steel Wire Rope 6x36 IWRC (16mm Diameter)",
    changeType: "Restock",
    quantityDelta: 200,
    remainingStock: 600,
    notes: "Batch received from Usha Martin Rigging PO #7721",
    timestamp: "2026-09-15T11:00:00Z",
    user: "Debashis Mukherjee"
  }
];

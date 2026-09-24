import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Product, ProductCategory } from '../types/index.ts';
import { 
  AlertTriangle, 
  PackagePlus, 
  RefreshCw, 
  Search, 
  Edit3, 
  History, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Filter,
  Plus,
  X,
  FileSpreadsheet,
  Layers
} from 'lucide-react';

interface StockDashboardProps {
  onGoToSuppliers: () => void;
}

export const StockDashboard: React.FC<StockDashboardProps> = ({ onGoToSuppliers }) => {
  const { products, lowStockProducts, updateProductStock, addProduct, updateProduct, stockLogs, suppliers, quickRestock } = useStore();
  const { currentUser } = useAuth();
  const { t, isBengali } = useLanguage();

  const getCategoryName = (cat: string): string => {
    if (!isBengali) return cat;
    switch (cat) {
      case 'All': return t('allCategories');
      case 'Fasteners & Bolts': return t('catFasteners');
      case 'Valves & Pipe Fittings': return t('catValves');
      case 'Wire Ropes & Rigging': return t('catWireRopes');
      case 'Power Tools & Abrasives': return t('catPowerTools');
      case 'Industrial Safety': return t('catSafety');
      case 'General Hardware': return t('catGeneral');
      default: return cat;
    }
  };

  const getUnitName = (unit: string): string => {
    if (!isBengali) return unit;
    switch (unit) {
      case 'Kg': return 'কেজি';
      case 'Pcs': return 'পিস';
      case 'Box': return 'বক্স';
      case 'Meter': return 'মিটার';
      case 'Bundle': return 'বান্ডিল';
      case 'Set': return 'সেট';
      default: return unit;
    }
  };

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('All');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'logs'>('inventory');

  // Modals
  const [adjustModalProduct, setAdjustModalProduct] = useState<Product | null>(null);
  const [adjustQty, setAdjustQty] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('Physical count reconciliation');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState<ProductCategory>('Fasteners & Bolts');
  const [newSku, setNewSku] = useState('');
  const [newHsn, setNewHsn] = useState('7318');
  const [newDesc, setNewDesc] = useState('');
  const [newUnit, setNewUnit] = useState<Product['unit']>('Kg');
  const [newPrice, setNewPrice] = useState<number>(100);
  const [newMrp, setNewMrp] = useState<number>(120);
  const [newGstRate, setNewGstRate] = useState<number>(18);
  const [newStock, setNewStock] = useState<number>(50);
  const [newMinStock, setNewMinStock] = useState<number>(15);
  const [newSupplierId, setNewSupplierId] = useState(suppliers[0]?.id || '');
  const [newRack, setNewRack] = useState('Aisle A-01');

  // Quick Restock State
  const [quickRestockProduct, setQuickRestockProduct] = useState<Product | null>(null);
  const [restockQty, setRestockQty] = useState(100);

  const filtered = products.filter(p => {
    if (onlyLowStock && p.stock > p.minStockLevel) return false;
    if (filterCat !== 'All' && p.category !== filterCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.hsnCode.includes(q) ||
        (p.locationRack && p.locationRack.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleSaveStockAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModalProduct) return;
    updateProductStock(
      adjustModalProduct.id,
      adjustQty,
      adjustReason,
      currentUser?.name || 'Staff'
    );
    setAdjustModalProduct(null);
  };

  const handleExecuteQuickRestock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickRestockProduct) return;
    quickRestock(
      quickRestockProduct.id,
      restockQty,
      quickRestockProduct.supplierName,
      currentUser?.name || 'Subrata Maity'
    );
    setQuickRestockProduct(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === newSupplierId) || suppliers[0];

    addProduct({
      name: newName,
      category: newCat,
      sku: newSku || `SKU-${Date.now().toString().slice(-4)}`,
      hsnCode: newHsn,
      description: newDesc,
      specs: { "Standard": "IS Standard Verified", "Material": "Industrial Grade" },
      unit: newUnit,
      price: Number(newPrice),
      mrp: Number(newMrp),
      gstRate: Number(newGstRate),
      stock: Number(newStock),
      minStockLevel: Number(newMinStock),
      supplierId: sup.id,
      supplierName: sup.name,
      locationRack: newRack,
      lastRestocked: new Date().toISOString().split('T')[0]
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewName('');
    setNewDesc('');
    setNewSku('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Low Stock Critical Alerts */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t('stockDashboardTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t('stockDashboardSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <PackagePlus className="w-4 h-4" />
              <span>{t('addItemBtn')}</span>
            </button>
          )}

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t('inventoryTable')}
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'logs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t('auditLogsTab')} ({stockLogs.length})
            </button>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Banner */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-amber-950">
                  {t('lowStockAlertBanner')} ({lowStockProducts.length})
                </h3>
                <p className="text-xs text-amber-900/80">
                  {t('lowStockAlertSub')}
                </p>
              </div>
            </div>

            <button
              onClick={onGoToSuppliers}
              className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-lg shadow-xs self-start sm:self-auto transition-colors"
            >
              {t('raisePoBtn')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-white rounded-xl p-3 border border-amber-200 shadow-xs flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-[10px] font-mono font-bold text-amber-700 uppercase">
                    SKU: {prod.sku} • HSN {prod.hsnCode}
                  </p>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-rose-700 font-semibold mt-0.5">
                    {isBengali ? 'বর্তমান' : 'Current'}: <strong>{prod.stock} {getUnitName(prod.unit)}</strong> ({isBengali ? 'ন্যূনতম' : 'Min'}: {prod.minStockLevel} {getUnitName(prod.unit)})
                  </p>
                </div>

                <button
                  onClick={() => {
                    setQuickRestockProduct(prod);
                    setRestockQty(prod.minStockLevel * 2);
                  }}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2.5 py-1.5 rounded-lg text-xs shrink-0 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t('quickRestockBtn')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Table View */}
      {activeTab === 'inventory' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-50/50">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isBengali ? 'এসকেইউ, নাম, বা এইচএসএন দিয়ে মজুত সার্চ করুন...' : 'Search stock by SKU, product name, rack location, or HSN...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterCat}
                onChange={e => setFilterCat(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
              >
                <option value="All">{getCategoryName('All')}</option>
                <option value="Fasteners & Bolts">{getCategoryName('Fasteners & Bolts')}</option>
                <option value="Valves & Pipe Fittings">{getCategoryName('Valves & Pipe Fittings')}</option>
                <option value="Wire Ropes & Rigging">{getCategoryName('Wire Ropes & Rigging')}</option>
                <option value="Power Tools & Abrasives">{getCategoryName('Power Tools & Abrasives')}</option>
                <option value="Industrial Safety">{getCategoryName('Industrial Safety')}</option>
                <option value="General Hardware">{getCategoryName('General Hardware')}</option>
              </select>

              <button
                onClick={() => setOnlyLowStock(!onlyLowStock)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                  onlyLowStock
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t('lowStockOnly')} ({lowStockProducts.length})</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('thItemSpecs')}</th>
                  <th className="py-3 px-3">{t('thSkuHsn')}</th>
                  <th className="py-3 px-3">{t('thWarehouseRack')}</th>
                  <th className="py-3 px-3">{t('thCurrentStock')}</th>
                  <th className="py-3 px-3">{t('thMinSafeLevel')}</th>
                  <th className="py-3 px-3">{t('thBaseRate')} (₹)</th>
                  <th className="py-3 px-3">{t('thStockValue')} (₹)</th>
                  <th className="py-3 px-3 text-right">{t('thActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map(product => {
                  const isLow = product.stock <= product.minStockLevel;
                  const isOut = product.stock <= 0;
                  const stockValue = product.stock * product.price;

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-slate-50 transition-colors ${isLow ? 'bg-amber-50/30' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-slate-900">{product.name}</p>
                          <p className="text-[11px] text-slate-500">{getCategoryName(product.category)} • {isBengali ? 'সরবরাহকারী' : 'Supplier'}: {product.supplierName}</p>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700">
                        <div>{product.sku}</div>
                        <span className="text-[10px] text-slate-400">HSN: {product.hsnCode}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        {product.locationRack || 'Yard Main'}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-bold font-mono text-sm ${
                              isOut
                                ? 'text-rose-600'
                                : isLow
                                ? 'text-amber-600 font-black'
                                : 'text-slate-900'
                            }`}
                          >
                            {product.stock}
                          </span>
                          <span className="text-slate-500 font-medium">{getUnitName(product.unit)}</span>
                          {isLow && (
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                              {isBengali ? 'কম' : 'LOW'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-mono">
                        {product.minStockLevel} {getUnitName(product.unit)}
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-slate-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-800">
                        ₹{stockValue.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setQuickRestockProduct(product);
                              setRestockQty(Math.max(50, product.minStockLevel * 2));
                            }}
                            title={t('quickRestockBtn')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 p-1.5 rounded-lg text-xs font-bold transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setAdjustModalProduct(product);
                              setAdjustQty(product.stock);
                            }}
                            title={t('adjustStockBtn')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 p-1.5 rounded-lg text-xs font-bold transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
            <span>{isBengali ? `স্টক রেজিস্টারে ${filtered.length} টি পণ্য দেখানো হচ্ছে` : `Showing ${filtered.length} products in stock register`}</span>
            <span className="font-semibold text-slate-800">
              {isBengali ? 'মোট মজুত মূল্যায়ন: ₹' : 'Total Inventory Valuation: ₹'}
              {filtered.reduce((sum, p) => sum + p.stock * p.price, 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      ) : (
        /* Audit Trail Logs */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{isBengali ? 'ইনভেন্টরি মুভমেন্ট ও অডিট ট্রেইল' : 'Inventory Movement & Audit Trail'}</h3>
              <p className="text-xs text-slate-500">{isBengali ? 'বিক্রয় কর্তন, সরবরাহকারী ডেলিভারি এবং ফিজিক্যাল অডিটের লাইভ খতিয়ান' : 'Live ledger of sales deductions, supplier deliveries, and physical audits'}</p>
            </div>
            <span className="text-xs font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">
              {stockLogs.length} {isBengali ? 'এন্ট্রি সংরক্ষিত' : 'Entries Recorded'}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {stockLogs.map(log => {
              const isPositive = log.quantityDelta > 0;
              return (
                <div key={log.id} className="p-3.5 hover:bg-slate-50 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg font-bold shrink-0 ${
                        isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{log.productName}</p>
                      <p className="text-[11px] text-slate-500">
                        {log.notes} • {isBengali ? 'অনুমোদিত' : 'Auth'}: <span className="font-medium text-slate-700">{log.user}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-mono font-bold text-sm ${
                        isPositive ? 'text-emerald-700' : 'text-slate-800'
                      }`}
                    >
                      {isPositive ? `+${log.quantityDelta}` : log.quantityDelta}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {isBengali ? 'অবশিষ্ট' : 'Bal'}: {log.remainingStock} {isBengali ? 'ইউনিট' : 'units'} • {new Date(log.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {adjustModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">{isBengali ? 'ম্যানুয়াল ইনভেন্টরি সমন্বয়' : 'Manual Inventory Adjustment'}</h3>
                <p className="text-xs text-slate-300 font-mono">{adjustModalProduct.sku}</p>
              </div>
              <button onClick={() => setAdjustModalProduct(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStockAdjust} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'পণ্য' : 'Product'}</label>
                <p className="font-bold text-slate-900 text-sm">{adjustModalProduct.name}</p>
                <p className="text-slate-500">{isBengali ? 'বর্তমান মজুত' : 'Current In-Stock'}: {adjustModalProduct.stock} {getUnitName(adjustModalProduct.unit)}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBengali ? 'নতুন যাচাইকৃত ফিজিক্যাল স্টক' : 'New Verified Physical Stock'} ({getUnitName(adjustModalProduct.unit)})
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={adjustQty}
                  onChange={e => setAdjustQty(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold font-mono focus:outline-hidden focus:border-amber-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  {isBengali ? 'সমন্বয় ডেল্টা' : 'Delta adjustment'}: {adjustQty - adjustModalProduct.stock >= 0 ? '+' : ''}
                  {adjustQty - adjustModalProduct.stock} {getUnitName(adjustModalProduct.unit)}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'স্টক পরিবর্তনের কারণ *' : 'Reason for Count Change *'}</label>
                <select
                  value={adjustReason}
                  onChange={e => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                >
                  <option value="Physical count reconciliation">{isBengali ? 'ফিজিক্যাল স্টক গণনা মেলানো' : 'Physical count reconciliation'}</option>
                  <option value="Damaged / Rusted during handling">{isBengali ? 'হ্যান্ডলিং বা আর্দ্রতায় ক্ষতি/মরিচা' : 'Damaged / Rusted during handling'}</option>
                  <option value="Client sample dispatch">{isBengali ? 'ক্লায়েন্ট নমুনা প্রেরণ' : 'Client sample dispatch'}</option>
                  <option value="Stock return from site">{isBengali ? 'সাইট থেকে ফেরত আসা স্টক' : 'Stock return from site'}</option>
                  <option value="Found excess in godown rack">{isBengali ? 'গুদামের তাকে অতিরিক্ত পাওয়া গেছে' : 'Found excess in godown rack'}</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustModalProduct(null)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  {isBengali ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  {isBengali ? 'নিশ্চিত করুন ও লেজার আপডেট করুন' : 'Confirm & Update Ledger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Restock Modal */}
      {quickRestockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">{isBengali ? 'দ্রুত সরবরাহকারী আগমন স্টক' : 'Fast Supplier Inward Restock'}</h3>
                <p className="text-xs text-emerald-200 font-mono">{quickRestockProduct.sku}</p>
              </div>
              <button onClick={() => setQuickRestockProduct(null)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteQuickRestock} className="p-5 space-y-4 text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{quickRestockProduct.name}</p>
                <p className="text-slate-500 mt-0.5">{isBengali ? 'সরবরাহকারী' : 'Supplier'}: {quickRestockProduct.supplierName}</p>
                <p className="text-slate-500">{isBengali ? 'বর্তমান মজুত' : 'Current Stock'}: {quickRestockProduct.stock} {getUnitName(quickRestockProduct.unit)}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBengali ? 'আগত পরিমাণ' : 'Quantity Received Inward'} ({getUnitName(quickRestockProduct.unit)}) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={restockQty}
                  onChange={e => setRestockQty(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold font-mono focus:outline-hidden focus:border-emerald-600"
                />
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  {isBengali ? 'আগমনের পর নতুন স্টক' : 'New stock after inward'}: {quickRestockProduct.stock + restockQty} {getUnitName(quickRestockProduct.unit)}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickRestockProduct(null)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  {isBengali ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs"
                >
                  {isBengali ? 'স্টক ইনওয়ার্ড গ্রহণ করুন' : 'Receive Inward Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <h3 className="text-sm font-bold">{isBengali ? 'ক্যাটালগে নতুন হার্ডওয়্যার আইটেম যোগ করুন' : 'Add New Hardware Item to Catalog'}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'পণ্যের নাম ও বিবরণ *' : 'Product Name & Specifications *'}</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder={isBengali ? 'যেমন: M20 হাই-টেনসাইল অ্যাঙ্কর ফাস্টেনার (গ্রেড 10.9)' : 'e.g. M20 High-Tensile Anchor Fastener (Grade 10.9)'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'ক্যাটাগরি *' : 'Category *'}</label>
                  <select
                    value={newCat}
                    onChange={e => setNewCat(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                  >
                    <option value="Fasteners & Bolts">{getCategoryName('Fasteners & Bolts')}</option>
                    <option value="Valves & Pipe Fittings">{getCategoryName('Valves & Pipe Fittings')}</option>
                    <option value="Wire Ropes & Rigging">{getCategoryName('Wire Ropes & Rigging')}</option>
                    <option value="Power Tools & Abrasives">{getCategoryName('Power Tools & Abrasives')}</option>
                    <option value="Industrial Safety">{getCategoryName('Industrial Safety')}</option>
                    <option value="General Hardware">{getCategoryName('General Hardware')}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'এসকেইউ কোড' : 'SKU Code'}</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={e => setNewSku(e.target.value.toUpperCase())}
                    placeholder="e.g. HTB-M20-100"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'এইচএসএন কোড *' : 'HSN Code *'}</label>
                  <input
                    type="text"
                    required
                    value={newHsn}
                    onChange={e => setNewHsn(e.target.value)}
                    placeholder="7318"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'পরিমাপের একক *' : 'Unit of Measure *'}</label>
                  <select
                    value={newUnit}
                    onChange={e => setNewUnit(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                  >
                    <option value="Pcs">{getUnitName('Pcs')}</option>
                    <option value="Kg">{getUnitName('Kg')}</option>
                    <option value="Box">{getUnitName('Box')}</option>
                    <option value="Meter">{getUnitName('Meter')}</option>
                    <option value="Bundle">{getUnitName('Bundle')}</option>
                    <option value="Set">{getUnitName('Set')}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'জিএসটি হার (%) *' : 'GST Rate (%) *'}</label>
                  <select
                    value={newGstRate}
                    onChange={e => setNewGstRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                  >
                    <option value={18}>18% ({isBengali ? 'স্ট্যান্ডার্ড হার্ডওয়্যার' : 'Standard Hardware'})</option>
                    <option value={12}>12% ({isBengali ? 'সুরক্ষা সরঞ্জাম' : 'Safety Equipment'})</option>
                    <option value={28}>28% ({isBengali ? 'ভারী কম্প্রেসর' : 'Heavy Compressors'})</option>
                    <option value={5}>5% ({isBengali ? 'বেসিক ইস্পাত তার' : 'Basic Steel Wire'})</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'পাইকারি দর (₹) *' : 'Wholesale Rate (₹) *'}</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPrice}
                    onChange={e => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'এমআরপি দর (₹)' : 'MRP Rate (₹)'}</label>
                  <input
                    type="number"
                    min={1}
                    value={newMrp}
                    onChange={e => setNewMrp(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'প্রাথমিক মজুত *' : 'Initial Stock *'}</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newStock}
                    onChange={e => setNewStock(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'ন্যূনতম রিঅর্ডার সতর্কতা' : 'Min Reorder Alert'}</label>
                  <input
                    type="number"
                    min={1}
                    value={newMinStock}
                    onChange={e => setNewMinStock(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'রেক / বিন অবস্থান' : 'Rack / Bin Location'}</label>
                  <input
                    type="text"
                    value={newRack}
                    onChange={e => setNewRack(e.target.value)}
                    placeholder="Bay C-02"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'সরবরাহকারী *' : 'Supplier *'}</label>
                <select
                  value={newSupplierId}
                  onChange={e => setNewSupplierId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.contactPerson})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'পণ্যের বিবরণ' : 'Item Description'}</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder={isBengali ? 'ম্যাটেরিয়াল স্পেসিফিকেশন, লোড ক্ষমতা, ফিনিশ ইত্যাদি...' : 'Material specification, load capacity, finish, standards...'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  {isBengali ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs"
                >
                  {isBengali ? 'হার্ডওয়্যার আইটেম সংরক্ষণ করুন' : 'Save Hardware Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Product, ProductCategory } from '../types/index.ts';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Check, 
  AlertCircle, 
  Info, 
  ShieldAlert, 
  SlidersHorizontal,
  ChevronRight,
  PackageCheck,
  Eye,
  X
} from 'lucide-react';

interface ProductCatalogProps {
  onOpenCart: () => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Fasteners & Bolts',
  'Valves & Pipe Fittings',
  'Wire Ropes & Rigging',
  'Power Tools & Abrasives',
  'Industrial Safety',
  'General Hardware'
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onOpenCart }) => {
  const { products, addToCart, cart } = useStore();
  const { currentUser } = useAuth();
  const { t, isBengali } = useLanguage();

  const getCategoryName = (cat: 'All' | ProductCategory): string => {
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'lowStock'>('all');
  const [supplierOnly, setSupplierOnly] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // If user is a supplier, default option to see their own items
  const isSupplier = currentUser?.role === 'supplier';

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Supplier filter if active
      if (isSupplier && supplierOnly && currentUser?.supplierId && p.supplierId !== currentUser.supplierId) {
        return false;
      }

      // Stock status filter
      if (stockFilter === 'inStock' && p.stock <= 0) return false;
      if (stockFilter === 'lowStock' && (p.stock > p.minStockLevel || p.stock <= 0)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesHsn = p.hsnCode.includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        return matchesName || matchesSku || matchesHsn || matchesCategory || matchesDesc;
      }

      return true;
    });
  }, [products, selectedCategory, stockFilter, supplierOnly, searchQuery, isSupplier, currentUser]);

  const handleQuantityChange = (productId: string, val: number, maxStock: number) => {
    const qty = Math.max(1, Math.min(val, maxStock));
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    setAddedNotice(`${qty} ${product.unit} of "${product.name.slice(0, 30)}..." added to cart`);
    setTimeout(() => setAddedNotice(null), 3500);
  };

  const getCartQuantity = (productId: string) => {
    const item = cart.find(c => c.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium">{addedNotice}</p>
          <button
            onClick={onOpenCart}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 ml-2 underline underline-offset-2"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Hero Welcome & Industrial Credibility */}
      <div className="relative rounded-2xl overflow-hidden mb-8 border border-slate-200 bg-slate-900 text-white shadow-md">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/src/assets/images/hero_industrial_hardware_1790218766621.jpg"
            alt="Gunadhar Maity Industrial Hardware Storehouse"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <span>{t('wholesaleTag')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>{isBengali ? 'নেতাজী সুভাষ রোড, কলকাতা' : 'Netaji Subhas Road, Kolkata'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              {t('catalogTitle')}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t('catalogSubtitle')}
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xs p-4 rounded-xl border border-slate-700/60 shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 min-w-[220px]">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">{t('orderEnquiries')}</p>
              <p className="text-base font-bold text-amber-400 font-mono">+91 98366 80161</p>
              <p className="text-sm font-semibold text-slate-200 font-mono">+91 97751 29654</p>
            </div>
            <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{t('warehouseActive')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={stockFilter}
              onChange={e => setStockFilter(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-amber-600 shadow-xs"
            >
              <option value="all">{t('allStockStatus')}</option>
              <option value="inStock">{t('inStockOnly')}</option>
              <option value="lowStock">{t('lowStockOnly')}</option>
            </select>

            {isSupplier && (
              <button
                onClick={() => setSupplierOnly(!supplierOnly)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  supplierOnly
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t('mySuppliedOnly')}
              </button>
            )}

            <button
              onClick={onOpenCart}
              className="md:hidden flex items-center gap-2 bg-amber-600 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t('orderCart')} ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
        <p>
          {t('showingItems')}: <span className="font-semibold text-slate-900">{filteredProducts.length}</span>
          {selectedCategory !== 'All' && <span> • <strong className="text-slate-900">{getCategoryName(selectedCategory)}</strong></span>}
        </p>
        <span className="text-[11px] text-slate-400">{t('pricesExclusiveGst')}</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No hardware products found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Try adjusting your search criteria or clearing filters. For custom or unlisted general orders, contact Gunadhar Maity & Sons directly.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setStockFilter('all');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => {
            const currentQty = quantities[product.id] || 1;
            const inCartCount = getCartQuantity(product.id);
            const isOutOfStock = product.stock <= 0;
            const isLowStock = product.stock > 0 && product.stock <= product.minStockLevel;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Image & Stock Badge Header */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <PackageCheck className="w-12 h-12" />
                    </div>
                  )}

                  {/* Stock Status Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    {isOutOfStock ? (
                      <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        {t('outOfStock')}
                      </span>
                    ) : isLowStock ? (
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {t('lowStock')}: {product.stock} {getUnitName(product.unit)}
                      </span>
                    ) : (
                      <span className="bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs backdrop-blur-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                        {t('inStock')}: {product.stock} {getUnitName(product.unit)}
                      </span>
                    )}
                  </div>

                  {/* SKU & Category Tag */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      SKU: {product.sku}
                    </span>
                    <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                      HSN {product.hsnCode}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 mb-1">
                      {getCategoryName(product.category)}
                    </p>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2 mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>

                    {/* Quick Specs Chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                        <span key={key} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                          <strong className="font-semibold text-slate-900">{key}:</strong> {val}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Unit Box */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-extrabold text-slate-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            / {getUnitName(product.unit)}
                          </span>
                        </div>
                        {product.mrp > product.price && (
                          <span className="text-[11px] text-slate-400 line-through">
                            MRP ₹{product.mrp}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                          +{product.gstRate}% GST
                        </span>
                        {product.locationRack && currentUser?.role === 'admin' && (
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Loc: {product.locationRack}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                          <button
                            type="button"
                            disabled={isOutOfStock || currentQty <= 1}
                            onClick={() => handleQuantityChange(product.id, currentQty - 1, product.stock)}
                            className="w-7 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            disabled={isOutOfStock}
                            min={1}
                            max={product.stock}
                            value={currentQty}
                            onChange={e => handleQuantityChange(product.id, parseInt(e.target.value) || 1, product.stock)}
                            className="w-10 h-8 text-center text-xs font-bold bg-white text-slate-800 border-x border-slate-200 focus:outline-hidden"
                          />
                          <button
                            type="button"
                            disabled={isOutOfStock || currentQty >= product.stock}
                            onClick={() => handleQuantityChange(product.id, currentQty + 1, product.stock)}
                            className="w-7 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white font-bold h-8 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{isOutOfStock ? t('soldOut') : t('addToOrder')}</span>
                        </button>

                        {/* Specs View button */}
                        <button
                          type="button"
                          onClick={() => setSelectedProductForModal(product)}
                          title={t('viewSpecs')}
                          className="w-8 h-8 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 shrink-0"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>

                      {inCartCount > 0 && (
                        <p className="text-[10px] text-emerald-700 font-semibold text-center flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{inCartCount} {getUnitName(product.unit)} {t('currentlyInCart')}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Technical Spec Sheet Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                  HSN {selectedProductForModal.hsnCode} • SKU {selectedProductForModal.sku}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedProductForModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProductForModal.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isBengali ? 'প্রযুক্তিগত বৈশিষ্ট্য ও মান্যতা' : 'Technical Specifications & Compliance'}
                </h4>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody>
                      {Object.entries(selectedProductForModal.specs).map(([k, v], idx) => (
                        <tr key={k} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="px-3 py-2 font-semibold text-slate-700 w-1/3 border-r border-slate-200">
                            {k}
                          </td>
                          <td className="px-3 py-2 text-slate-900 font-mono">
                            {v}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50">
                        <td className="px-3 py-2 font-semibold text-slate-700 border-r border-slate-200">
                          {isBengali ? 'প্রযোজ্য জিএসটি' : 'GST Applicable'}
                        </td>
                        <td className="px-3 py-2 text-slate-900">
                          {selectedProductForModal.gstRate}% (CGST {(selectedProductForModal.gstRate / 2).toFixed(1)}% + SGST {(selectedProductForModal.gstRate / 2).toFixed(1)}%)
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-3 py-2 font-semibold text-slate-700 border-r border-slate-200">
                          {isBengali ? 'অনুমোদিত সরবরাহকারী' : 'Verified Supplier'}
                        </td>
                        <td className="px-3 py-2 text-slate-900">
                          {selectedProductForModal.supplierName}
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-3 py-2 font-semibold text-slate-700 border-r border-slate-200">
                          {isBengali ? 'গুদামে মজুত' : 'Warehouse Stock'}
                        </td>
                        <td className="px-3 py-2 font-bold text-slate-900">
                          {selectedProductForModal.stock} {getUnitName(selectedProductForModal.unit)} ({isBengali ? 'ন্যূনতম সীমা' : 'Min Reorder Level'}: {selectedProductForModal.minStockLevel})
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  {isBengali
                    ? 'টেস্টিং সার্টিফিকেট (MTC), আল্ট্রাসনিক পরিদর্শন রিপোর্ট বা নির্দিষ্ট মাপের কাটিং প্রয়োজন হলে অর্ডারের নোটে উল্লেখ করুন অথবা আমাদের নেতাজী সুভাষ রোড কাউন্টারে যোগাযোগ করুন।'
                    : "Need test certificates (MTC), ultrasonic inspection reports, or custom cut lengths? Mention it in the order notes or call our Netaji Subhas Road counter directly."}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">{t('unitPrice')}</p>
                <p className="text-base font-extrabold text-slate-900">
                  ₹{selectedProductForModal.price} / {getUnitName(selectedProductForModal.unit)}
                </p>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(selectedProductForModal);
                  setSelectedProductForModal(null);
                }}
                disabled={selectedProductForModal.stock <= 0}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('addToOrder')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

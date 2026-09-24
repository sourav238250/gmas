import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Supplier, ProductCategory } from '../types/index.ts';
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  DollarSign, 
  Star, 
  Package, 
  FileCheck2, 
  RefreshCw, 
  CheckCircle,
  Building2,
  X
} from 'lucide-react';

export const SupplierManagement: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, products, quickRestock } = useStore();
  const { currentUser } = useAuth();
  const { t, isBengali } = useLanguage();

  const isSupplierRole = currentUser?.role === 'supplier';

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSupplierForPO, setSelectedSupplierForPO] = useState<Supplier | null>(null);

  // New Supplier Form
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gstin, setGstin] = useState('');
  const [categories, setCategories] = useState<ProductCategory[]>(['Fasteners & Bolts']);
  const [paymentTerms, setPaymentTerms] = useState('30 Days Net');

  // PO / Restock Form
  const [poProductId, setPoProductId] = useState('');
  const [poQty, setPoQty] = useState(100);
  const [poSuccess, setPoSuccess] = useState('');

  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplier({
      name,
      contactPerson,
      email,
      phone,
      address,
      gstin,
      categories,
      rating: 4.8,
      paymentTerms,
      balanceDue: 0
    });
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setGstin('');
  };

  const handleSendPurchaseOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplierForPO || !poProductId) return;

    const prod = products.find(p => p.id === poProductId);
    if (!prod) return;

    quickRestock(
      prod.id,
      poQty,
      selectedSupplierForPO.name,
      currentUser?.name || 'Subrata Maity'
    );

    setPoSuccess(
      isBengali
        ? `${selectedSupplierForPO.name} থেকে ${poQty} ${prod.unit} এর ইনওয়ার্ড স্টক সফলভাবে গৃহীত হয়েছে!`
        : `Inward restock batch of ${poQty} ${prod.unit} received from ${selectedSupplierForPO.name}! Warehouse stock updated.`
    );
    setTimeout(() => {
      setPoSuccess('');
      setSelectedSupplierForPO(null);
    }, 3000);
  };

  // If user is a supplier, filter to their own supplier profile
  const displayedSuppliers = isSupplierRole && currentUser?.supplierId
    ? suppliers.filter(s => s.id === currentUser.supplierId)
    : suppliers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isSupplierRole ? (isBengali ? 'সরবরাহকারী পার্টনার পোর্টাল' : 'Supplier Partner Portal') : t('supplierMgmtTitle')}
            </h2>
            {isSupplierRole && (
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                {isBengali ? 'ভেরিফায়েড ভেন্ডর অ্যাকাউন্ট' : 'Verified Vendor Account'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('supplierMgmtSub')}
          </p>
        </div>

        {!isSupplierRole && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('onboardSupplierBtn')}</span>
          </button>
        )}
      </div>

      {poSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{poSuccess}</span>
        </div>
      )}

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayedSuppliers.map(sup => {
          const supplierProducts = products.filter(p => p.supplierId === sup.id);
          const totalUnitsInStock = supplierProducts.reduce((sum, p) => sum + p.stock, 0);

          return (
            <div
              key={sup.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {sup.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isBengali ? 'যোগাযোগ ব্যক্তি' : 'Contact'}: <strong className="text-slate-800">{sup.contactPerson}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-amber-800 text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{sup.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{sup.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{sup.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{sup.email}</span>
                  </p>
                  <p className="flex items-center gap-2 pt-1 border-t border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">{isBengali ? 'জিএসটিআইএন:' : 'GSTIN:'}</span>
                    <span className="font-mono text-slate-800 font-bold">{sup.gstin}</span>
                  </p>
                </div>

                {/* Supplies & Categories */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    {t('suppliedProductLines')} ({supplierProducts.length} {isBengali ? 'সক্রিয় আইটেম' : 'Active Lines'})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {supplierProducts.map(sp => (
                      <span key={sp.id} className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                        {sp.name.slice(0, 30)}... ({sp.stock} {sp.unit})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial & Order Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] text-slate-400">{t('ledgerBalanceDue')}</p>
                  <p className="text-sm font-extrabold text-slate-900 font-mono">
                    ₹{sup.balanceDue.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium">{isBengali ? 'শর্ত' : 'Terms'}: {sup.paymentTerms}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedSupplierForPO(sup);
                    if (supplierProducts.length > 0) {
                      setPoProductId(supplierProducts[0].id);
                    }
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('receiveRestockBatchBtn')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PO / Restock Modal */}
      {selectedSupplierForPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">{isBengali ? 'ইনওয়ার্ড রিস্টক পারচেজ অর্ডার' : 'Inward Restock Purchase Order'}</h3>
                <p className="text-xs text-slate-300">{selectedSupplierForPO.name}</p>
              </div>
              <button onClick={() => setSelectedSupplierForPO(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendPurchaseOrder} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBengali ? 'সরবরাহকৃত পণ্য লাইন নির্বাচন করুন *' : 'Select Supplied Product Line *'}
                </label>
                <select
                  value={poProductId}
                  onChange={e => setPoProductId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                >
                  {products
                    .filter(p => p.supplierId === selectedSupplierForPO.id)
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({isBengali ? 'বর্তমান মজুত' : 'Current Stock'}: {p.stock} {p.unit})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBengali ? 'ইনওয়ার্ড করার পরিমাণ *' : 'Batch Quantity to Inward *'}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={poQty}
                  onChange={e => setPoQty(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-sm focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <p className="font-semibold text-xs">{isBengali ? 'স্বয়ংক্রিয় অ্যাকাউন্টিং ও স্টক আপডেট' : 'Automated Accounting & Stock Update'}</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  {isBengali
                    ? 'ইনওয়ার্ড নিশ্চিত করার সাথে সাথে গুদাম প্রাপ্যতা বৃদ্ধি পায় এবং গুণধর মাইতি অ্যান্ড সন্সের মুভমেন্ট লগে যুক্ত হয়।'
                    : 'Confirming inward immediately increases warehouse availability and writes to the Gunadhar Maity & Sons inventory movement log.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSupplierForPO(null)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  {isBengali ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs"
                >
                  {isBengali ? 'ইনওয়ার্ড রসিদ নিশ্চিত করুন' : 'Confirm Inward Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Onboard Supplier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">{isBengali ? 'নতুন হার্ডওয়্যার সরবরাহকারী যুক্ত করুন' : 'Onboard New Hardware Supplier'}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSupplier} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'সরবরাহকারী প্রতিষ্ঠানের নাম *' : 'Supplier Company Name *'}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isBengali ? 'যেমন: জিন্দাল স্টিল অ্যান্ড ভালভস লি.' : 'e.g. Jindal Steel & Valves Ltd.'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'যোগাযোগকারী ব্যক্তি *' : 'Key Contact Person *'}</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={e => setContactPerson(e.target.value)}
                    placeholder={isBengali ? 'পুরো নাম' : 'Full name'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'ফোন নম্বর *' : 'Phone Number *'}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={isBengali ? '১০ সংখ্যার মোবাইল নম্বর' : '10-digit mobile'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sales@supplier.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'জিএসটিআইএন *' : 'GSTIN *'}</label>
                  <input
                    type="text"
                    required
                    value={gstin}
                    onChange={e => setGstin(e.target.value.toUpperCase())}
                    placeholder="19AAAAA0000A1Z5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'অফিস / গুদামের ঠিকানা (কলকাতা)' : 'Office / Godown Address in Kolkata'}</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={isBengali ? 'রাস্তা, এলাকা (যেমন: বড়বাজার, হাওড়া, স্ট্র্যান্ড রোড)' : 'Street, Area (e.g. Burrabazar, Howrah, Strand Road)'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{isBengali ? 'ক্রেডিট / পেমেন্টের শর্ত' : 'Credit / Payment Terms'}</label>
                <select
                  value={paymentTerms}
                  onChange={e => setPaymentTerms(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                >
                  <option value="30 Days Net">{isBengali ? '৩০ দিন নেট' : '30 Days Net'}</option>
                  <option value="45 Days Net">{isBengali ? '৪৫ দিন নেট' : '45 Days Net'}</option>
                  <option value="15 Days Net">{isBengali ? '১৫ দিন নেট' : '15 Days Net'}</option>
                  <option value="Immediate Bank Transfer">{isBengali ? 'তাত্ক্ষণিক ব্যাংক ট্রান্সফার' : 'Immediate Bank Transfer'}</option>
                </select>
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
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs"
                >
                  {isBengali ? 'সরবরাহকারী যুক্ত করুন' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Invoice } from '../types/index.ts';
import { 
  Printer, 
  FileText, 
  CheckCircle, 
  Clock, 
  Search, 
  Download, 
  ChevronRight, 
  Building, 
  Phone, 
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { FIRM_DETAILS } from '../data/initialData.ts';

interface InvoiceViewerProps {
  selectedInvoiceId?: string | null;
  onClearSelection?: () => void;
}

export const InvoiceViewer: React.FC<InvoiceViewerProps> = ({
  selectedInvoiceId,
  onClearSelection
}) => {
  const { invoices, updatePaymentStatus, orders } = useStore();
  const { currentUser } = useAuth();
  const { t, isBengali } = useLanguage();

  const [activeInvoiceId, setActiveInvoiceId] = useState<string>(
    selectedInvoiceId || invoices[0]?.id || ''
  );
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Unpaid'>('All');
  const [search, setSearch] = useState('');

  // Update active invoice if prop changes
  React.useEffect(() => {
    if (selectedInvoiceId) {
      setActiveInvoiceId(selectedInvoiceId);
    }
  }, [selectedInvoiceId]);

  const filteredInvoices = invoices.filter(inv => {
    if (filterStatus !== 'All' && inv.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.buyerName.toLowerCase().includes(q) ||
        (inv.buyerGstin && inv.buyerGstin.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const currentInvoice = invoices.find(i => i.id === activeInvoiceId) || filteredInvoices[0];

  const handlePrint = () => {
    window.print();
  };

  const handleTogglePayment = (invoice: Invoice) => {
    const nextStatus = invoice.status === 'Paid' ? 'Pending' : 'Paid';
    updatePaymentStatus(invoice.orderId, nextStatus as any);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner (Hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t('invoiceViewerTitle')}
            </h2>
            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded uppercase">
              {isBengali ? 'পশ্চিমবঙ্গ রাজ্য কোড: ১৯' : 'West Bengal State Code: 19'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('invoiceViewerSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentInvoice && (
            <button
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{t('printInvoiceBtn')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Sidebar List & Printable Invoice View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Invoices List (Hidden on print) */}
        <div className="no-print lg:col-span-4 space-y-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isBengali ? 'চালান নং, গ্রাহক, জিএসটিআইএন খুঁজুন...' : 'Search invoice #, client, GSTIN...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div className="flex items-center gap-1">
              {(['All', 'Paid', 'Unpaid'] as const).map(st => {
                const label = isBengali
                  ? st === 'All' ? 'সকল' : st === 'Paid' ? 'পরিশোধিত' : 'বকেয়া'
                  : st;
                return (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all ${
                      filterStatus === st
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredInvoices.map(inv => {
              const isSelected = inv.id === activeInvoiceId;
              const isPaid = inv.status === 'Paid';

              return (
                <div
                  key={inv.id}
                  onClick={() => setActiveInvoiceId(inv.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-mono font-bold text-xs text-slate-900">
                      {inv.invoiceNumber}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isPaid ? (isBengali ? 'পরিশোধিত' : 'Paid') : (isBengali ? 'বকেয়া' : 'Unpaid')}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 truncate">
                    {inv.buyerName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isBengali ? 'তারিখ' : 'Dated'}: {inv.invoiceDate} • {inv.items.length} {isBengali ? 'আইটেম' : 'hardware items'}
                  </p>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{inv.orderNumber}</span>
                    <span className="font-extrabold text-slate-900 font-mono">
                      ₹{inv.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High Fidelity Printable GST Invoice */}
        <div className="lg:col-span-8">
          {currentInvoice ? (
            <div className="invoice-printable bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-sm">
              {/* Payment Action Bar for Admin (Hidden on Print) */}
              {currentUser?.role === 'admin' && (
                <div className="no-print mb-6 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{isBengali ? 'চালান পেমেন্ট নিষ্পত্তি:' : 'Invoice Payment Settlement:'}</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      currentInvoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {currentInvoice.status === 'Paid' ? (isBengali ? 'পরিশোধিত' : 'Paid') : (isBengali ? 'বকেয়া' : 'Unpaid')} ({currentInvoice.paymentMode})
                    </span>
                  </div>
                  <button
                    onClick={() => handleTogglePayment(currentInvoice)}
                    className="bg-white border border-slate-300 hover:border-slate-400 font-bold px-3 py-1.5 rounded-lg shadow-xs text-slate-800"
                  >
                    {isBengali
                      ? currentInvoice.status === 'Paid' ? 'বকেয়া হিসেবে চিহ্নিত করুন' : 'পরিশোধিত হিসেবে চিহ্নিত করুন'
                      : `Mark as ${currentInvoice.status === 'Paid' ? 'Unpaid (Credit)' : 'Paid (Settled)'}`}
                  </button>
                </div>
              )}

              {/* Official Tax Invoice Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                      {isBengali ? 'ট্যাক্স ইনভয়েস (সিজিএসটি নিয়ম ৪৬, ২০১৭)' : 'TAX INVOICE (RULE 46 OF CGST RULES, 2017)'}
                    </span>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                      {currentInvoice.sellerDetails.firmName}
                    </h1>
                    <p className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                      {currentInvoice.sellerDetails.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {currentInvoice.sellerDetails.address}, {currentInvoice.sellerDetails.cityStateZip}
                    </p>
                    <p className="text-xs text-slate-600">
                      {isBengali ? 'ফোন' : 'Phone'}: <span className="font-mono font-medium">{currentInvoice.sellerDetails.phone}</span> • {isBengali ? 'ইমেইল' : 'Email'}: {currentInvoice.sellerDetails.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="border-2 border-slate-900 p-2 rounded-lg inline-block text-left bg-slate-50">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">GSTIN / UIN</p>
                      <p className="font-mono font-black text-sm text-slate-900">{currentInvoice.sellerDetails.gstin}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        {isBengali ? 'রাজ্য' : 'State'}: <strong className="text-slate-900">{currentInvoice.sellerDetails.stateCode}</strong> • PAN: <span className="font-mono">{currentInvoice.sellerDetails.pan}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Meta Grid */}
              <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-slate-200 text-xs">
                {/* Invoice Numbers */}
                <div className="space-y-1">
                  <div className="flex">
                    <span className="w-28 text-slate-500 font-semibold">{isBengali ? 'চালান নম্বর:' : 'Invoice No:'}</span>
                    <span className="font-mono font-bold text-slate-900">{currentInvoice.invoiceNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-slate-500 font-semibold">{isBengali ? 'চালানের তারিখ:' : 'Invoice Date:'}</span>
                    <span className="font-mono text-slate-800">{currentInvoice.invoiceDate}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-slate-500 font-semibold">{isBengali ? 'পরিশোধের তারিখ:' : 'Due Date:'}</span>
                    <span className="font-mono text-slate-800">{currentInvoice.dueDate}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-slate-500 font-semibold">{isBengali ? 'অর্ডার সূত্র:' : 'Order Ref:'}</span>
                    <span className="font-mono text-slate-800">{currentInvoice.orderNumber}</span>
                  </div>
                </div>

                {/* Billed To */}
                <div className="space-y-1 pl-4 border-l border-slate-200">
                  <p className="font-bold text-slate-500 uppercase text-[10px]">{isBengali ? 'প্রাপকের বিবরণ (বিল প্রাপক):' : 'Details of Receiver (Billed To):'}</p>
                  <p className="font-bold text-slate-900 text-sm">{currentInvoice.buyerName}</p>
                  <p className="text-slate-600 text-xs">{currentInvoice.buyerAddress}</p>
                  <p className="text-slate-600 text-xs">
                    {isBengali ? 'ফোন' : 'Phone'}: <span className="font-mono">{currentInvoice.buyerPhone}</span>
                  </p>
                  <p className="text-slate-700 text-xs font-semibold">
                    GSTIN: <span className="font-mono text-slate-900">{currentInvoice.buyerGstin || (isBengali ? 'অনিবন্ধিত / ক্রেতা' : 'Unregistered / Consumer')}</span>
                  </p>
                </div>
              </div>

              {/* Invoice Line Items Table */}
              <div className="border border-slate-300 rounded-lg overflow-hidden mb-4">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-300">
                    <tr>
                      <th className="py-2 px-3 w-8">#</th>
                      <th className="py-2 px-3">{isBengali ? 'হার্ডওয়্যার পণ্যের বিবরণ' : 'Description of Hardware Goods'}</th>
                      <th className="py-2 px-2">HSN</th>
                      <th className="py-2 px-2 text-right">{isBengali ? 'পরিমাণ' : 'Qty'}</th>
                      <th className="py-2 px-2">{isBengali ? 'একক' : 'Unit'}</th>
                      <th className="py-2 px-2 text-right">{isBengali ? 'দর (₹)' : 'Rate (₹)'}</th>
                      <th className="py-2 px-2 text-right">{isBengali ? 'ট্যাক্সেবল (₹)' : 'Taxable (₹)'}</th>
                      <th className="py-2 px-2 text-right">GST %</th>
                      <th className="py-2 px-3 text-right">{isBengali ? 'মোট (₹)' : 'Total (₹)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentInvoice.items.map((item, idx) => {
                      const itemTax = (item.total * item.gstRate) / 100;
                      const lineTotal = item.total + itemTax;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 text-slate-400 font-mono">{idx + 1}</td>
                          <td className="py-2 px-3 font-semibold text-slate-900">
                            <div>{item.productName}</div>
                            <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                          </td>
                          <td className="py-2 px-2 font-mono text-slate-700">{item.hsnCode}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold">{item.quantity}</td>
                          <td className="py-2 px-2 text-slate-600">{item.unit}</td>
                          <td className="py-2 px-2 text-right font-mono">{item.unitPrice.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-2 text-right font-mono font-semibold">{item.total.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-2 text-right font-mono">{item.gstRate}%</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                            {lineTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tax Computation Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 mb-4 border-b border-slate-200 text-xs">
                {/* Bank Details & QR */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                    {isBengali ? 'ইলেকট্রনিক NEFT / RTGS / UPI ব্যাংক বিবরণ' : 'Bank Details for Electronic NEFT / RTGS / UPI'}
                  </p>
                  <p className="text-slate-700">{isBengali ? 'ব্যাংকের নাম' : 'Bank Name'}: <strong className="text-slate-900">{currentInvoice.sellerDetails.bankName}</strong></p>
                  <p className="text-slate-700">{isBengali ? 'অ্যাকাউন্ট নং' : 'Account No'}: <span className="font-mono font-bold text-slate-900">{currentInvoice.sellerDetails.accountNo}</span></p>
                  <p className="text-slate-700">{isBengali ? 'আইএফএসসি কোড' : 'IFSC Code'}: <span className="font-mono font-bold text-slate-900">{currentInvoice.sellerDetails.ifsc}</span></p>
                  <p className="text-slate-700">{isBengali ? 'শাখা' : 'Branch'}: <span>{currentInvoice.sellerDetails.branch}</span></p>
                  <p className="text-slate-700">UPI VPA: <span className="font-mono font-bold text-amber-700">{FIRM_DETAILS.bankDetails.upiId}</span></p>
                </div>

                {/* Totals Table */}
                <div className="space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">{isBengali ? 'মোট করযোগ্য মূল্য:' : 'Total Taxable Value:'}</span>
                    <span className="font-mono font-bold text-slate-900">₹{currentInvoice.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">CGST ({isBengali ? 'কেন্দ্রীয় কর' : 'Central Tax'} 9% / 6%):</span>
                    <span className="font-mono font-bold text-slate-900">₹{currentInvoice.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">SGST ({isBengali ? 'পশ্চিমবঙ্গ কর' : 'West Bengal Tax'} 9% / 6%):</span>
                    <span className="font-mono font-bold text-slate-900">₹{currentInvoice.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black">
                    <span className="text-slate-900">{isBengali ? 'সর্বমোট (চালান মূল্য):' : 'Grand Total (Invoice Value):'}</span>
                    <span className="font-mono text-base text-amber-800">
                      ₹{currentInvoice.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Signatures & Declarations */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <p className="font-bold text-slate-700 uppercase text-[10px]">{isBengali ? 'ঘোষণাপত্র:' : 'Declaration:'}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    {isBengali
                      ? 'আমরা ঘোষণা করছি যে এই চালানে বর্ণিত হার্ডওয়্যার পণ্যগুলির প্রকৃত মূল্য প্রদর্শিত হয়েছে এবং সমস্ত বিবরণ সত্য ও সঠিক। কেবলমাত্র কলকাতা বিচারক্ষেত্রের অধীন।'
                      : 'We declare that this invoice shows the actual price of the hardware goods described and that all particulars are true and correct. Subject to Kolkata jurisdiction only. Interest @18% p.a. will be charged if payment is not received within agreed credit terms.'}
                  </p>
                </div>

                <div className="text-right flex flex-col justify-between items-end h-24">
                  <p className="font-bold text-slate-900 text-xs">For GUNADHAR MAITY & SONS</p>
                  <div>
                    <div className="w-36 border-b border-slate-400 mb-1 ml-auto"></div>
                    <p className="text-[11px] font-semibold text-slate-700">{isBengali ? 'অনুমোদিত স্বাক্ষরকারী / অংশীদার' : 'Authorised Signatory / Partner'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3" />
              <p className="text-sm font-semibold">{isBengali ? 'বিবরণ দেখতে লেজার থেকে একটি চালান নির্বাচন করুন।' : 'Select an invoice from the ledger to view details.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

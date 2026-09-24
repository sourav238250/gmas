import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Order, OrderStatus } from '../types/index.ts';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MapPin, 
  Phone, 
  RotateCcw, 
  Send, 
  AlertCircle,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { FIRM_DETAILS } from '../data/initialData.ts';

interface CustomerPortalProps {
  onViewInvoice: (invoiceId: string) => void;
  onOpenCatalog: () => void;
}

const ORDER_STEPS: OrderStatus[] = ['Pending', 'Confirmed', 'Packing', 'Dispatched', 'Delivered'];

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  onViewInvoice,
  onOpenCatalog
}) => {
  const { orders, addToCart, products, updateOrderStatus } = useStore();
  const { currentUser } = useAuth();
  const { t, isBengali } = useLanguage();

  // If customer is logged in, show their orders; if admin, show all orders with ability to advance stage
  const customerOrders = currentUser?.role === 'customer'
    ? orders.filter(o => o.customerId === currentUser.id || o.customerEmail === currentUser.email)
    : orders;

  const [selectedOrderId, setSelectedOrderId] = useState<string>(customerOrders[0]?.id || '');
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || customerOrders[0];

  const getStepName = (step: OrderStatus) => {
    if (!isBengali) return step;
    switch (step) {
      case 'Pending': return t('stepPending');
      case 'Confirmed': return t('stepConfirmed');
      case 'Packing': return t('stepPacking');
      case 'Dispatched': return t('stepDispatched');
      case 'Delivered': return t('stepDelivered');
      default: return step;
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Confirmed': return 1;
      case 'Packing': return 2;
      case 'Dispatched': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return -1;
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity);
      }
    });
    alert(isBengali ? `${order.orderNumber} এর সমস্ত আইটেম আপনার বর্তমান অর্ডারে যুক্ত করা হয়েছে!` : `Added all items from ${order.orderNumber} to your current order cart!`);
    onOpenCatalog();
  };

  const handleCustomInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySuccess(true);
    setInquiryText('');
    setTimeout(() => setInquirySuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t('customerPortalTitle')}
            </h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
              {isBengali ? 'রিয়েল-টাইম ট্র্যাকিং' : 'Real-Time Tracking'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('customerPortalSub')}
          </p>
        </div>

        <button
          onClick={onOpenCatalog}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>{t('newOrderBtn')}</span>
        </button>
      </div>

      {/* Grid: Order History & Active Order Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Orders History List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('yourOrders')} ({customerOrders.length})
            </span>
            <span className="text-[11px] text-slate-500 font-medium">{t('clickToTrack')}</span>
          </div>

          {customerOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
              <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">{isBengali ? 'কোনো পূর্ববর্তী অর্ডার পাওয়া যায়নি' : 'No past orders found'}</p>
              <button
                onClick={onOpenCatalog}
                className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                {isBengali ? 'প্রথম অর্ডার করুন' : 'Place your first order'}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
              {customerOrders.map(order => {
                const isSelected = order.id === selectedOrder?.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {getStepName(order.status)}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 truncate">
                      {order.customerName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} {isBengali ? 'আইটেম' : 'items'}
                    </p>

                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {order.paymentMethod}
                      </span>
                      <span className="font-mono font-extrabold text-slate-900">
                        ₹{order.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Hardware Quotation Request Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('requestCustomQuote')}</h4>
                <p className="text-[10px] text-slate-500">{t('requestCustomQuoteSub')}</p>
              </div>
            </div>

            {inquirySuccess ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                {t('indentSubmittedMsg')}
              </div>
            ) : (
              <form onSubmit={handleCustomInquiry} className="space-y-2">
                <textarea
                  rows={2}
                  required
                  value={inquiryText}
                  onChange={e => setInquiryText(e.target.value)}
                  placeholder={isBengali ? 'যেমন: লয়েডস টেস্ট সার্টিফিকেট সহ ৫০০ মিটার ৩২ মিমি স্টিল তারের দড়ি প্রয়োজন...' : "e.g. Need 500m of 32mm steel wire rope with Lloyd's test certificate..."}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  {t('sendInquiryBtn')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Active Order Details & Stepper Tracking */}
        <div className="lg:col-span-8">
          {selectedOrder ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                    {isBengali ? 'অর্ডার সূত্র:' : 'Order Ref:'} {selectedOrder.orderNumber}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {t('orderTrackingTimeline')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBengali ? 'অর্ডারের সময়' : 'Placed on'} {new Date(selectedOrder.createdAt).toLocaleDateString()} {isBengali ? 'সময়' : 'at'}{' '}
                    {new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedOrder.invoiceId && (
                    <button
                      onClick={() => onViewInvoice(selectedOrder.invoiceId!)}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t('viewInvoiceBtn')}</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    title="Add all items to cart again"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t('reorderBtn')}</span>
                  </button>
                </div>
              </div>

              {/* Status Stepper Progression */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5">
                  {t('milestoneProgression')}
                </p>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-0">
                    <div
                      className="h-full bg-amber-600 transition-all duration-500"
                      style={{
                        width: `${(Math.max(0, getStepIndex(selectedOrder.status)) / (ORDER_STEPS.length - 1)) * 100}%`
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="relative z-10 flex justify-between">
                    {ORDER_STEPS.map((step, idx) => {
                      const currentIdx = getStepIndex(selectedOrder.status);
                      const isComplete = currentIdx >= idx;
                      const isCurrent = currentIdx === idx;

                      return (
                        <div key={step} className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isComplete
                                ? 'bg-amber-600 text-white ring-4 ring-amber-100'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            }`}
                          >
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span
                            className={`text-[11px] font-semibold mt-2 ${
                              isCurrent ? 'text-amber-800 font-bold' : isComplete ? 'text-slate-800' : 'text-slate-400'
                            }`}
                          >
                            {getStepName(step)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Admin Status Overriding (If logged in as Admin) */}
                {currentUser?.role === 'admin' && (
                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-slate-600">{isBengali ? 'অ্যাডমিন নিয়ন্ত্রণ: স্ট্যাটাস পরিবর্তন' : 'Admin Control: Update Dispatch Stage'}</span>
                    <div className="flex gap-1.5">
                      {ORDER_STEPS.map(step => (
                        <button
                          key={step}
                          onClick={() => updateOrderStatus(selectedOrder.id, step)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                            selectedOrder.status === step
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {getStepName(step)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Site & Contact Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <p className="font-bold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {t('deliverySiteAddress')}
                  </p>
                  <p className="font-bold text-slate-900">{selectedOrder.customerName}</p>
                  <p className="text-slate-600">{selectedOrder.shippingAddress}</p>
                  {selectedOrder.customerGstin && (
                    <p className="text-slate-500 font-mono text-[11px]">GSTIN: {selectedOrder.customerGstin}</p>
                  )}
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <p className="font-bold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {t('deliveryLogisticsNotes')}
                  </p>
                  <p className="text-slate-700">
                    {t('estimatedDelivery')}: <strong className="text-emerald-700">{selectedOrder.estimatedDelivery}</strong>
                  </p>
                  <p className="text-slate-700">
                    {isBengali ? 'পিও নম্বর' : 'PO Number'}: <span className="font-mono font-bold text-slate-900">{selectedOrder.poNumber || 'N/A'}</span>
                  </p>
                  {selectedOrder.notes && (
                    <p className="text-slate-500 italic text-[11px]">
                      "{selectedOrder.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Items List in this Order */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {t('orderedItems')} ({selectedOrder.items.length})
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">{isBengali ? 'বিবরণ' : 'Description'}</th>
                        <th className="py-2.5 px-2">HSN</th>
                        <th className="py-2.5 px-2 text-right">{isBengali ? 'পরিমাণ' : 'Quantity'}</th>
                        <th className="py-2.5 px-2 text-right">{isBengali ? 'একক দর (₹)' : 'Unit Rate (₹)'}</th>
                        <th className="py-2.5 px-3 text-right">{isBengali ? 'মোট করযোগ্য (₹)' : 'Taxable Total (₹)'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            <div>{item.productName}</div>
                            <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                          </td>
                          <td className="py-2.5 px-2 font-mono text-slate-600">{item.hsnCode}</td>
                          <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                            ₹{item.unitPrice.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                            ₹{item.total.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Summary Footer */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="text-slate-500">
                    {isBengali ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}: <strong className="text-slate-900">{selectedOrder.paymentMethod}</strong> • {isBengali ? 'স্থিতি' : 'Status'}:{' '}
                    <span className="font-bold text-amber-700">{selectedOrder.paymentStatus}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isBengali ? 'অন্তর্ভুক্ত' : 'Includes'} ₹{selectedOrder.taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })} GST (CGST + SGST)
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-slate-500 text-[11px]">{isBengali ? 'সর্বমোট চালান মূল্য' : 'Total Invoice Value'}</p>
                  <p className="text-lg font-black text-slate-900 font-mono">
                    ₹{selectedOrder.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <Package className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold">{isBengali ? 'লাইভ ট্র্যাকিং দেখতে তালিকা থেকে একটি অর্ডার নির্বাচন করুন।' : 'Select an order from the list to view live tracking.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

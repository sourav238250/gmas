import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ShoppingBag,
  CreditCard,
  Building,
  Truck
} from 'lucide-react';
import { Order } from '../types/index.ts';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewInvoice: (invoiceId: string) => void;
  onViewPortal: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  onViewInvoice,
  onViewPortal
}) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, createOrder } = useStore();
  const { currentUser } = useAuth();
  const { t, isBengali } = useLanguage();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Checkout form fields
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Amitava Roy (Roy Infra)');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '9830114522');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'procurement@royinfra.com');
  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Bengal Bridge & Infrastructure Ltd.');
  const [customerGstin, setCustomerGstin] = useState(currentUser?.gstin || '19AAACB9012K1Z5');
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || 'Site Yard No. 4, Vidyasagar Setu Approach, Howrah - 711102');
  const [billingAddress, setBillingAddress] = useState(currentUser?.address || 'Sector V, Salt Lake City, Kolkata - 700091');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('30-Day Credit');
  const [poNumber, setPoNumber] = useState('PO/BBI/2026/099');
  const [notes, setNotes] = useState('Dispatch with calibrated test certificate & delivery challan duplicate copy.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Calculate live taxes
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalTax = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity * item.product.gstRate) / 100;
  }, 0);
  const cgst = totalTax / 2;
  const sgst = totalTax / 2;
  const grandTotal = subtotal + totalTax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Add items from the catalog.');
      return;
    }

    if (!customerName || !customerPhone || !shippingAddress) {
      setErrorMessage('Please fill in required fields: Name, Phone, and Delivery Address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newOrder = createOrder({
        customerId: currentUser?.id || 'usr-guest-customer',
        customerName: companyName ? `${customerName} (${companyName})` : customerName,
        customerPhone,
        customerEmail,
        customerGstin,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        paymentMethod,
        poNumber,
        notes
      });

      setCreatedOrder(newOrder);
      setStep('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('cart');
    setCreatedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              {isBengali ? 'গু' : 'GM'}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {step === 'cart' && t('cartTitle')}
                {step === 'checkout' && t('checkoutTitle')}
                {step === 'success' && t('successTitle')}
              </h2>
              <p className="text-[11px] text-slate-300">
                {t('firmName')} • {isBengali ? '৭৬/বি নেতাজী সুভাষ রোড, কলকাতা' : '76/B Netaji Subhas Road, Kolkata'}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === 'cart' && (
            <div className="space-y-5">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">{t('cartEmpty')}</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    {t('cartEmptySub')}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700"
                  >
                    {t('browseCatalogBtn')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {cart.map(item => (
                      <div key={item.product.id} className="p-3.5 sm:p-4 bg-white flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
                            {item.product.imageUrl ? (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                                HW
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              HSN {item.product.hsnCode} • {item.product.sku}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              ₹{item.product.price} / {item.product.unit} • (+{item.product.gstRate}% GST)
                            </p>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="w-9 text-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <p className="text-xs font-bold text-slate-900">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </p>
                            <span className="text-[10px] text-slate-400">{item.product.unit}</span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Breakdown */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>{t('taxableValue')}:</span>
                      <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{t('cgstLabel')}:</span>
                      <span className="font-semibold text-slate-900">₹{cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{t('sgstLabel')}:</span>
                      <span className="font-semibold text-slate-900">₹{sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                      <span>{t('totalInvoiceValue')}:</span>
                      <span className="text-amber-700 font-mono text-base">
                        ₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('clientName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('phoneDispatch')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('companyName')}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder={isBengali ? 'যেমন: বেঙ্গল ব্রিজ অ্যান্ড ইনফ্রাস্ট্রাকচার' : 'e.g. Bengal Bridge & Infrastructure Ltd.'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('gstinLabel')}
                  </label>
                  <input
                    type="text"
                    value={customerGstin}
                    onChange={e => setCustomerGstin(e.target.value.toUpperCase())}
                    placeholder="19AAACB9012K1Z5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('deliverySiteLocation')}
                </label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  placeholder={isBengali ? 'সম্পূর্ণ প্রজেক্ট সাইট বা আনলোডিং গুদামের ঠিকানা' : 'Complete project site or warehouse location'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('poNumberLabel')}
                  </label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={e => setPoNumber(e.target.value)}
                    placeholder="e.g. PO/2026/0412"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('paymentMethodLabel')}
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="30-Day Credit">{isBengali ? '৩০ দিনের ট্রেড ক্রেডিট (স্ট্যান্ডার্ড)' : '30-Day Credit (Standard Trade Term)'}</option>
                    <option value="NEFT/RTGS">{isBengali ? 'এনইএফটি / আরটিজিএস ব্যাংক ট্রান্সফার' : 'NEFT / RTGS Bank Transfer'}</option>
                    <option value="UPI">{isBengali ? 'ইউপিআই ইনস্ট্যান্ট পেমেন্ট' : 'UPI Instant Payment'}</option>
                    <option value="Cheque">{isBengali ? 'অ্যাকাউন্ট পেয়ি চেক' : 'Account Payee Cheque'}</option>
                    <option value="Cash on Delivery">{isBengali ? 'ক্যাশ অন কাউন্টার / ডেলিভারি' : 'Cash on Counter / Delivery'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('specialInstructions')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={isBengali ? 'যেমন: টেস্ট সার্টিফিকেট আবশ্যক, সকালে ডেলিভারি...' : 'e.g. Test certificate required, deliver in morning...'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Order total confirmation bar */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-amber-900 font-semibold">{t('immediateStockReservation')}</p>
                  <p className="text-[11px] text-amber-800">
                    {t('immediateStockNote')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-amber-900 font-medium">{isBengali ? 'চূড়ান্ত পরিমাণ' : 'Final Amount'}</p>
                  <p className="text-sm font-extrabold text-slate-900 font-mono">
                    ₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </form>
          )}

          {step === 'success' && createdOrder && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {t('orderPlacedSuccess')}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t('orderNumberLabel')}: <span className="font-mono font-bold text-slate-900">{createdOrder.orderNumber}</span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isBengali ? 'ইনভয়েস নম্বর:' : 'Invoice Reference:'}</span>
                  <span className="font-mono font-bold text-slate-900">
                    GMS/TAX-INV/26-27/{createdOrder.orderNumber.split('/').pop()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isBengali ? 'ক্রেতার নাম:' : 'Billed To:'}</span>
                  <span className="font-bold text-slate-900">{createdOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isBengali ? 'মোট টাকা:' : 'Total Amount:'}</span>
                  <span className="font-bold text-amber-700">₹{createdOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isBengali ? 'পেমেন্টের শর্ত:' : 'Payment Terms:'}</span>
                  <span className="font-bold text-slate-900">{createdOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isBengali ? 'সম্ভাব্য সরবরাহ:' : 'Estimated Delivery:'}</span>
                  <span className="font-bold text-emerald-700">{createdOrder.estimatedDelivery}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                {createdOrder.invoiceId && (
                  <button
                    onClick={() => {
                      onViewInvoice(createdOrder.invoiceId!);
                      onClose();
                    }}
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t('viewPrintGstInvoice')}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onViewPortal();
                    onClose();
                  }}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('trackInPortal')}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 'success' && (
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            {step === 'cart' ? (
              <>
                <button
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold disabled:opacity-40"
                >
                  {t('clearCart')}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    {t('continueBrowsing')}
                  </button>
                  <button
                    onClick={() => setStep('checkout')}
                    disabled={cart.length === 0}
                    className="bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <span>{t('proceedToBilling')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep('cart')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {t('backToCart')}
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isSubmitting ? t('confirmingOrder') : t('confirmOrderBtn')}</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

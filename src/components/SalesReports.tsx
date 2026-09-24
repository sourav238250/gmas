import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  TrendingUp, 
  IndianRupee, 
  Package, 
  CreditCard, 
  Download, 
  Calendar, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface SalesReportsProps {
  onViewInvoice: (invoiceId: string) => void;
}

export const SalesReports: React.FC<SalesReportsProps> = ({ onViewInvoice }) => {
  const { orders, invoices, products } = useStore();
  const { t, isBengali } = useLanguage();
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'month'>('all');

  const getCategoryName = (cat: string): string => {
    if (!isBengali) return cat;
    switch (cat) {
      case 'Fasteners & Bolts': return t('catFasteners');
      case 'Valves & Pipe Fittings': return t('catValves');
      case 'Wire Ropes & Rigging': return t('catWireRopes');
      case 'Power Tools & Abrasives': return t('catPowerTools');
      case 'Industrial Safety': return t('catSafety');
      case 'General Hardware': return t('catGeneral');
      default: return cat;
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalOrders = orders.length;
  const paidOrdersTotal = orders
    .filter(o => o.paymentStatus === 'Paid')
    .reduce((sum, ord) => sum + ord.totalAmount, 0);
  const creditOutstanding = orders
    .filter(o => o.paymentStatus === 'Credit-30Days')
    .reduce((sum, ord) => sum + ord.totalAmount, 0);

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Category revenue calculation
  const categoryStats = useMemo(() => {
    const stats: Record<string, { count: number; revenue: number }> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        const cat = prod?.category || 'General Hardware';
        if (!stats[cat]) {
          stats[cat] = { count: 0, revenue: 0 };
        }
        stats[cat].count += item.quantity;
        stats[cat].revenue += item.total;
      });
    });
    return Object.entries(stats).sort((a, b) => b[1].revenue - a[1].revenue);
  }, [orders, products]);

  // Top products
  const topProducts = useMemo(() => {
    const prodMap: Record<string, { name: string; sku: string; units: number; revenue: number }> = {};
    orders.forEach(o => {
      o.items.forEach(i => {
        if (!prodMap[i.productId]) {
          prodMap[i.productId] = { name: i.productName, sku: i.sku, units: 0, revenue: 0 };
        }
        prodMap[i.productId].units += i.quantity;
        prodMap[i.productId].revenue += i.total;
      });
    });
    return Object.values(prodMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [orders]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer', 'Items Count', 'Subtotal (INR)', 'GST Tax (INR)', 'Total (INR)', 'Status', 'Payment Terms'];
    const rows = orders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName.replace(/"/g, '""')}"`,
      o.items.length,
      o.subtotal,
      o.taxAmount,
      o.totalAmount,
      o.status,
      o.paymentMethod
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gunadhar_Maity_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Title & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t('salesReportsTitle')}
            </h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
              {isBengali ? 'লাইভ নিরীক্ষিত' : 'Live Audited'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('salesReportsSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
          >
            <option value="all">{isBengali ? 'সমগ্র আর্থিক বছর' : 'All-Time Fiscal Year'}</option>
            <option value="month">{isBengali ? 'চলতি মাস (সেপ্টেম্বর ২০২৬)' : 'Current Month (Sep 2026)'}</option>
            <option value="today">{isBengali ? 'আজ' : 'Today'}</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{t('exportCsvBtn')}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('grossTurnover')}</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{isBengali ? '১৮% / ১২% জিএসটি ট্যাক্স অন্তর্ভুক্ত' : 'Includes 18% / 12% GST collections'}</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('totalOrders')}</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {totalOrders}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBengali ? 'গড় অর্ডার মূল্য' : 'Avg order value'}: <strong>₹{Math.round(avgOrderValue).toLocaleString('en-IN')}</strong>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('paidSettled')}</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">
            ₹{paidOrdersTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBengali ? 'ইউপিআই, আরটিজিএস ও নগদ কাউন্টার' : 'Via UPI, RTGS & Counter Cash'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('tradeCredit')}</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-700 font-mono">
            ₹{creditOutstanding.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBengali ? 'ঠিকাদারদের থেকে আদায় প্রক্রিয়াধীন' : 'Pending realization from contractors'}
          </p>
        </div>
      </div>

      {/* Grid: Category Breakdown & Top Selling Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Turnover */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-600" />
            {t('categoryTurnover')}
          </h3>
          <div className="space-y-4">
            {categoryStats.map(([category, data]) => {
              const percentage = totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{getCategoryName(category)}</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{data.revenue.toLocaleString('en-IN')} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Best Selling Hardware Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            {t('topSellingProducts')}
          </h3>
          <div className="divide-y divide-slate-100">
            {topProducts.map((p, idx) => (
              <div key={p.sku} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{p.name}</p>
                    <p className="text-[11px] font-mono text-slate-500">
                      SKU: {p.sku} • {p.units} {isBengali ? 'টি অর্ডারকৃত' : 'units ordered'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-900">₹{p.revenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Transaction Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">{t('recentSalesLedger')}</h3>
            <p className="text-xs text-slate-500">{isBengali ? 'জিএসটি চালান এবং ডেলিভারি স্থিতির সরাসরি লিঙ্ক' : 'Direct link to GST invoices and dispatch status'}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">{t('thOrderPo')}</th>
                <th className="py-3 px-3">{t('thDate')}</th>
                <th className="py-3 px-4">{t('thClientOrg')}</th>
                <th className="py-3 px-3">{t('thOrderItems')}</th>
                <th className="py-3 px-3">{t('thTotalInclGst')}</th>
                <th className="py-3 px-3">{t('thPaymentTerms')}</th>
                <th className="py-3 px-3">{t('thStatus')}</th>
                <th className="py-3 px-3 text-right">{t('thTaxInvoice')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    <div>{order.orderNumber}</div>
                    {order.poNumber && (
                      <span className="text-[10px] text-amber-700 font-semibold">
                        PO: {order.poNumber}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">{order.shippingAddress}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {order.items.length} {isBengali ? 'আইটেম' : 'items'} ({order.items.reduce((s, i) => s + i.quantity, 0)} {isBengali ? 'পিস' : 'units'})
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-slate-900">
                    ₹{order.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      order.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {order.invoiceId ? (
                      <button
                        onClick={() => onViewInvoice(order.invoiceId!)}
                        className="text-amber-700 hover:text-amber-900 font-bold text-xs flex items-center justify-end gap-1 ml-auto"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t('viewInvoiceBtn')}</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[10px]">{isBengali ? 'প্রক্রিয়াধীন' : 'Pending'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

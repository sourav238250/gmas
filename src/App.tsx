import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { StoreProvider } from './context/StoreContext.tsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { StockDashboard } from './components/StockDashboard.tsx';
import { SalesReports } from './components/SalesReports.tsx';
import { SupplierManagement } from './components/SupplierManagement.tsx';
import { InvoiceViewer } from './components/InvoiceViewer.tsx';
import { CustomerPortal } from './components/CustomerPortal.tsx';
import { CartCheckoutModal } from './components/CartCheckoutModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { FIRM_DETAILS } from './data/initialData.ts';
import { Phone, MapPin, Mail, Shield, CheckCircle2 } from 'lucide-react';

function MainApp() {
  const { t, isBengali } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('catalog');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setActiveTab('invoices');
  };

  const handleViewPortal = () => {
    setActiveTab('portal');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 antialiased selection:bg-amber-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'catalog' && (
          <ProductCatalog onOpenCart={() => setIsCartOpen(true)} />
        )}

        {activeTab === 'inventory' && (
          <StockDashboard onGoToSuppliers={() => setActiveTab('suppliers')} />
        )}

        {activeTab === 'reports' && (
          <SalesReports onViewInvoice={handleViewInvoice} />
        )}

        {activeTab === 'suppliers' && (
          <SupplierManagement />
        )}

        {activeTab === 'invoices' && (
          <InvoiceViewer
            selectedInvoiceId={selectedInvoiceId}
            onClearSelection={() => setSelectedInvoiceId(null)}
          />
        )}

        {activeTab === 'portal' && (
          <CustomerPortal
            onViewInvoice={handleViewInvoice}
            onOpenCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Modals */}
      <CartCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onViewInvoice={handleViewInvoice}
        onViewPortal={handleViewPortal}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Footer (Hidden on print) */}
      <footer className="no-print bg-slate-900 text-slate-300 border-t border-slate-800 pt-10 pb-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
            {/* Firm info */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  GM
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base leading-tight">
                    {FIRM_DETAILS.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {FIRM_DETAILS.tagline}
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed max-w-md text-xs">
                Premier suppliers of high-tensile fasteners, valves, wire ropes, power tools, and industrial order supplies to fabrication units, ports, and construction engineering companies across Eastern India.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                  GSTIN: <strong className="text-amber-300">{FIRM_DETAILS.gstin}</strong>
                </span>
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                  State: <strong className="text-slate-200">{FIRM_DETAILS.stateCode}</strong>
                </span>
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                  PAN: <strong className="text-slate-200">{FIRM_DETAILS.pan}</strong>
                </span>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                Kolkata Registered Office
              </h4>
              <p className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {FIRM_DETAILS.address},<br />
                  {FIRM_DETAILS.locality}
                </span>
              </p>
              <div className="pt-1 space-y-1">
                <p className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono">{FIRM_DETAILS.phones[0]}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono">{FIRM_DETAILS.phones[1]}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{FIRM_DETAILS.email}</span>
                </p>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                {isBengali ? 'বিভাগসমূহ' : 'Business Portals'}
              </h4>
              <ul className="space-y-1 text-slate-400">
                <li>
                  <button onClick={() => setActiveTab('catalog')} className="hover:text-amber-400 transition-colors">
                    {t('navCatalog')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('inventory')} className="hover:text-amber-400 transition-colors">
                    {t('navInventory')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('reports')} className="hover:text-amber-400 transition-colors">
                    {t('navReports')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('invoices')} className="hover:text-amber-400 transition-colors">
                    {t('navInvoices')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('portal')} className="hover:text-amber-400 transition-colors">
                    {t('navCustomerPortal')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>
              © 2026 GUNADHAR MAITY & SONS. {isBengali ? 'সর্বস্বত্ব সংরক্ষিত। জেনারেল অর্ডার সাপ্লায়ার্স, কলকাতা।' : 'All Rights Reserved. General Order Suppliers, Kolkata.'}
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBengali ? 'জিএসটি নিবন্ধিত বাণিজ্যিক প্রতিষ্ঠান' : 'GST Registered Merchant'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>IS / DIN {isBengali ? 'মানানসই হার্ডওয়্যার' : 'Compliant Hardware'}</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <StoreProvider>
          <MainApp />
        </StoreProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

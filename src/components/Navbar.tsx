import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { FIRM_DETAILS } from '../data/initialData.ts';
import { 
  Phone, 
  MapPin, 
  ShoppingCart, 
  User, 
  LogOut, 
  Layers, 
  Package, 
  TrendingUp, 
  Truck, 
  FileText, 
  UserCheck, 
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { Role } from '../types/index.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCart,
  onOpenAuth
}) => {
  const { currentUser, logout, switchRole } = useAuth();
  const { cartItemCount, lowStockProducts, resetToDefaults } = useStore();
  const { language, setLanguage, t, isBengali } = useLanguage();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'admin':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-2 py-0.5 rounded text-xs">{t('adminRole')}</span>;
      case 'supplier':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 font-semibold px-2 py-0.5 rounded text-xs">{t('supplierRole')}</span>;
      case 'customer':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold px-2 py-0.5 rounded text-xs">{t('customerRole')}</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner with Kolkata Address & Contact */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium text-amber-400">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{isBengali ? `${t('firmAddress')}, ${t('firmLocality')}` : `${FIRM_DETAILS.address}, ${FIRM_DETAILS.locality}`}</span>
          </span>
          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <a href={`tel:${FIRM_DETAILS.phones[0].replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
              {FIRM_DETAILS.phones[0]}
            </a>
            <span>/</span>
            <a href={`tel:${FIRM_DETAILS.phones[1].replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
              {FIRM_DETAILS.phones[1]}
            </a>
          </span>
          <span className="hidden lg:inline-block text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-300">
            GSTIN: <span className="font-mono text-amber-300">{FIRM_DETAILS.gstin}</span>
          </span>
        </div>

        {/* Quick Demo Switcher, Language Switcher & Reset */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Language Toggle Button */}
          <div className="flex items-center bg-amber-500/20 border border-amber-400/40 rounded-lg p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all flex items-center gap-1 ${
                language === 'bn'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="বাংলা সংস্করণে পরিবর্তন করুন"
            >
              বাংলা
            </button>
          </div>

          <span className="text-slate-400 text-[11px] hidden sm:inline">{t('roleView')}:</span>
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <button
              onClick={() => switchRole('admin')}
              className={`px-2 py-0.5 text-[11px] rounded transition-all ${
                currentUser?.role === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Switch to Admin (Subrata Maity)"
            >
              {isBengali ? 'অ্যাডমিন' : 'Admin'}
            </button>
            <button
              onClick={() => switchRole('supplier')}
              className={`px-2 py-0.5 text-[11px] rounded transition-all ${
                currentUser?.role === 'supplier'
                  ? 'bg-blue-500 text-white font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Switch to Supplier (Tata Steel)"
            >
              {isBengali ? 'সাপ্লায়ার' : 'Supplier'}
            </button>
            <button
              onClick={() => switchRole('customer')}
              className={`px-2 py-0.5 text-[11px] rounded transition-all ${
                currentUser?.role === 'customer'
                  ? 'bg-emerald-500 text-white font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Switch to Customer (Roy Infra)"
            >
              {isBengali ? 'ক্রেতা' : 'Customer'}
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm(isBengali ? "সমস্ত ক্যাটালগ ও অর্ডার রিসেট করবেন?" : "Reset all catalog, orders, and inventory to initial demo state?")) {
                resetToDefaults();
              }
            }}
            title={isBengali ? "ডিফল্ট ডেটা রিসেট" : "Reset to default data"}
            className="text-slate-400 hover:text-amber-400 p-1 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navigation & Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('catalog')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md border border-amber-700 group-hover:bg-amber-700 transition-colors">
            {isBengali ? 'গু' : 'GM'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                {t('firmName')}
              </h1>
              <span className="hidden sm:inline-block text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 uppercase font-mono">
                {t('establishedText')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              {t('firmTagline')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Low Stock Warning Pill for Admins */}
          {currentUser?.role === 'admin' && lowStockProducts.length > 0 && (
            <button
              onClick={() => setActiveTab('inventory')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>{lowStockProducts.length} {t('lowStockAlertBadge')}</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            <ShoppingCart className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{t('orderCart')}</span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Account / Role dropdown */}
          <div className="relative">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showRoleMenu && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setShowRoleMenu(false)}
                  >
                    <div className="pb-2 mb-2 border-b border-slate-100">
                      <p className="font-semibold text-sm text-slate-900">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      {currentUser.companyName && (
                        <p className="text-xs text-amber-700 font-medium mt-0.5">{currentUser.companyName}</p>
                      )}
                      <div className="mt-1.5">{getRoleBadge(currentUser.role)}</div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                        {t('switchPersona')}
                      </p>
                      <button
                        onClick={() => {
                          switchRole('admin');
                          setShowRoleMenu(false);
                          setActiveTab('inventory');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                          currentUser.role === 'admin' ? 'bg-amber-50 text-amber-900 font-medium' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{isBengali ? 'সুব্রত মাইতি (অ্যাডমিন)' : 'Subrata Maity (Admin)'}</span>
                        {currentUser.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                      </button>
                      <button
                        onClick={() => {
                          switchRole('supplier');
                          setShowRoleMenu(false);
                          setActiveTab('suppliers');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                          currentUser.role === 'supplier' ? 'bg-blue-50 text-blue-900 font-medium' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{isBengali ? 'রাজেশ আগরওয়াল (সাপ্লায়ার)' : 'Rajesh Agarwal (Supplier)'}</span>
                        {currentUser.role === 'supplier' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                      <button
                        onClick={() => {
                          switchRole('customer');
                          setShowRoleMenu(false);
                          setActiveTab('portal');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                          currentUser.role === 'customer' ? 'bg-emerald-50 text-emerald-900 font-medium' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{isBengali ? 'অমিতাভ রায় (ক্রেতা / ঠিকাদার)' : 'Amitava Roy (Customer)'}</span>
                        {currentUser.role === 'customer' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setShowRoleMenu(false);
                          onOpenAuth();
                        }}
                        className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{t('manageAccount')}</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setShowRoleMenu(false);
                        }}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 border border-slate-300 hover:border-slate-400 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>{t('signIn')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="bg-slate-50 border-t border-slate-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'catalog'
                ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('navCatalog')}</span>
          </button>

          {/* Admin & Supplier tabs */}
          {(currentUser?.role === 'admin' || currentUser?.role === 'supplier') && (
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'inventory'
                  ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{t('navInventory')}</span>
              {lowStockProducts.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold">
                  {lowStockProducts.length}
                </span>
              )}
            </button>
          )}

          {/* Admin Sales Analytics */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'reports'
                  ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('navReports')}</span>
            </button>
          )}

          {/* Suppliers Tab (Admin & Supplier) */}
          {(currentUser?.role === 'admin' || currentUser?.role === 'supplier') && (
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'suppliers'
                  ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{currentUser?.role === 'supplier' ? t('navSupplierPortal') : t('navSuppliers')}</span>
            </button>
          )}

          {/* Invoicing Tab (Admin & Customer) */}
          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'invoices'
                ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t('navInvoices')}</span>
          </button>

          {/* Customer Portal */}
          <button
            onClick={() => setActiveTab('portal')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'portal'
                ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('navCustomerPortal')}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

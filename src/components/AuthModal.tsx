import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Role } from '../types/index.ts';
import { ShieldCheck, Truck, Building2, User, X, CheckCircle, Mail, Phone, Lock } from 'lucide-react';
import { FIRM_DETAILS } from '../data/initialData.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, loginAsDemo, currentUser } = useAuth();
  const { t, isBengali } = useLanguage();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Role>('customer');
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = login(email);
    if (ok) {
      onClose();
    } else {
      setError(
        isBengali
          ? 'এই ইমেইলে কোনো নিবন্ধিত অ্যাকাউন্ট পাওয়া যায়নি। নিচের এক-ক্লিক ডেমো লগইন ব্যবহার করুন বা নিবন্ধন করুন।'
          : 'No registered account found with that email. Try one-click demo login below or register.'
      );
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email) {
      setError(isBengali ? 'অনুগ্রহ করে আপনার নাম ও ইমেইল ঠিকানা প্রদান করুন।' : 'Please provide your name and email address.');
      return;
    }
    register({
      name,
      email,
      phone,
      role,
      companyName,
      gstin,
      address
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center">
              GM
            </div>
            <div>
              <h2 className="text-lg font-bold">{FIRM_DETAILS.name}</h2>
              <p className="text-xs text-slate-300">
                {isBengali ? 'প্রবেশাধিকার ও ভূমিকাভিত্তিক নিরাপত্তা ব্যবস্থা' : 'Authentication & Role-Based Access Control'}
              </p>
            </div>
          </div>
        </div>

        {/* Demo Fast-Switch Banner */}
        <div className="bg-amber-50 border-b border-amber-200 p-4">
          <p className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-amber-600" />
            {isBengali ? 'দ্রুত এক-ক্লিক ডেমো অ্যাকাউন্ট লগইন' : 'Quick One-Click Persona Login (Pre-configured Demo Accounts)'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => {
                loginAsDemo('admin');
                onClose();
              }}
              className="flex items-center gap-2 p-2 rounded-lg bg-white border border-amber-300 hover:border-amber-500 text-left hover:shadow-xs transition-all"
            >
              <div className="p-1.5 rounded-md bg-amber-100 text-amber-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{t('roleAdmin')}</p>
                <p className="text-[10px] text-slate-500">Subrata Maity</p>
              </div>
            </button>

            <button
              onClick={() => {
                loginAsDemo('supplier');
                onClose();
              }}
              className="flex items-center gap-2 p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-left hover:shadow-xs transition-all"
            >
              <div className="p-1.5 rounded-md bg-blue-100 text-blue-800">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{t('roleSupplier')}</p>
                <p className="text-[10px] text-slate-500">Tata Steel Corp</p>
              </div>
            </button>

            <button
              onClick={() => {
                loginAsDemo('customer');
                onClose();
              }}
              className="flex items-center gap-2 p-2 rounded-lg bg-white border border-emerald-200 hover:border-emerald-400 text-left hover:shadow-xs transition-all"
            >
              <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-800">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{t('roleCustomer')}</p>
                <p className="text-[10px] text-slate-500">Roy Infra Ltd</p>
              </div>
            </button>
          </div>
        </div>

        {/* Form Tabs */}
        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-5">
            <button
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
                tab === 'login'
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {isBengali ? 'অ্যাকাউন্টে লগইন' : 'Sign In to Account'}
            </button>
            <button
              onClick={() => {
                setTab('register');
                setError('');
              }}
              className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
                tab === 'register'
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {isBengali ? 'নতুন ব্যবসা নিবন্ধন' : 'Register New Organization'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBengali ? 'নিবন্ধিত ইমেইল ঠিকানা' : 'Registered Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. admin@gunadharmaity.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBengali ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {isBengali ? 'ডেমোর জন্য যেকোনো পাসওয়ার্ড বা সরাসরি ইমেইল গ্রহণ করা হবে।' : 'For demo, any password or direct email lookup is accepted.'}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-lg text-xs hover:bg-slate-800 transition-colors shadow-xs"
              >
                {t('login')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBengali ? 'অ্যাকাউন্টের ভূমিকা ধরন *' : 'Account Role Type *'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      role === 'customer'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t('roleCustomer')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('supplier')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      role === 'supplier'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t('roleSupplier')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      role === 'admin'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t('roleAdmin')}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBengali ? 'যোগাযোগকারীর নাম *' : 'Contact Person Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={isBengali ? 'পুরো নাম' : 'Full name'}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBengali ? 'ফোন নম্বর' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={isBengali ? '১০ সংখ্যার মোবাইল' : '10-digit mobile'}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBengali ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="company@domain.com"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBengali ? 'কোম্পানি / প্রতিষ্ঠানের নাম' : 'Company / Firm Name'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder={isBengali ? 'যেমন: বেঙ্গল ইঞ্জিনিয়ারিং লি.' : 'e.g. Bengal Engineering Ltd.'}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBengali ? 'জিএসটিআইএন (ট্যাক্স চালানের জন্য)' : 'GSTIN (For Tax Invoices)'}
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={e => setGstin(e.target.value.toUpperCase())}
                    placeholder="19AAAAA0000A1Z5"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBengali ? 'ডেলিভারি / বিলিং ঠিকানা' : 'Delivery / Billing Address'}
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={isBengali ? 'রাস্তা, শহর, পিন কোড' : 'Street, City, Pin Code'}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-xs"
              >
                {isBengali ? 'অ্যাকাউন্ট তৈরি করুন ও প্রবেশ করুন' : 'Create Account & Sign In'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

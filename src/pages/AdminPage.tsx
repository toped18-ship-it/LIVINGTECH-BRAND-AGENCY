import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Home,
  Sparkles,
} from 'lucide-react';
import { AdminStore } from '../services/adminStore';
import { navigateTo } from '../utils/navigation';
import { BUSINESS_CONFIG } from '../config/business';

interface AdminPageProps {
  onLoginSuccess: () => void;
  onBackToSite?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter the administrator password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = AdminStore.login(password);
      setIsLoading(false);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Incorrect password. Default master key: livingtech2026');
      }
    }, 200);
  };

  const handleUseDemo = () => {
    setPassword('livingtech2026');
    setError('');
  };

  const handleReturnHome = () => {
    if (onBackToSite) {
      onBackToSite();
    } else {
      navigateTo('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Return Link */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
        <button
          type="button"
          onClick={handleReturnHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span>Return to Website</span>
        </button>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        {/* Main Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Header & Shield Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-lg shadow-cyan-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrative Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LivingTech Control Hub
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Authorized management console for {BUSINESS_CONFIG.ownerName} & LivingTech staff.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter administrator password"
                  className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border ${
                    error
                      ? 'border-rose-500 ring-1 ring-rose-500'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  } text-sm text-white placeholder-slate-500 focus:outline-none transition-all pr-12`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Default Master Key Helper */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Default key: </span>
                <code className="text-cyan-300 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  livingtech2026
                </code>
              </div>
              <button
                type="button"
                onClick={handleUseDemo}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
              >
                Fill Key
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Capabilities note */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full control over Blog, Portfolio, Services & Training Cohorts</span>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>LivingTech Brand Agency &bull; Abocho, Dekina LGA, Kogi State</p>
        </div>
      </div>
    </div>
  );
};

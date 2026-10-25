import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdminStore } from '../../services/adminStore';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

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
        setError('Incorrect password. Default credentials: livingtech2026');
      }
    }, 250);
  };

  const handleUseDemo = () => {
    setPassword('livingtech2026');
    setError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-lg shadow-cyan-500/10">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Administrative Access
          </span>
          <h3 id="login-title" className="text-2xl font-extrabold text-white mt-1">
            LivingTech Admin Portal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Restricted access for Temitope Oluwaseun & authorized staff.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Administrator Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                  error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                } text-sm text-white placeholder-slate-500 focus:outline-none transition-all pr-10`}
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>

            {error && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Quick Demo Helper */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Default key: <code className="text-cyan-300 font-mono font-bold">livingtech2026</code></span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
            >
              Fill Key
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

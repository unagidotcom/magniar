import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, AlertCircle, Key, Globe, Info } from 'lucide-react';
import { supabase, isSupabaseConfigured, checkIsUserAdmin } from '../../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: (sessionUser?: any) => void;
  onReturnToPublicSite?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToPublicSite,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email address and password.');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing. Please configure your Supabase credentials in .env to proceed.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (authError) {
        setIsLoading(false);
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid administrator email or password.');
        } else {
          setError(authError.message || 'Authentication failed. Please verify credentials.');
        }
        return;
      }

      if (!data.user) {
        setIsLoading(false);
        setError('No user session returned from authentication server.');
        return;
      }

      // Check admin authorization
      const isAdmin = await checkIsUserAdmin(
        data.user.id,
        data.user.email,
        data.user.user_metadata,
        data.user.app_metadata
      );

      if (!isAdmin) {
        await supabase.auth.signOut();
        setIsLoading(false);
        setError('Access Denied: Your account does not have administrator privileges.');
        return;
      }

      setIsLoading(false);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'An unexpected error occurred during authentication.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Please enter your administrator email address first.');
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase environment variables are missing.');
      return;
    }

    try {
      setError(null);
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (resetErr) {
        setError(resetErr.message);
      } else {
        setForgotSent(true);
      }
    } catch (err: any) {
      setError(err?.message || 'Password reset request failed.');
    }
  };

  return (
    <div className="magniar-admin-shell min-h-screen bg-[#050505] text-[#F5F7FA] flex flex-col lg:flex-row">
      {/* Left Branding Panel */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[radial-gradient(ellipse_at_top_left,rgba(0,153,255,0.08),transparent_70%)] relative overflow-hidden">
        <div className="space-y-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-2xl text-white tracking-[0.2em]">
                MAGNIAR
              </span>
              <span className="font-mono text-[10px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px] font-semibold uppercase tracking-widest">
                ADMINISTRATION
              </span>
            </div>

            {onReturnToPublicSite && (
              <button
                type="button"
                onClick={onReturnToPublicSite}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-[2px] font-mono text-xs transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>Public Website</span>
              </button>
            )}
          </div>

          <div className="space-y-4 max-w-lg pt-12">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Magniar Operating System & Strategic Ledger
            </h1>
            <p className="text-xs sm:text-sm text-[#8D949E] leading-relaxed">
              Unified private app shell managing client intakes, growth engineering pipelines, financial settlements, and operational performance metrics.
            </p>
          </div>
        </div>

        <div className="pt-12 space-y-4 relative z-10">
          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs">
              <Shield className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">
                RESTRICTED PRIVATE ACCESS
              </span>
            </div>
            <p className="text-xs text-[#8D949E] leading-relaxed">
              This portal is strictly for authorized Magniar partners and system administrators. All authentication attempts are logged and protected via encrypted Supabase auth sessions.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5A626E]">
            <span>SYS_STATUS: ONLINE</span>
            <span>AUTH_PROTOCOL: SUPABASE_JWT</span>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-[#08080A]">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#0099FF] uppercase tracking-widest font-semibold">
              <Key className="w-4 h-4" />
              <span>ADMINISTRATOR LOGIN</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Sign In to Admin OS
            </h2>
            <p className="text-xs text-[#8D949E]">
              Provide authorized administrator credentials to manage system operations.
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="p-4 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded-[2px] space-y-2">
              <div className="flex items-center gap-2 text-[#0099FF] text-xs font-bold">
                <Info className="w-4 h-4 shrink-0" />
                <span>SUPABASE SETUP REQUIRED</span>
              </div>
              <p className="text-xs text-[#8D949E] leading-relaxed">
                To enable live Supabase authentication:
              </p>
              <ol className="list-decimal list-inside text-xs text-[#8D949E] space-y-1 pl-1">
                <li>Add <code className="text-white bg-white/10 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and <code className="text-white bg-white/10 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> to your environment variables (<code className="text-white bg-white/10 px-1 py-0.5 rounded">.env</code>).</li>
                <li>In Supabase Auth dashboard, create an administrator user account.</li>
                <li>Set <code className="text-white bg-white/10 px-1 py-0.5 rounded">role: "admin"</code> and <code className="text-white bg-white/10 px-1 py-0.5 rounded">is_admin: true</code> in the user's app metadata.</li>
              </ol>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-[2px] flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {forgotSent && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-[2px] text-emerald-300 text-xs">
              Password reset link sent to your administrator email address if registered.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#F5F7FA] uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 focus:border-[#0099FF] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors"
                placeholder="admin@magniar.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#F5F7FA] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-[#8D949E] hover:text-white transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 focus:border-[#0099FF] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#0099FF] hover:bg-[#0088EE] text-white text-xs font-semibold tracking-wider uppercase rounded-[2px] flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>VERIFYING CREDENTIALS...</span>
              ) : (
                <>
                  <span>SIGN IN →</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

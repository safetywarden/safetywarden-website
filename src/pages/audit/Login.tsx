import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { signIn, sendMagicLink } from '../../lib/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'magic'>('password');
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/app/audit';

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate(from, { replace: true });
    }
    
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await sendMagicLink(email);
    
    if (error) {
      setError(error.message);
    } else {
      setMagicLinkSent(true);
    }
    
    setLoading(false);
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src="/safety-warden.png" alt="SafetyWarden" className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-3xl font-bold text-slate-900">Check your email</h2>
            <p className="mt-2 text-sm text-slate-600">
              We've sent a magic link to <strong>{email}</strong>
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Click the link in your email to sign in. You can close this tab.
            </p>
            <button
              onClick={() => setMagicLinkSent(false)}
              className="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/">
            <img src="/safety-warden.png" alt="SafetyWarden" className="mx-auto h-12 w-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Access your safety audit dashboard
          </p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setLoginMethod('password')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              loginMethod === 'password'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setLoginMethod('magic')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              loginMethod === 'magic'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Magic Link
          </button>
        </div>

        <form onSubmit={loginMethod === 'password' ? handlePasswordLogin : handleMagicLink} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {loginMethod === 'password' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : loginMethod === 'password' ? 'Sign in' : 'Send Magic Link'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/app/auth/register" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Back to SafetyWarden.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
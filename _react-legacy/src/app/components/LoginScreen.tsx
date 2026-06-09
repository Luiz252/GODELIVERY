import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aqui
    console.log('Login:', { email, password });
    // Redireciona para Home após login bem-sucedido
    navigate('/home');
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      {/* Content Container */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <svg 
            width="56" 
            height="56" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mb-3"
          >
            {/* Top Bun */}
            <path 
              d="M8 20C8 20 12 12 32 12C52 12 56 20 56 20C56 20 56 24 56 26C56 28 54 28 54 28H10C10 28 8 28 8 26C8 24 8 20 8 20Z" 
              fill="#F97316"
            />
            {/* Lettuce */}
            <path 
              d="M10 28H54C54 28 54 30 52 32C50 34 48 34 48 34H16C16 34 14 34 12 32C10 30 10 28 10 28Z" 
              fill="#F97316"
              opacity="0.8"
            />
            {/* Patty */}
            <rect 
              x="12" 
              y="34" 
              width="40" 
              height="8" 
              rx="2" 
              fill="#F97316"
            />
            {/* Bottom Bun */}
            <path 
              d="M10 42H54C54 42 56 42 56 44C56 46 54 52 32 52C10 52 8 46 8 44C8 42 10 42 10 42Z" 
              fill="#F97316"
            />
          </svg>
          
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#F97316' }}>
            GoDelivery
          </h1>
        </div>

        {/* Welcome Text */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#7C2D12' }}>
            Bem-vindo de volta
          </h2>
          <p className="text-base" style={{ color: '#7C2D12', opacity: 0.6 }}>
            Entre para continuar
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Mail className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
              style={{ 
                borderColor: '#FED7AA',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Lock className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-12 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
              style={{ 
                borderColor: '#FED7AA',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" style={{ color: '#F97316' }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: '#F97316' }} />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-medium"
              style={{ color: '#EA580C' }}
            >
              Esqueci minha senha?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl font-bold text-white text-lg mt-2 transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Entrar
          </button>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full h-14 rounded-2xl font-bold text-lg border-2 transition-all active:scale-98"
            style={{ 
              borderColor: '#F97316',
              color: '#F97316',
              backgroundColor: 'transparent'
            }}
          >
            Criar conta
          </button>
        </form>

        {/* Terms Text */}
        <div className="flex-1 flex items-end justify-center pb-4">
          <p className="text-xs text-center" style={{ color: '#7C2D12', opacity: 0.5 }}>
            Ao continuar, você concorda com nossos Termos
          </p>
        </div>
      </div>
    </div>
  );
}
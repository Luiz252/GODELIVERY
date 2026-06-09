import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export function SignupScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
    console.log('Signup:', formData);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      setFormData({ ...formData, phone: value });
    }
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center px-6 pt-12 pb-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/login')}
            className="absolute left-6 top-12 p-2 rounded-full active:bg-black/5 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#7C2D12' }} />
          </button>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
          >
            <path 
              d="M8 20C8 20 12 12 32 12C52 12 56 20 56 20C56 20 56 24 56 26C56 28 54 28 54 28H10C10 28 8 28 8 26C8 24 8 20 8 20Z" 
              fill="#F97316"
            />
            <path 
              d="M10 28H54C54 28 54 30 52 32C50 34 48 34 48 34H16C16 34 14 34 12 32C10 30 10 28 10 28Z" 
              fill="#F97316"
              opacity="0.8"
            />
            <rect 
              x="12" 
              y="34" 
              width="40" 
              height="8" 
              rx="2" 
              fill="#F97316"
            />
            <path 
              d="M10 42H54C54 42 56 42 56 44C56 46 54 52 32 52C10 52 8 46 8 44C8 42 10 42 10 42Z" 
              fill="#F97316"
            />
          </svg>
          
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#F97316' }}>
            GoDelivery
          </h1>
        </div>
      </div>

        {/* Content Container */}
        <div className="flex flex-col px-6 pb-8">
        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#7C2D12' }}>
            Criar sua conta
          </h2>
          <p className="text-sm" style={{ color: '#7C2D12', opacity: 0.6 }}>
            Preencha seus dados para começar
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <User className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type="text"
              placeholder="Nome completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
              style={{ 
                borderColor: '#FED7AA',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Mail className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
              style={{ 
                borderColor: '#FED7AA',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              required
            />
          </div>

          {/* Phone Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Phone className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handlePhoneChange}
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          {/* Confirm Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Lock className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full h-14 pl-12 pr-12 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
              style={{ 
                borderColor: '#FED7AA',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" style={{ color: '#F97316' }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: '#F97316' }} />
              )}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-2 cursor-pointer accent-orange-500"
              style={{ borderColor: '#FED7AA' }}
              required
            />
            <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: '#7C2D12' }}>
              Aceito os{' '}
              <span className="font-medium" style={{ color: '#EA580C' }}>
                Termos de Uso
              </span>
              {' '}e{' '}
              <span className="font-medium" style={{ color: '#EA580C' }}>
                Política de Privacidade
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl font-bold text-white text-lg mt-4 transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Criar conta
          </button>

          {/* Login Link */}
          <div className="text-center mt-4 mb-4">
            <span className="text-sm" style={{ color: '#7C2D12' }}>
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-bold"
                style={{ color: '#EA580C' }}
              >
                Entrar
              </button>
            </span>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

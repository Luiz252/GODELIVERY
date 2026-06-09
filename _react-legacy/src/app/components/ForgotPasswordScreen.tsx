import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail } from 'lucide-react';

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de recuperação de senha aqui
    console.log('Forgot password:', { email });
    // Redireciona para tela de verificação OTP
    navigate('/otp-verification');
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
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
        <div className="flex-1 flex flex-col px-6 pt-8 pb-8">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#7C2D12' }}>
            Recuperar senha
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#9A3412' }}>
            Digite seu e-mail para receber as instruções de redefinição de senha.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Enviar instruções
          </button>

          {/* Back to Login Link */}
          <div className="text-center mt-2">
            <span className="text-sm" style={{ color: '#7C2D12' }}>
              Lembrou sua senha?{' '}
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
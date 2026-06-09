import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';

export function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  // Calcula a força da senha
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength('weak');
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 1) setPasswordStrength('weak');
    else if (strength === 2 || strength === 3) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    // Lógica de redefinição de senha aqui
    console.log('Reset password:', { password });
    // Redireciona para login após sucesso
    navigate('/login');
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'strong':
        return '#10B981';
      default:
        return '#E5E7EB';
    }
  };

  const getStrengthWidth = () => {
    switch (passwordStrength) {
      case 'weak':
        return '33.33%';
      case 'medium':
        return '66.66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'Senha fraca';
      case 'medium':
        return 'Senha média';
      case 'strong':
        return 'Senha forte';
      default:
        return '';
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="relative flex items-center justify-center px-6 pt-12 pb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/forgot-password')}
          className="absolute left-6 top-12 p-2 rounded-full active:bg-black/5 transition-colors"
          aria-label="Voltar"
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
            Criar nova senha
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#9A3412' }}>
            Defina uma nova senha segura para sua conta.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password Field */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Lock className="w-5 h-5" style={{ color: '#F97316' }} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style={{ 
                  borderColor: '#FED7AA',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
                aria-label="Mostrar senha"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" style={{ color: '#F97316' }} />
                ) : (
                  <Eye className="w-5 h-5" style={{ color: '#F97316' }} />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300 rounded-full"
                    style={{ 
                      width: getStrengthWidth(),
                      backgroundColor: getStrengthColor()
                    }}
                  />
                </div>
                <span 
                  className="text-xs font-medium"
                  style={{ color: getStrengthColor() }}
                >
                  {getStrengthText()}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Lock className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-12 bg-white rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
              style={{ 
                borderColor: '#FED7AA',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
              aria-label="Mostrar confirmar senha"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" style={{ color: '#F97316' }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: '#F97316' }} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl font-bold text-white text-lg mt-4 transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Redefinir senha
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

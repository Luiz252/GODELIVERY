import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function OTPVerificationScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Timer de reenvio
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Aceita apenas números

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Pega apenas o último dígito
    setOtp(newOtp);

    // Move para o próximo campo automaticamente
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move para o campo anterior ao pressionar Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Foca no próximo campo vazio ou no último
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs[nextIndex].current?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    
    // Lógica de reenvio aqui
    console.log('Resend OTP');
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length !== 4) {
      alert('Por favor, digite o código completo');
      return;
    }

    // Lógica de verificação do código aqui
    console.log('Verify OTP:', code);
    
    // Redireciona para tela de redefinir senha após verificação bem-sucedida
    navigate('/reset-password');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#7C2D12' }}>
            Verificação de código
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#9A3412' }}>
            Digite o código de 4 dígitos enviado para seu e-mail.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* OTP Input Fields */}
          <div className="flex gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-14 h-14 text-center text-2xl font-bold bg-white rounded-xl border-2 transition-all outline-none"
                style={{
                  borderColor: digit ? '#F97316' : '#FED7AA',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
                aria-label={`Dígito ${index + 1}`}
              />
            ))}
          </div>

          {/* Resend Section */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="text-sm" style={{ color: '#7C2D12' }}>
              Não recebeu o código?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className="font-bold transition-opacity"
                style={{ 
                  color: '#EA580C',
                  opacity: canResend ? 1 : 0.5,
                  cursor: canResend ? 'pointer' : 'not-allowed'
                }}
              >
                Reenviar código
              </button>
            </div>
            
            {!canResend && (
              <span className="text-xs" style={{ color: '#9A3412' }}>
                Reenviar em {formatTime(timer)}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full mt-auto pt-8">
            <button
              type="submit"
              className="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
              style={{ 
                backgroundColor: '#F97316',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
              }}
            >
              Confirmar código
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

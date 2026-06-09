import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

type CardBrand = 'visa' | 'mastercard' | 'elo' | 'amex' | 'unknown';

export function AddPaymentScreen() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveAsMain, setSaveAsMain] = useState(false);

  // Detecta a bandeira do cartão
  const detectCardBrand = (number: string): CardBrand => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    if (cleanNumber.startsWith('636')) return 'elo';
    return 'unknown';
  };

  const cardBrand = detectCardBrand(cardNumber);

  // Máscara para número do cartão
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 16);
    const groups = limited.match(/.{1,4}/g) || [];
    return groups.join(' ');
  };

  // Máscara para validade
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 4);
    if (limited.length >= 2) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    return limited;
  };

  // Máscara para CVV
  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 3);
  };

  const handleCardNumberChange = (value: string) => {
    setCardNumber(formatCardNumber(value));
  };

  const handleExpiryChange = (value: string) => {
    setExpiryDate(formatExpiryDate(value));
  };

  const handleCVVChange = (value: string) => {
    setCvv(formatCVV(value));
  };

  const handleSubmit = () => {
    // Validação básica
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Aqui salvaria o cartão
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7ED] flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-12 pb-4 bg-[#FFF7ED]">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-[#7C2D12]" />
          </button>
          <h1 className="text-2xl font-bold text-[#7C2D12]">Adicionar Cartão</h1>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-32 overflow-y-auto">
          {/* Card Preview */}
          <div className="mb-6">
            <div
              className="w-full h-48 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}
            >
              {/* Chip */}
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-10 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ffd89b 0%, #ffb347 100%)',
                    opacity: 0.9
                  }}
                />
                {/* Brand Logo */}
                {cardBrand === 'visa' && (
                  <div className="text-white font-bold text-2xl">VISA</div>
                )}
                {cardBrand === 'mastercard' && (
                  <div className="flex gap-1">
                    <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
                    <div className="w-8 h-8 rounded-full bg-yellow-500 opacity-80 -ml-4" />
                  </div>
                )}
              </div>

              {/* Card Number */}
              <div>
                <p className="text-white text-xl font-mono tracking-wider mb-4">
                  {cardNumber || '•••• •••• •••• ••••'}
                </p>

                {/* Name and Expiry */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Nome no cartão</p>
                    <p className="text-white text-sm font-medium">
                      {cardName || 'SEU NOME AQUI'}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Validade</p>
                    <p className="text-white text-sm font-medium">
                      {expiryDate || 'MM/AA'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translate(50%, -50%)'
                }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Número do cartão */}
            <div>
              <label className="block text-sm font-medium text-[#7C2D12] mb-2">
                Número do cartão
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full h-14 px-4 bg-white border-2 border-[#FED7AA] rounded-xl text-[#7C2D12] font-mono text-lg outline-none focus:border-[#F97316] transition-colors"
                />
                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A3412]" />
              </div>
            </div>

            {/* Nome no cartão */}
            <div>
              <label className="block text-sm font-medium text-[#7C2D12] mb-2">
                Nome no cartão
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                placeholder="COMO ESTÁ NO CARTÃO"
                className="w-full h-14 px-4 bg-white border-2 border-[#FED7AA] rounded-xl text-[#7C2D12] uppercase outline-none focus:border-[#F97316] transition-colors"
              />
            </div>

            {/* Validade e CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#7C2D12] mb-2">
                  Validade
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  placeholder="MM/AA"
                  className="w-full h-14 px-4 bg-white border-2 border-[#FED7AA] rounded-xl text-[#7C2D12] font-mono text-lg outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7C2D12] mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => handleCVVChange(e.target.value)}
                  placeholder="123"
                  className="w-full h-14 px-4 bg-white border-2 border-[#FED7AA] rounded-xl text-[#7C2D12] font-mono text-lg outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSaveAsMain(!saveAsMain)}
                className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor: saveAsMain ? '#F97316' : '#FED7AA',
                  backgroundColor: saveAsMain ? '#F97316' : 'transparent'
                }}
              >
                {saveAsMain && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span className="text-sm text-[#7C2D12]">
                Salvar como cartão principal
              </span>
            </div>
          </div>

          {/* Bandeiras aceitas */}
          <div className="mt-6">
            <p className="text-xs text-[#9A3412] mb-3 text-center">
              Bandeiras aceitas
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-8 bg-white rounded border border-[#FED7AA] flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">VISA</span>
              </div>
              <div className="w-12 h-8 bg-white rounded border border-[#FED7AA] flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 -ml-1.5" />
                </div>
              </div>
              <div className="w-12 h-8 bg-white rounded border border-[#FED7AA] flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">ELO</span>
              </div>
              <div className="w-12 h-8 bg-white rounded border border-[#FED7AA] flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">AMEX</span>
              </div>
            </div>
          </div>

          {/* Security Text */}
          <div className="flex items-center justify-center gap-2 mt-6 bg-white rounded-xl p-3 border border-[#FED7AA]">
            <Lock className="w-4 h-4 text-[#F97316]" />
            <p className="text-xs text-[#7C2D12]">
              Seus dados estão protegidos
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div
          className="fixed bottom-0 left-0 right-0 bg-white p-6"
          style={{
            borderTop: '2px solid #FED7AA',
            maxWidth: '448px',
            margin: '0 auto'
          }}
        >
          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-[#F97316] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
            style={{
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Adicionar Cartão
          </button>
        </div>
      </div>
    </div>
  );
}

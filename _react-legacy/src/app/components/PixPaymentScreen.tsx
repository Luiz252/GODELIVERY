import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Copy, Check, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function PixPaymentScreen() {
  const navigate = useNavigate();

  // Timer de 15 minutos (900 segundos)
  const [timeLeft, setTimeLeft] = useState(900);
  const [copied, setCopied] = useState(false);

  // Código PIX mock
  const pixCode =
    '00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540512.705802BR5925GODELIVERY RESTAURANTES6009SAO PAULO62070503***6304ABC1';

  const totalAmount = 112.70;

  // Contagem regressiva
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formata o tempo em MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Função para copiar código PIX
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  // Timer está vermelho se < 5 minutos
  const isTimeWarning = timeLeft < 300;

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
          <h1 className="text-2xl font-bold text-[#7C2D12]">Pagar com PIX</h1>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto">
          {/* Ícone PIX */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#32BCAD' }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.05 2L3 6.05L7.05 10.1L9.1 8.05L7.05 6L9.1 3.95L7.05 2ZM16.95 2L14.9 3.95L16.95 6L14.9 8.05L16.95 10.1L21 6.05L16.95 2ZM7.05 13.9L3 17.95L7.05 22L9.1 19.95L7.05 17.9L9.1 15.85L7.05 13.9ZM16.95 13.9L14.9 15.85L16.95 17.9L14.9 19.95L16.95 22L21 17.95L16.95 13.9ZM12 8.5L9.5 11L12 13.5L14.5 11L12 8.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {/* Valor */}
          <div className="text-center mb-6">
            <p className="text-sm text-[#9A3412] mb-1">Valor a pagar</p>
            <p className="text-4xl font-bold text-[#7C2D12]">
              R$ {totalAmount.toFixed(2)}
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#FED7AA] mb-4 flex justify-center">
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG
                value={pixCode}
                size={220}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

          {/* Instruções */}
          <p className="text-center text-sm text-[#7C2D12] mb-4">
            Escaneie o QR Code ou copie o código abaixo
          </p>

          {/* Código PIX */}
          <div className="bg-white rounded-2xl border-2 border-[#FED7AA] mb-4 overflow-hidden">
            <div className="p-4 bg-[#FFF7ED] border-b-2 border-[#FED7AA]">
              <p className="text-xs font-medium text-[#7C2D12] mb-2">
                Código PIX copia e cola
              </p>
              <div className="bg-white rounded-lg p-3 border border-[#FED7AA]">
                <p className="text-xs text-[#9A3412] font-mono break-all leading-relaxed">
                  {pixCode}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="w-full h-14 flex items-center justify-center gap-2 bg-white active:bg-[#FFF7ED] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-600">
                    Código copiado!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-[#F97316]" />
                  <span className="font-bold text-[#F97316]">
                    Copiar código PIX
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Timer */}
          <div
            className="bg-white rounded-2xl p-4 border-2 mb-4 flex items-center justify-center gap-3"
            style={{
              borderColor: isTimeWarning ? '#DC2626' : '#FED7AA',
              backgroundColor: isTimeWarning ? '#FEE2E2' : 'white'
            }}
          >
            <Clock
              className="w-5 h-5"
              style={{ color: isTimeWarning ? '#DC2626' : '#F97316' }}
            />
            <div>
              <p
                className="text-xs mb-0.5"
                style={{ color: isTimeWarning ? '#DC2626' : '#9A3412' }}
              >
                Este código expira em
              </p>
              <p
                className="text-2xl font-bold font-mono"
                style={{ color: isTimeWarning ? '#DC2626' : '#7C2D12' }}
              >
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Informação */}
          <div className="bg-[#DBEAFE] rounded-2xl p-4 border-2 border-[#BFDBFE] mb-4">
            <p className="text-sm text-[#1E40AF] text-center">
              ✓ Após o pagamento, a confirmação é automática
            </p>
          </div>

          {/* Instruções de como pagar */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA] mb-6">
            <h3 className="font-bold text-[#7C2D12] mb-3">Como pagar:</h3>
            <ol className="space-y-2 text-sm text-[#7C2D12]">
              <li className="flex gap-2">
                <span className="font-bold text-[#F97316] flex-shrink-0">1.</span>
                <span>Abra o app do seu banco</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#F97316] flex-shrink-0">2.</span>
                <span>Escolha pagar com PIX</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#F97316] flex-shrink-0">3.</span>
                <span>Escaneie o QR Code ou cole o código</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#F97316] flex-shrink-0">4.</span>
                <span>Confirme o pagamento</span>
              </li>
            </ol>
          </div>

          {/* Botão secundário */}
          <button
            onClick={() => navigate('/order-confirmation')}
            className="w-full h-14 bg-white text-[#F97316] font-bold rounded-2xl border-2 border-[#F97316] active:scale-[0.98] transition-transform"
          >
            Já fiz o pagamento
          </button>
        </div>
      </div>
    </div>
  );
}

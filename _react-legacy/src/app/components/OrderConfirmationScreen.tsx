import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Package, MapPin, Clock } from 'lucide-react';

export function OrderConfirmationScreen() {
  const navigate = useNavigate();
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFF7ED] flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Success Icon */}
          <div
            className={`transition-all duration-500 ${
              showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: '#FFF7ED',
                boxShadow: '0 4px 20px rgba(249, 115, 22, 0.15)'
              }}
            >
              <CheckCircle2 className="w-14 h-14 text-[#F97316]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-[#7C2D12] mb-2 text-center">
            Pedido Confirmado!
          </h1>
          <p className="text-sm text-[#9A3412] text-center mb-8">
            Seu pedido foi realizado com sucesso
          </p>

          {/* Order Number */}
          <div className="w-full bg-white rounded-2xl p-6 border-2 border-[#FED7AA] mb-6">
            <div className="text-center">
              <p className="text-xs text-[#9A3412] mb-2">Número do pedido</p>
              <p className="text-3xl font-bold text-[#F97316]">#{orderNumber}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#FED7AA] mb-6 space-y-4">
            {/* Status */}
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FFF7ED' }}
              >
                <Package className="w-5 h-5 text-[#F97316]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#7C2D12]">Status</p>
                <p className="text-xs text-[#9A3412]">Preparando pedido</p>
              </div>
            </div>

            {/* Endereço */}
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FFF7ED' }}
              >
                <MapPin className="w-5 h-5 text-[#F97316]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#7C2D12]">Entregar em</p>
                <p className="text-xs text-[#9A3412]">
                  Rua das Flores, 123 - Jardim Primavera
                </p>
              </div>
            </div>

            {/* Tempo estimado */}
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FFF7ED' }}
              >
                <Clock className="w-5 h-5 text-[#F97316]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#7C2D12]">Tempo estimado</p>
                <p className="text-xs text-[#9A3412]">30-40 minutos</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <p className="text-xs text-center text-[#9A3412] mb-8 px-4">
            Você pode acompanhar o status do seu pedido na tela de Pedidos
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={() => navigate('/home')}
            className="w-full h-14 bg-[#F97316] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
            style={{
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Ir para Home
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="w-full h-14 bg-transparent border-2 border-[#F97316] text-[#F97316] font-bold rounded-2xl active:scale-[0.98] transition-transform"
          >
            Ver meus pedidos
          </button>
        </div>
      </div>
    </div>
  );
}

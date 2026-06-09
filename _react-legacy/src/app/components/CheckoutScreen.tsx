import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Clock, CreditCard, Smartphone, Wallet, Plus } from 'lucide-react';
import { CashPaymentModal } from './CashPaymentModal';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

type PaymentMethod = 'credit' | 'pix' | 'cash' | null;

export function CheckoutScreen() {
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit');
  const [cashModalOpen, setCashModalOpen] = useState(false);
  const [cashDetails, setCashDetails] = useState<{
    needsChange: boolean;
    changeFor?: number;
  } | null>(null);

  // Mock data do carrinho
  const cartItems: CartItem[] = [
    { id: '1', name: 'Pizza Margherita', quantity: 2, price: 45.90 },
    { id: '2', name: 'Refrigerante 2L', quantity: 1, price: 12.00 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 8.90;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  const paymentOptions = [
    { id: 'credit', label: 'Cartão de crédito', icon: CreditCard },
    { id: 'pix', label: 'PIX', icon: Smartphone },
    { id: 'cash', label: 'Dinheiro', icon: Wallet }
  ];

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId as PaymentMethod);
    
    // Abre o modal se selecionar dinheiro
    if (paymentId === 'cash') {
      setCashModalOpen(true);
    }
  };

  const handleCashConfirm = (needsChange: boolean, changeFor?: number) => {
    setCashDetails({ needsChange, changeFor });
  };

  const handleConfirmOrder = () => {
    if (selectedPayment === 'pix') {
      navigate('/pix-payment');
    } else {
      navigate('/order-confirmation');
    }
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
          <h1 className="text-2xl font-bold text-[#7C2D12]">Finalizar Pedido</h1>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-32 overflow-y-auto">
          {/* Endereço de Entrega */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA] mb-4">
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-bold text-[#7C2D12]">Endereço de Entrega</h2>
              <button
                onClick={() => navigate('/address-select')}
                className="text-sm font-medium text-[#F97316]"
              >
                Alterar
              </button>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-[#7C2D12] font-medium mb-0.5">
                  Rua das Flores, 123
                </p>
                <p className="text-xs text-[#9A3412]">
                  Apto 45, Bloco B • Jardim Primavera
                </p>
              </div>
            </div>
            
            {/* Tempo estimado */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#FED7AA]">
              <Clock className="w-5 h-5 text-[#F97316]" />
              <span className="text-sm text-[#7C2D12]">
                Tempo estimado: <span className="font-bold">30-40 min</span>
              </span>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA] mb-4">
            <h2 className="font-bold text-[#7C2D12] mb-4">Resumo do Pedido</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-[#7C2D12] font-medium">
                      {item.quantity}x {item.name}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#7C2D12]">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA] mb-4">
            <h2 className="font-bold text-[#7C2D12] mb-4">Forma de Pagamento</h2>
            <div className="space-y-3">
              {paymentOptions.map((option) => {
                const isSelected = selectedPayment === option.id;
                const Icon = option.icon;

                return (
                  <button
                    key={option.id}
                    onClick={() => handlePaymentSelect(option.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                    style={{
                      border: isSelected ? '2px solid #F97316' : '2px solid #FED7AA',
                      backgroundColor: isSelected ? '#FFF7ED' : 'transparent'
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#FFF7ED' }}
                    >
                      <Icon className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <span className="flex-1 text-left font-medium text-[#7C2D12]">
                      {option.label}
                    </span>
                    <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                      {isSelected ? (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#F97316' }}
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      ) : (
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ border: '2px solid #FED7AA' }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Adicionar cartão */}
              <button
                onClick={() => navigate('/add-payment')}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                style={{ border: '2px dashed #F97316' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FFF7ED' }}
                >
                  <Plus className="w-5 h-5 text-[#F97316]" />
                </div>
                <span className="flex-1 text-left font-medium text-[#F97316]">
                  Adicionar cartão
                </span>
              </button>
            </div>
          </div>

          {/* Resumo de Valores */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA]">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#9A3412]">Subtotal</span>
                <span className="font-medium text-[#7C2D12]">
                  R$ {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#9A3412]">Taxa de entrega</span>
                <span className="font-medium text-[#7C2D12]">
                  R$ {deliveryFee.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#9A3412]">Desconto</span>
                  <span className="font-medium text-green-600">
                    -R$ {discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="h-px bg-[#FED7AA]" />
              <div className="flex justify-between">
                <span className="font-bold text-[#7C2D12]">Total</span>
                <span className="font-bold text-[#F97316] text-lg">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>
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
            onClick={handleConfirmOrder}
            className="w-full h-14 bg-[#F97316] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform text-lg"
            style={{
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Confirmar Pedido • R$ {total.toFixed(2)}
          </button>
        </div>
      </div>

      {/* Cash Payment Modal */}
      <CashPaymentModal
        open={cashModalOpen}
        onOpenChange={setCashModalOpen}
        totalAmount={total}
        onConfirm={handleCashConfirm}
      />
    </div>
  );
}
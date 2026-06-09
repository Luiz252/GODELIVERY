import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Minus, Plus, Trash2, Tag, MapPin } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  extras?: string;
}

export function CartScreen() {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Pizza Margherita',
      price: 45.90,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      extras: 'Borda recheada'
    },
    {
      id: '2',
      name: 'Refrigerante 2L',
      price: 12.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400'
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const deliveryFee = 8.90;
  const discount = 0;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee - discount;

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
          <h1 className="text-2xl font-bold text-[#7C2D12]">Seu carrinho</h1>
        </div>

        {/* Delivery Address */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#7C2D12] mb-1">Entregar em</p>
                <p className="text-sm text-[#9A3412]">Rua das Flores, 123 - Centro</p>
                <button className="text-sm font-medium text-[#F97316] mt-1">
                  Alterar endereço
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-[#FED7AA] flex items-center justify-center mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M12 12H36L33 30H15L12 12Z"
                    stroke="#F97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="18" cy="36" r="2" fill="#F97316" />
                  <circle cx="30" cy="36" r="2" fill="#F97316" />
                </svg>
              </div>
              <p className="text-lg font-bold text-[#7C2D12] mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-[#9A3412] text-center mb-6">
                Adicione itens deliciosos para continuar
              </p>
              <button
                onClick={() => navigate('/home')}
                className="h-12 px-8 bg-[#F97316] text-white font-bold rounded-xl active:scale-95 transition-transform"
              >
                Ver restaurantes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA]"
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FED7AA] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#7C2D12] mb-1">{item.name}</h3>
                      {item.extras && (
                        <p className="text-xs text-[#9A3412] mb-2">{item.extras}</p>
                      )}
                      <p className="font-bold text-[#F97316]">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 h-fit rounded-lg active:bg-red-50 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#FED7AA]">
                    <span className="text-sm text-[#7C2D12]">Quantidade</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-[#FED7AA] flex items-center justify-center active:bg-[#FDBA74] transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-4 h-4 text-[#F97316]" />
                      </button>
                      <span className="w-8 text-center font-bold text-[#7C2D12]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center active:bg-[#EA580C] transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="bg-white rounded-2xl p-4 border-2 border-[#FED7AA]">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Cupom de desconto"
                    className="flex-1 bg-transparent outline-none text-[#7C2D12] placeholder-[#FDBA74] text-sm"
                  />
                  <button className="text-sm font-bold text-[#F97316]">Aplicar</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t-2 border-[#FED7AA] px-6 py-6">
            {/* Summary */}
            <div className="space-y-3 mb-4">
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

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/address-select')}
              className="w-full h-14 bg-[#F97316] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
              style={{
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
              }}
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

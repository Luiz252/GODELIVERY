import { useState } from 'react';
import { Drawer } from 'vaul';
import { Wallet } from 'lucide-react';

interface CashPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  onConfirm: (needsChange: boolean, changeFor?: number) => void;
}

export function CashPaymentModal({
  open,
  onOpenChange,
  totalAmount,
  onConfirm
}: CashPaymentModalProps) {
  const [needsChange, setNeedsChange] = useState(false);
  const [changeForValue, setChangeForValue] = useState('');

  // Calcula o troco
  const changeFor = parseFloat(changeForValue) || 0;
  const changeAmount = changeFor - totalAmount;

  // Formata o valor conforme o usuário digita
  const handleChangeForInput = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers === '') {
      setChangeForValue('');
      return;
    }

    // Converte para centavos e depois para reais
    const numberValue = parseInt(numbers) / 100;
    setChangeForValue(numberValue.toFixed(2));
  };

  const handleConfirm = () => {
    if (needsChange) {
      if (changeFor <= totalAmount) {
        alert('O valor deve ser maior que o total do pedido');
        return;
      }
      onConfirm(true, changeFor);
    } else {
      onConfirm(false);
    }
    
    // Reset
    setNeedsChange(false);
    setChangeForValue('');
    onOpenChange(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="bg-white flex flex-col rounded-t-3xl h-auto fixed bottom-0 left-0 right-0 outline-none"
          style={{ maxWidth: '448px', margin: '0 auto' }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="px-6 pb-8">
            {/* Título com ícone */}
            <div className="flex items-center gap-3 mb-6 pt-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFF7ED' }}
              >
                <Wallet className="w-6 h-6 text-[#F97316]" />
              </div>
              <h2 className="text-2xl font-bold text-[#7C2D12]">
                Pagamento em Dinheiro
              </h2>
            </div>

            {/* Valor do pedido */}
            <div className="bg-[#FFF7ED] rounded-xl p-4 border-2 border-[#FED7AA] mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#9A3412]">Total do pedido:</span>
                <span className="text-2xl font-bold text-[#F97316]">
                  R$ {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Pergunta */}
            <p className="text-lg font-bold text-[#7C2D12] mb-4">
              Precisa de troco?
            </p>

            {/* Opções */}
            <div className="space-y-3 mb-6">
              {/* Não preciso de troco */}
              <button
                onClick={() => {
                  setNeedsChange(false);
                  setChangeForValue('');
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl transition-all active:scale-[0.98]"
                style={{
                  border: !needsChange ? '2px solid #F97316' : '2px solid #FED7AA',
                  backgroundColor: !needsChange ? '#FFF7ED' : 'white'
                }}
              >
                <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  {!needsChange ? (
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
                <span className="flex-1 text-left font-medium text-[#7C2D12]">
                  Não preciso de troco
                </span>
              </button>

              {/* Sim, troco para */}
              <button
                onClick={() => setNeedsChange(true)}
                className="w-full flex items-start gap-3 p-4 rounded-xl transition-all active:scale-[0.98]"
                style={{
                  border: needsChange ? '2px solid #F97316' : '2px solid #FED7AA',
                  backgroundColor: needsChange ? '#FFF7ED' : 'white'
                }}
              >
                <div className="flex items-center justify-center w-6 h-6 flex-shrink-0 mt-0.5">
                  {needsChange ? (
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
                <div className="flex-1 text-left">
                  <span className="font-medium text-[#7C2D12] block mb-3">
                    Sim, troco para:
                  </span>
                  {needsChange && (
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C2D12] font-medium">
                        R$
                      </span>
                      <input
                        type="text"
                        value={changeForValue}
                        onChange={(e) => handleChangeForInput(e.target.value)}
                        placeholder="0,00"
                        className="w-full h-12 pl-12 pr-4 bg-white border-2 border-[#FED7AA] rounded-lg text-[#7C2D12] font-medium text-lg outline-none focus:border-[#F97316] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Mostrar troco se aplicável */}
            {needsChange && changeFor > totalAmount && (
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Seu troco será:</span>
                  <span className="text-2xl font-bold text-green-600">
                    R$ {changeAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Aviso se o valor for menor */}
            {needsChange && changeForValue && changeFor <= totalAmount && (
              <div className="bg-red-50 rounded-xl p-3 border-2 border-red-200 mb-6">
                <p className="text-sm text-red-600 text-center">
                  O valor deve ser maior que R$ {totalAmount.toFixed(2)}
                </p>
              </div>
            )}

            {/* Botão confirmar */}
            <button
              onClick={handleConfirm}
              className="w-full h-14 bg-[#F97316] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
              style={{
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
              }}
            >
              Confirmar
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

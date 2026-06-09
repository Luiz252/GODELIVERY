import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Home, Briefcase, Plus } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  icon: 'home' | 'work' | 'other';
  street: string;
  complement: string;
  zipAndDistrict: string;
}

export function AddressSelectScreen() {
  const navigate = useNavigate();
  
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Casa',
      icon: 'home',
      street: 'Rua das Flores, 123',
      complement: 'Apto 45, Bloco B',
      zipAndDistrict: '01234-567 • Jardim Primavera'
    },
    {
      id: '2',
      label: 'Trabalho',
      icon: 'work',
      street: 'Av. Paulista, 1000',
      complement: 'Sala 1501, 15º andar',
      zipAndDistrict: '01310-100 • Bela Vista'
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState('1');

  const getIcon = (type: 'home' | 'work' | 'other') => {
    if (type === 'home') return <Home className="w-6 h-6" style={{ color: '#F97316' }} />;
    if (type === 'work') return <Briefcase className="w-6 h-6" style={{ color: '#F97316' }} />;
    return <Home className="w-6 h-6" style={{ color: '#F97316' }} />;
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-12 pb-4">
          <button
            onClick={() => navigate('/cart')}
            className="p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#7C2D12' }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#7C2D12' }}>
            Endereço de entrega
          </h1>
        </div>

        {/* Address List */}
        <div className="flex-1 px-6 mt-4 pb-32 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {addresses.map((address) => {
            const isSelected = selectedAddressId === address.id;
            
            return (
              <button
                key={address.id}
                onClick={() => setSelectedAddressId(address.id)}
                className="w-full bg-white rounded-xl p-4 mb-3 flex items-start gap-4 transition-all active:scale-[0.98]"
                style={{
                  border: isSelected ? '2px solid #F97316' : '2px solid transparent',
                  backgroundColor: isSelected ? '#FFF7ED' : '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FFF7ED' }}
                >
                  {getIcon(address.icon)}
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-base font-bold" style={{ color: '#7C2D12' }}>
                    {address.label}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#9A3412' }}>
                    {address.street}
                  </p>
                  <p className="text-sm" style={{ color: '#9A3412' }}>
                    {address.complement}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#9A3412' }}>
                    {address.zipAndDistrict}
                  </p>
                </div>

                {/* Radio */}
                <div className="flex items-center justify-center w-6 h-6 flex-shrink-0 mt-1">
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

          {/* Add New Address Button */}
          <button
            onClick={() => navigate('/add-address')}
            className="w-full h-14 rounded-xl flex items-center justify-center gap-2 mt-4 active:scale-[0.98] transition-transform"
            style={{
              border: '2px dashed #F97316'
            }}
          >
            <Plus className="w-5 h-5" style={{ color: '#F97316' }} />
            <span className="font-medium" style={{ color: '#F97316' }}>
              Adicionar novo endereço
            </span>
          </button>
        </div>

        {/* Footer */}
        <div
          className="fixed bottom-0 left-0 right-0 bg-white p-6"
          style={{
            borderTop: '1px solid #FED7AA',
            maxWidth: '448px',
            margin: '0 auto'
          }}
        >
          <button
            onClick={() => navigate('/checkout')}
            className="w-full h-14 rounded-2xl font-bold text-lg text-white active:scale-[0.98] transition-transform"
            style={{
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Confirmar endereço
          </button>
        </div>
      </div>
    </div>
  );
}
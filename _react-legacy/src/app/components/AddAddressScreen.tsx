import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Home, Briefcase, MapPin, Search } from 'lucide-react';

type AddressType = 'home' | 'work' | 'other';

interface FormData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  reference: string;
}

export function AddAddressScreen() {
  const navigate = useNavigate();
  
  const [addressType, setAddressType] = useState<AddressType>('home');
  const [formData, setFormData] = useState<FormData>({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    reference: ''
  });

  const handleCepChange = (value: string) => {
    // Máscara: #####-###
    const numbers = value.replace(/\D/g, '');
    const masked = numbers.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    setFormData({ ...formData, cep: masked });
  };

  const handleSearchCep = () => {
    // Simulação de busca de CEP
    if (formData.cep.length === 9) {
      setFormData({
        ...formData,
        street: 'Rua das Flores',
        neighborhood: 'Jardim Primavera',
        city: 'São Paulo',
        state: 'SP'
      });
    }
  };

  const handleSave = () => {
    // Aqui você salvaria no localStorage ou contexto
    navigate('/address-select');
  };

  const addressTypes = [
    { value: 'home' as AddressType, label: 'Casa', icon: Home },
    { value: 'work' as AddressType, label: 'Trabalho', icon: Briefcase },
    { value: 'other' as AddressType, label: 'Outro', icon: MapPin }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-12 pb-4">
          <button
            onClick={() => navigate('/address-select')}
            className="p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#7C2D12' }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#7C2D12' }}>
            Novo endereço
          </h1>
        </div>

        {/* Form */}
        <div className="flex-1 px-6 mt-4 pb-32 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Address Type */}
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
              Tipo de endereço
            </label>
            <div className="flex gap-2">
              {addressTypes.map((type) => {
                const Icon = type.icon;
                const isActive = addressType === type.value;
                
                return (
                  <button
                    key={type.value}
                    onClick={() => setAddressType(type.value)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all active:scale-95"
                    style={{
                      backgroundColor: isActive ? '#F97316' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#7C2D12',
                      border: isActive ? 'none' : '2px solid #FED7AA'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CEP */}
          <div className="mt-6">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
              CEP
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => handleCepChange(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className="w-full h-14 rounded-xl px-4 pr-12 bg-white"
                style={{
                  border: '2px solid #FED7AA',
                  color: '#7C2D12'
                }}
              />
              <button
                onClick={handleSearchCep}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 active:scale-90 transition-transform"
                aria-label="Buscar CEP"
              >
                <Search className="w-5 h-5" style={{ color: '#F97316' }} />
              </button>
            </div>
          </div>

          {/* Street */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
              Rua
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Nome da rua"
              className="w-full h-14 rounded-xl px-4 bg-white"
              style={{
                border: '2px solid #FED7AA',
                color: '#7C2D12'
              }}
            />
          </div>

          {/* Number and Complement */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
                Número
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="123"
                className="w-full h-14 rounded-xl px-4 bg-white"
                style={{
                  border: '2px solid #FED7AA',
                  color: '#7C2D12'
                }}
              />
            </div>
            <div className="flex-[2]">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
                Complemento
              </label>
              <input
                type="text"
                value={formData.complement}
                onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                placeholder="Apto, bloco..."
                className="w-full h-14 rounded-xl px-4 bg-white"
                style={{
                  border: '2px solid #FED7AA',
                  color: '#7C2D12'
                }}
              />
            </div>
          </div>

          {/* Neighborhood */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
              Bairro
            </label>
            <input
              type="text"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              placeholder="Nome do bairro"
              className="w-full h-14 rounded-xl px-4 bg-white"
              style={{
                border: '2px solid #FED7AA',
                color: '#7C2D12'
              }}
            />
          </div>

          {/* City and State */}
          <div className="flex gap-4 mt-4">
            <div className="flex-[2]">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
                Cidade
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="São Paulo"
                className="w-full h-14 rounded-xl px-4 bg-white"
                style={{
                  border: '2px solid #FED7AA',
                  color: '#7C2D12'
                }}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
                UF
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                placeholder="SP"
                maxLength={2}
                className="w-full h-14 rounded-xl px-4 bg-white"
                style={{
                  border: '2px solid #FED7AA',
                  color: '#7C2D12'
                }}
              />
            </div>
          </div>

          {/* Reference */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#7C2D12' }}>
              Ponto de referência (opcional)
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="Próximo ao mercado..."
              className="w-full h-14 rounded-xl px-4 bg-white"
              style={{
                border: '2px solid #FED7AA',
                color: '#7C2D12'
              }}
            />
          </div>
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
            onClick={handleSave}
            className="w-full h-14 rounded-2xl font-bold text-lg text-white active:scale-[0.98] transition-transform"
            style={{
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Salvar endereço
          </button>
        </div>
      </div>
    </div>
  );
}

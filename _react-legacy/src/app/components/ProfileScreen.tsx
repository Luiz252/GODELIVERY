import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User as UserIcon, MapPin, CreditCard, Bell, HelpCircle, Settings, LogOut, ChevronRight, Home as HomeIcon, Package, Heart } from 'lucide-react';

export function ProfileScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'addresses', icon: MapPin, label: 'Endereços salvos', action: () => navigate('/address-select') },
    { id: 'payments', icon: CreditCard, label: 'Formas de pagamento', action: () => navigate('/add-payment') },
    { id: 'notifications', icon: Bell, label: 'Notificações', action: () => navigate('/notifications') },
    { id: 'help', icon: HelpCircle, label: 'Ajuda e suporte', action: () => console.log('Help') },
    { id: 'settings', icon: Settings, label: 'Configurações', action: () => console.log('Settings') },
  ];

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/home');
    } else if (tab === 'orders') {
      navigate('/orders');
    } else if (tab === 'favorites') {
      navigate('/favorites');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="px-6 pt-12 pb-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#7C2D12' }} />
            </button>
            <h1 className="text-2xl font-bold" style={{ color: '#7C2D12' }}>
              Perfil
            </h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* User Info */}
          <div className="bg-white rounded-2xl p-6 mb-6" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FFF7ED' }}
              >
                <UserIcon className="w-10 h-10" style={{ color: '#F97316' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-1" style={{ color: '#7C2D12' }}>
                  João Silva
                </h2>
                <p className="text-sm" style={{ color: '#9A3412' }}>
                  joao.silva@email.com
                </p>
                <p className="text-sm" style={{ color: '#9A3412' }}>
                  (11) 98765-4321
                </p>
              </div>
            </div>
            <button
              className="w-full mt-4 h-10 rounded-xl font-medium transition-colors active:scale-95"
              style={{
                backgroundColor: '#FFF7ED',
                color: '#F97316',
              }}
              onClick={() => console.log('Edit profile')}
            >
              Editar perfil
            </button>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 text-left active:bg-gray-50 transition-colors"
                  style={{
                    borderBottom: index < menuItems.length - 1 ? '1px solid #FED7AA' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: '#F97316' }} />
                    <span className="font-medium" style={{ color: '#7C2D12' }}>
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: '#9A3412' }} />
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}
          >
            <LogOut className="w-5 h-5" style={{ color: '#EF4444' }} />
            <span className="font-bold" style={{ color: '#EF4444' }}>
              Sair da conta
            </span>
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50" style={{ borderColor: '#FED7AA' }}>
          <div className="flex items-center justify-around h-16 px-6">
            <button
              onClick={() => handleNavigation('home')}
              className="flex flex-col items-center gap-1 py-2 transition-colors"
              aria-label="Home"
            >
              <HomeIcon
                className="w-6 h-6"
                style={{
                  color: activeTab === 'home' ? '#F97316' : '#9A3412',
                  fill: activeTab === 'home' ? '#F97316' : 'none',
                }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: activeTab === 'home' ? '#F97316' : '#9A3412' }}
              >
                Home
              </span>
            </button>

            <button
              onClick={() => handleNavigation('orders')}
              className="flex flex-col items-center gap-1 py-2 transition-colors"
              aria-label="Pedidos"
            >
              <Package
                className="w-6 h-6"
                style={{ color: activeTab === 'orders' ? '#F97316' : '#9A3412' }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: activeTab === 'orders' ? '#F97316' : '#9A3412' }}
              >
                Pedidos
              </span>
            </button>

            <button
              onClick={() => handleNavigation('favorites')}
              className="flex flex-col items-center gap-1 py-2 transition-colors"
              aria-label="Favoritos"
            >
              <Heart
                className="w-6 h-6"
                style={{ color: activeTab === 'favorites' ? '#F97316' : '#9A3412' }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: activeTab === 'favorites' ? '#F97316' : '#9A3412' }}
              >
                Favoritos
              </span>
            </button>

            <button
              onClick={() => handleNavigation('profile')}
              className="flex flex-col items-center gap-1 py-2 transition-colors"
              aria-label="Perfil"
            >
              <UserIcon
                className="w-6 h-6"
                style={{ color: activeTab === 'profile' ? '#F97316' : '#9A3412' }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: activeTab === 'profile' ? '#F97316' : '#9A3412' }}
              >
                Perfil
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Home as HomeIcon, Heart, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryTime: string;
}

export function OrdersScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Exemplo de pedidos - em produção viriam de um contexto ou API
  const [orders] = useState<Order[]>([
    {
      id: '1',
      restaurantName: 'Pasta & Vino',
      restaurantImage: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      items: [
        { id: '1', name: 'Pizza Margherita', quantity: 1, price: 45.90 },
        { id: '2', name: 'Spaghetti Carbonara', quantity: 1, price: 36.90 },
        { id: '3', name: 'Tiramisù', quantity: 1, price: 18.90 },
      ],
      total: 101.70,
      status: 'delivering',
      orderDate: '02/06/2026',
      deliveryTime: '25-35 min',
    },
    {
      id: '2',
      restaurantName: 'Sushi Premium',
      restaurantImage: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzI0OTI0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      items: [
        { id: '1', name: 'Combo Sushi 30 peças', quantity: 1, price: 89.90 },
        { id: '2', name: 'Temaki Salmão', quantity: 2, price: 25.90 },
      ],
      total: 141.70,
      status: 'delivered',
      orderDate: '01/06/2026',
      deliveryTime: 'Entregue',
    },
    {
      id: '3',
      restaurantName: 'Tacos Mexicanos',
      restaurantImage: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MjU2NzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      items: [
        { id: '1', name: 'Tacos de Carne', quantity: 3, price: 15.90 },
      ],
      total: 47.70,
      status: 'delivered',
      orderDate: '30/05/2026',
      deliveryTime: 'Entregue',
    },
  ]);

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Aguardando confirmação',
          icon: <Clock className="w-5 h-5" />,
          color: '#F97316',
          bgColor: '#FED7AA',
        };
      case 'preparing':
        return {
          label: 'Preparando',
          icon: <Package className="w-5 h-5" />,
          color: '#F97316',
          bgColor: '#FED7AA',
        };
      case 'delivering':
        return {
          label: 'A caminho',
          icon: <Package className="w-5 h-5" />,
          color: '#22C55E',
          bgColor: '#DCFCE7',
        };
      case 'delivered':
        return {
          label: 'Entregue',
          icon: <CheckCircle className="w-5 h-5" />,
          color: '#22C55E',
          bgColor: '#DCFCE7',
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          icon: <XCircle className="w-5 h-5" />,
          color: '#EF4444',
          bgColor: '#FEE2E2',
        };
    }
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/home');
    } else if (tab === 'favorites') {
      navigate('/favorites');
    } else if (tab === 'profile') {
      navigate('/profile');
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
              Meus Pedidos
            </h1>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <Package className="w-16 h-16 mb-4" style={{ color: '#FED7AA' }} />
              <p className="font-bold text-lg mb-2" style={{ color: '#7C2D12' }}>
                Nenhum pedido ainda
              </p>
              <p className="text-center text-sm mb-6" style={{ color: '#9A3412' }}>
                Quando você fizer um pedido, ele aparecerá aqui
              </p>
              <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 rounded-full font-bold text-white active:scale-95 transition-transform"
                style={{ backgroundColor: '#F97316' }}
              >
                Explorar restaurantes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}
                    onClick={() => console.log('Ver detalhes do pedido:', order.id)}
                  >
                    {/* Restaurant Info */}
                    <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: '#FED7AA' }}>
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={order.restaurantImage}
                          alt={order.restaurantName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base" style={{ color: '#7C2D12' }}>
                          {order.restaurantName}
                        </p>
                        <p className="text-sm" style={{ color: '#9A3412' }}>
                          {order.orderDate} • #{order.id}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-4 border-b" style={{ borderColor: '#FED7AA' }}>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-start">
                            <div className="flex-1">
                              <span className="text-sm" style={{ color: '#7C2D12' }}>
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                            <span className="text-sm font-medium" style={{ color: '#7C2D12' }}>
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status and Total */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="p-2 rounded-full"
                          style={{ backgroundColor: statusInfo.bgColor }}
                        >
                          <div style={{ color: statusInfo.color }}>
                            {statusInfo.icon}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: statusInfo.color }}>
                            {statusInfo.label}
                          </p>
                          <p className="text-xs" style={{ color: '#9A3412' }}>
                            {order.deliveryTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs" style={{ color: '#9A3412' }}>
                          Total
                        </p>
                        <p className="text-lg font-bold" style={{ color: '#F97316' }}>
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              <User
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

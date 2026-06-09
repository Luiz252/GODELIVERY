import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, Tag, Truck, Bell, BellOff } from 'lucide-react';

type NotificationType = 'order' | 'promo' | 'delivery' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'delivery',
    title: 'Seu pedido saiu para entrega!',
    description: 'O pedido #1234 do Sushi Premium está a caminho',
    time: 'Agora',
    isRead: false,
  },
  {
    id: '2',
    type: 'promo',
    title: '20% OFF em pizzas hoje!',
    description: 'Use o cupom PIZZA20 e aproveite o desconto',
    time: 'Há 2 horas',
    isRead: false,
  },
  {
    id: '3',
    type: 'order',
    title: 'Pedido entregue com sucesso',
    description: 'Avalie sua experiência com Pasta & Vino',
    time: 'Ontem',
    isRead: true,
  },
  {
    id: '4',
    type: 'promo',
    title: 'Frete grátis no fim de semana!',
    description: 'Peça sem taxa de entrega sábado e domingo',
    time: 'Há 2 dias',
    isRead: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Bem-vindo ao GoDelivery!',
    description: 'Use o cupom BEMVINDO e ganhe R$10 de desconto',
    time: 'Há 5 dias',
    isRead: true,
  },
];

const iconConfig: Record<NotificationType, { bg: string; color: string; Icon: React.ElementType }> = {
  order:    { bg: '#FFF7ED', color: '#F97316', Icon: Package },
  promo:    { bg: '#FEF3C7', color: '#F59E0B', Icon: Tag },
  delivery: { bg: '#DCFCE7', color: '#22C55E', Icon: Truck },
  system:   { bg: '#F3F4F6', color: '#6B7280', Icon: Bell },
};

export function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      className="w-full min-h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: '#FFF7ED' }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <div
        className="px-6 pt-12 pb-4 flex items-center justify-between"
        style={{ backgroundColor: '#FFF7ED' }}
      >
        {/* Left: back + title */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/home')}
            className="p-2 -ml-2 rounded-full active:bg-orange-100 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#7C2D12' }} />
          </button>
          <h1 className="text-xl font-bold ml-4" style={{ color: '#7C2D12' }}>
            Notificações
          </h1>
        </div>

        {/* Right: mark all read */}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm font-medium active:opacity-60 transition-opacity"
            style={{ color: '#F97316' }}
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto px-6">
        {notifications.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <BellOff className="w-16 h-16" style={{ color: '#FED7AA' }} />
            <p className="text-base font-bold" style={{ color: '#7C2D12' }}>
              Nenhuma notificação
            </p>
            <p className="text-sm" style={{ color: '#9A3412' }}>
              Suas notificações aparecerão aqui
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { bg, color, Icon } = iconConfig[notification.type];
            return (
              <button
                key={notification.id}
                className="w-full text-left flex items-start gap-3 py-4 transition-colors"
                style={{
                  borderBottom: '1px solid #FED7AA',
                  ...(notification.isRead
                    ? {}
                    : {
                        backgroundColor: 'white',
                        borderLeftWidth: '4px',
                        borderLeftColor: '#F97316',
                        paddingLeft: '12px',
                        marginLeft: '-12px',
                        paddingRight: '0',
                        width: 'calc(100% + 12px)',
                        borderRadius: '0 8px 8px 0',
                      }),
                }}
                onClick={() => markAsRead(notification.id)}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold"
                    style={{ color: '#7C2D12' }}
                  >
                    {notification.title}
                  </p>
                  <p
                    className="text-sm mt-1 line-clamp-2"
                    style={{ color: '#9A3412' }}
                  >
                    {notification.description}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: '#9A3412', opacity: 0.6 }}
                  >
                    {notification.time}
                  </p>
                </div>

                {/* Unread dot */}
                {!notification.isRead && (
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: '#F97316' }}
                  />
                )}
              </button>
            );
          })
        )}
      </div>
      </div>
    </div>
  );
}

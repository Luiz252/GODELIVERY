import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Bell, Pizza, UtensilsCrossed, Wine, Cake, Heart, Star, Clock, DollarSign, Home as HomeIcon, Package, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  isFavorite: boolean;
}

interface PromoBanner {
  id: string;
  image: string;
  title: string;
}

export function HomeScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = [
    { id: '1', name: 'Pizza', icon: <Pizza className="w-6 h-6" /> },
    { id: '2', name: 'Hambúrguer', icon: <UtensilsCrossed className="w-6 h-6" /> },
    { id: '3', name: 'Sushi', icon: <UtensilsCrossed className="w-6 h-6" /> },
    { id: '4', name: 'Bebidas', icon: <Wine className="w-6 h-6" /> },
    { id: '5', name: 'Sobremesas', icon: <Cake className="w-6 h-6" /> },
  ];

  const promoBanners: PromoBanner[] = [
    {
      id: '1',
      title: '20% OFF em pizzas hoje!',
      image: 'https://images.unsplash.com/photo-1563683640683-74f1723873d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHByb21vJTIwYmFubmVyfGVufDF8fHx8MTc3MjU4MDc0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Combo Burger + Batata',
      image: 'https://images.unsplash.com/photo-1762597151434-cfedca67d21b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwYmFubmVyfGVufDF8fHx8MTc3MjU4MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Sushi Premium',
      image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzI0OTI0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      deliveryTime: '30-40 min',
      deliveryFee: 'Grátis',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Pasta & Vino',
      image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      deliveryTime: '25-35 min',
      deliveryFee: 'R$ 5,00',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Tacos Mexicanos',
      image: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MjU2NzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      deliveryTime: '20-30 min',
      deliveryFee: 'R$ 3,50',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Salad Bar',
      image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kJTIwYm93bHxlbnwxfHx8fDE3NzI1NDg2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      deliveryTime: '15-25 min',
      deliveryFee: 'Grátis',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setRestaurants(restaurants.map(restaurant =>
      restaurant.id === id ? { ...restaurant, isFavorite: !restaurant.isFavorite } : restaurant
    ));
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'orders') {
      navigate('/orders');
    } else if (tab === 'favorites') {
      navigate('/favorites');
    } else if (tab === 'profile') {
      navigate('/profile');
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 space-y-4" style={{ backgroundColor: '#FFF7ED' }}>
        {/* Greeting and Notification */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold" style={{ color: '#7C2D12' }}>
            Olá, João
          </h1>
          <button
            className="p-2 rounded-full bg-white active:bg-gray-50 transition-colors relative"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
            aria-label="Notificações"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="w-6 h-6" style={{ color: '#F97316' }} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => navigate('/search')}
          className="relative w-full flex items-center h-12 pl-12 pr-4 bg-white rounded-xl border-2 text-left text-sm transition-all active:scale-[0.98]"
          style={{
            borderColor: '#FED7AA',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9A3412' }} />
          <span style={{ color: '#9A3412', opacity: 0.6 }}>Busque por pratos ou restaurantes</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Promo Banners */}
        <div className="px-6 mb-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {promoBanners.map((banner) => (
              <button
                key={banner.id}
                className="flex-shrink-0 relative w-[280px] h-[120px] rounded-2xl overflow-hidden active:scale-95 transition-transform"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
                onClick={() => console.log('Banner clicked:', banner.id)}
              >
                <ImageWithFallback
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">{banner.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#7C2D12' }}>
            Categorias
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-white rounded-xl active:scale-95 transition-transform min-w-[80px]"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                onClick={() => console.log('Category clicked:', category.id)}
              >
                <div className="p-2 rounded-full" style={{ backgroundColor: '#FFF7ED' }}>
                  <div style={{ color: '#F97316' }}>
                    {category.icon}
                  </div>
                </div>
                <span className="text-xs font-medium text-center" style={{ color: '#7C2D12' }}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants List */}
        <div className="px-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#7C2D12' }}>
            Restaurantes em destaque
          </h2>
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="w-full bg-white rounded-2xl overflow-hidden active:scale-98 transition-transform text-left cursor-pointer"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <div className="relative h-[140px]">
                  <ImageWithFallback
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(restaurant.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm active:scale-90 transition-transform"
                    aria-label="Favoritar"
                  >
                    <Heart
                      className="w-5 h-5"
                      style={{
                        color: restaurant.isFavorite ? '#F97316' : '#9A3412',
                        fill: restaurant.isFavorite ? '#F97316' : 'none',
                      }}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2" style={{ color: '#7C2D12' }}>
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" style={{ color: '#F97316', fill: '#F97316' }} />
                      <span className="font-medium" style={{ color: '#7C2D12' }}>
                        {restaurant.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: '#9A3412' }}>
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: '#9A3412' }}>
                      <DollarSign className="w-4 h-4" />
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
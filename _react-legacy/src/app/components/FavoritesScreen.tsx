import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, Star, Clock, DollarSign, Home as HomeIcon, Package, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
}

export function FavoritesScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');

  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([
    {
      id: '2',
      name: 'Pasta & Vino',
      image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      deliveryTime: '25-35 min',
      deliveryFee: 'R$ 5,00',
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavoriteRestaurants(favoriteRestaurants.filter(r => r.id !== id));
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/home');
    } else if (tab === 'orders') {
      navigate('/orders');
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
              Favoritos
            </h1>
          </div>
        </div>

        {/* Favorites List */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {favoriteRestaurants.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <Heart className="w-16 h-16 mb-4" style={{ color: '#FED7AA' }} />
              <p className="font-bold text-lg mb-2" style={{ color: '#7C2D12' }}>
                Nenhum favorito ainda
              </p>
              <p className="text-center text-sm mb-6" style={{ color: '#9A3412' }}>
                Adicione restaurantes aos favoritos para vê-los aqui
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
              {favoriteRestaurants.map((restaurant) => (
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
                        removeFavorite(restaurant.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm active:scale-90 transition-transform"
                      aria-label="Remover dos favoritos"
                    >
                      <Heart
                        className="w-5 h-5"
                        style={{ color: '#F97316', fill: '#F97316' }}
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

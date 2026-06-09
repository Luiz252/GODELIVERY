import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Heart, Star, Clock, Bike, Plus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela fresca, manjericão e azeite',
    price: 'R$ 45,90',
    image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3NzI2MDI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizzas',
  },
  {
    id: '2',
    name: 'Pizza Calabresa',
    description: 'Calabresa fatiada, cebola roxa, azeitonas e molho especial',
    price: 'R$ 42,90',
    image: 'https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3MjU4NzkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizzas',
  },
  {
    id: '3',
    name: 'Lasanha Bolonhesa',
    description: 'Massa fresca artesanal, molho bolonhesa com carne e queijos',
    price: 'R$ 38,90',
    image: 'https://images.unsplash.com/photo-1767065583952-e932c354bca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwYmFrZWQlMjBkaXNofGVufDF8fHx8MTc3MjY5NzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Massas',
  },
  {
    id: '4',
    name: 'Spaghetti Carbonara',
    description: 'Bacon crocante, ovos caipira, parmesão e pimenta preta',
    price: 'R$ 36,90',
    image: 'https://images.unsplash.com/photo-1764586119076-61711e8ed25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib25hcmElMjBwYXN0YSUyMGNyZWFteXxlbnwxfHx8fDE3NzI2NDI3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Massas',
  },
  {
    id: '5',
    name: 'Tiramisù',
    description: 'Sobremesa italiana clássica com café espresso e mascarpone',
    price: 'R$ 18,90',
    image: 'https://images.unsplash.com/photo-1732869931523-8fd0437da0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnQlMjBpdGFsaWFufGVufDF8fHx8MTc3MjY0MjUwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sobremesas',
  },
];

const categories = ['Populares', 'Pizzas', 'Massas', 'Bebidas', 'Sobremesas'];

export function RestaurantScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'about'>('menu');
  const [activeCategory, setActiveCategory] = useState('Populares');

  const filteredProducts =
    activeCategory === 'Populares'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      {/* Cover Image */}
      <div className="relative w-full h-48 flex-shrink-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1622140739492-f82f386260b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZm9vZHxlbnwxfHx8fDE3NzI2MDcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Pasta & Vino"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('/home')}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#7C2D12' }} />
        </button>

        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-12 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Favoritar"
        >
          <Heart
            className="w-5 h-5"
            style={{
              color: isFavorite ? '#F97316' : '#7C2D12',
              fill: isFavorite ? '#F97316' : 'none',
            }}
          />
        </button>
      </div>

      {/* Info Card */}
      <div
        className="bg-white rounded-t-3xl p-6 shadow-lg -mt-6 flex-1 flex flex-col"
      >
        {/* Header */}
        <div className="flex gap-4 items-start">
          {/* Logo */}
          <div
            className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
            style={{ border: '2px solid #FED7AA' }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1620379732605-03ec9d212d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjByZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NzI2OTczMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Pasta & Vino logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold" style={{ color: '#7C2D12' }}>
              Pasta & Vino
            </h1>
            <p className="text-sm mt-1" style={{ color: '#9A3412' }}>
              Italiana • Massas • Pizza
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: '#22C55E' }}>
                Aberto agora
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div
          className="flex items-center justify-between mt-4 py-4"
          style={{ borderTop: '1px solid #FED7AA', borderBottom: '1px solid #FED7AA' }}
        >
          {/* Rating */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5" style={{ color: '#F97316', fill: '#F97316' }} />
              <span className="font-bold" style={{ color: '#7C2D12' }}>
                4.8
              </span>
            </div>
            <span className="text-xs" style={{ color: '#9A3412' }}>
              (234)
            </span>
          </div>

          {/* Time */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" style={{ color: '#9A3412' }} />
              <span className="font-bold" style={{ color: '#7C2D12' }}>
                30-40
              </span>
            </div>
            <span className="text-xs" style={{ color: '#9A3412' }}>
              min
            </span>
          </div>

          {/* Delivery */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <Bike className="w-5 h-5" style={{ color: '#22C55E' }} />
              <span className="font-bold" style={{ color: '#22C55E' }}>
                Grátis
              </span>
            </div>
            <span className="text-xs" style={{ color: '#9A3412' }}>
              entrega
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-4">
          {(['menu', 'reviews', 'about'] as const).map((tab) => {
            const labels = { menu: 'Cardápio', reviews: 'Avaliações', about: 'Sobre' };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-center font-medium transition-colors"
                style={{
                  color: isActive ? '#F97316' : '#9A3412',
                  borderBottom: `2px solid ${isActive ? '#F97316' : 'transparent'}`,
                }}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Category chips */}
        {activeTab === 'menu' && (
          <div
            className="flex gap-2 overflow-x-auto px-6 py-3 -mx-6"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors no-scrollbar"
                  style={
                    isActive
                      ? { backgroundColor: '#F97316', color: 'white' }
                      : {
                          backgroundColor: 'white',
                          border: '1px solid #FED7AA',
                          color: '#7C2D12',
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Product list */}
        {activeTab === 'menu' && (
          <div
            className="flex-1 overflow-y-auto -mx-6 px-6 pb-24"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 py-4"
                style={{ borderBottom: '1px solid #FED7AA' }}
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold" style={{ color: '#7C2D12' }}>
                    {product.name}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2" style={{ color: '#9A3412' }}>
                    {product.description}
                  </p>
                  <p className="text-base font-bold mt-2" style={{ color: '#F97316' }}>
                    {product.price}
                  </p>
                </div>

                {/* Image + button */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                    style={{ backgroundColor: '#F97316' }}
                    aria-label={`Adicionar ${product.name}`}
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === 'reviews' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <Star className="w-12 h-12" style={{ color: '#FED7AA' }} />
            <p className="font-bold text-base" style={{ color: '#7C2D12' }}>
              Avaliações em breve
            </p>
            <p className="text-sm text-center" style={{ color: '#9A3412' }}>
              As avaliações dos clientes aparecerão aqui
            </p>
          </div>
        )}

        {/* About tab */}
        {activeTab === 'about' && (
          <div className="flex-1 overflow-y-auto space-y-4 pb-24">
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: '#7C2D12' }}>
                Sobre o restaurante
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9A3412' }}>
                O Pasta & Vino é um restaurante italiano clássico, fundado em 2010, com receitas
                tradicionais transmitidas por gerações. Usamos ingredientes importados e massas
                artesanais preparadas diariamente.
              </p>
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: '#7C2D12' }}>
                Horário de funcionamento
              </p>
              <p className="text-sm" style={{ color: '#9A3412' }}>
                Segunda a sexta: 11h – 23h
              </p>
              <p className="text-sm" style={{ color: '#9A3412' }}>
                Sábado e domingo: 11h – 00h
              </p>
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: '#7C2D12' }}>
                Endereço
              </p>
              <p className="text-sm" style={{ color: '#9A3412' }}>
                Rua das Flores, 142 – Jardins, São Paulo – SP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating cart button */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed bottom-6 left-6 right-6 h-14 rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-transform"
        style={{
          backgroundColor: '#F97316',
          boxShadow: '0 8px 16px rgba(249, 115, 22, 0.3)',
        }}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-white" />
          <span className="font-bold text-white">Ver carrinho</span>
          <span className="text-sm text-white/80">(3)</span>
        </div>
        <span className="font-bold text-white">R$ 127,70</span>
      </button>
    </div>
  );
}

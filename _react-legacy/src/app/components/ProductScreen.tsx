import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela fresca, manjericão e azeite',
    price: 'R$ 45,90',
    priceValue: 45.90,
    image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3NzI2MDI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizzas',
    rating: 4.8,
    reviews: 127,
  },
  '2': {
    id: '2',
    name: 'Pizza Calabresa',
    description: 'Calabresa fatiada, cebola roxa, azeitonas e molho especial',
    price: 'R$ 42,90',
    priceValue: 42.90,
    image: 'https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3MjU4NzkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizzas',
    rating: 4.7,
    reviews: 98,
  },
  '3': {
    id: '3',
    name: 'Lasanha Bolonhesa',
    description: 'Massa fresca artesanal, molho bolonhesa com carne e queijos',
    price: 'R$ 38,90',
    priceValue: 38.90,
    image: 'https://images.unsplash.com/photo-1767065583952-e932c354bca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwYmFrZWQlMjBkaXNofGVufDF8fHx8MTc3MjY5NzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Massas',
    rating: 4.9,
    reviews: 156,
  },
  '4': {
    id: '4',
    name: 'Spaghetti Carbonara',
    description: 'Bacon crocante, ovos caipira, parmesão e pimenta preta',
    price: 'R$ 36,90',
    priceValue: 36.90,
    image: 'https://images.unsplash.com/photo-1764586119076-61711e8ed25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib25hcmElMjBwYXN0YSUyMGNyZWFteXxlbnwxfHx8fDE3NzI2NDI3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Massas',
    rating: 4.8,
    reviews: 143,
  },
  '5': {
    id: '5',
    name: 'Tiramisù',
    description: 'Sobremesa italiana clássica com café espresso e mascarpone',
    price: 'R$ 18,90',
    priceValue: 18.90,
    image: 'https://images.unsplash.com/photo-1732869931523-8fd0437da0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnQlMjBpdGFsaWFufGVufDF8fHx8MTc3MjY0MjUwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sobremesas',
    rating: 4.9,
    reviews: 189,
  },
};

export function ProductScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = id ? products[id] : null;

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
        <div className="text-center">
          <p className="font-bold text-xl" style={{ color: '#7C2D12' }}>Produto não encontrado</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 rounded-full"
            style={{ backgroundColor: '#F97316', color: 'white' }}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = (product.priceValue * quantity).toFixed(2).replace('.', ',');

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: '#FFF7ED' }}>
      {/* Product Image */}
      <div className="relative w-full h-80 flex-shrink-0">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#7C2D12' }} />
        </button>
      </div>

      {/* Product Info */}
      <div className="bg-white rounded-t-3xl p-6 shadow-lg -mt-6 flex-1 flex flex-col">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold flex-1" style={{ color: '#7C2D12' }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-5 h-5" style={{ color: '#F97316', fill: '#F97316' }} />
              <span className="font-bold" style={{ color: '#7C2D12' }}>
                {product.rating}
              </span>
              <span className="text-sm" style={{ color: '#9A3412' }}>
                ({product.reviews})
              </span>
            </div>
          </div>

          <p className="text-base mt-3 leading-relaxed" style={{ color: '#9A3412' }}>
            {product.description}
          </p>

          <div
            className="flex items-center gap-2 mt-4 pt-4"
            style={{ borderTop: '1px solid #FED7AA' }}
          >
            <span className="text-sm" style={{ color: '#9A3412' }}>
              Categoria:
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#FED7AA', color: '#7C2D12' }}
            >
              {product.category}
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Quantity and Price */}
        <div className="space-y-4 pt-4" style={{ borderTop: '1px solid #FED7AA' }}>
          {/* Quantity */}
          <div className="flex items-center justify-between">
            <span className="font-bold" style={{ color: '#7C2D12' }}>
              Quantidade
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                style={{ backgroundColor: '#FED7AA' }}
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-5 h-5" style={{ color: '#7C2D12' }} />
              </button>
              <span className="text-xl font-bold w-8 text-center" style={{ color: '#7C2D12' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                style={{ backgroundColor: '#F97316' }}
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={() => navigate('/cart')}
            className="w-full h-14 rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-transform"
            style={{
              backgroundColor: '#F97316',
              boxShadow: '0 8px 16px rgba(249, 115, 22, 0.3)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="font-bold text-white">Adicionar ao carrinho</span>
            </div>
            <span className="font-bold text-white">R$ {totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

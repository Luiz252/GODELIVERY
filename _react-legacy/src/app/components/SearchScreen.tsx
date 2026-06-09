import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Search, Clock, X, Pizza, UtensilsCrossed, Fish, Wine, Cake, Utensils, Leaf, Grid3x3, Cherry
} from 'lucide-react';

const INITIAL_RECENT = ['Pizza', 'Sushi Premium', 'Hambúrguer', 'Açaí'];

const FILTER_CHIPS = [
  'Entrega grátis',
  'Até 30 min',
  '30-45 min',
  'Melhor avaliados',
  'Mais próximos',
  'Promoções',
];

const CATEGORIES = [
  { id: '1', name: 'Pizza', icon: <Pizza size={32} className="text-[#F97316]" /> },
  { id: '2', name: 'Hambúrguer', icon: <UtensilsCrossed size={32} className="text-[#F97316]" /> },
  { id: '3', name: 'Sushi', icon: <Fish size={32} className="text-[#F97316]" /> },
  { id: '4', name: 'Açaí', icon: <Cherry size={32} className="text-[#F97316]" /> },
  { id: '5', name: 'Bebidas', icon: <Wine size={32} className="text-[#F97316]" /> },
  { id: '6', name: 'Doces', icon: <Cake size={32} className="text-[#F97316]" /> },
  { id: '7', name: 'Brasileira', icon: <Utensils size={32} className="text-[#F97316]" /> },
  { id: '8', name: 'Saudável', icon: <Leaf size={32} className="text-[#F97316]" /> },
  { id: '9', name: 'Ver todos', icon: <Grid3x3 size={32} className="text-[#F97316]" /> },
];

export function SearchScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const removeRecent = (item: string) => {
    setRecentSearches(prev => prev.filter(s => s !== item));
  };

  const clearAll = () => setRecentSearches([]);

  const clickRecent = (item: string) => setSearchQuery(item);

  const toggleFilter = (chip: string) => {
    setActiveFilters(prev =>
      prev.includes(chip) ? prev.filter(f => f !== chip) : [...prev, chip]
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7ED] flex flex-col overflow-hidden">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <div className="pt-12 px-6 pb-4 flex items-center gap-3 bg-[#FFF7ED]">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center justify-center w-10 h-10 shrink-0"
        >
          <ArrowLeft size={24} className="text-[#7C2D12]" />
        </button>

        {/* Search field */}
        <div className="flex-1 h-12 bg-white border-2 border-[#FED7AA] rounded-xl flex items-center px-4 gap-3">
          <Search size={20} className="text-[#9A3412] shrink-0" />
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar restaurantes, pratos..."
            className="flex-1 bg-transparent outline-none text-[#7C2D12] placeholder-[#FDBA74] text-sm"
          />
          {searchQuery.length > 0 && (
            <button onClick={() => setSearchQuery('')}>
              <X size={18} className="text-[#9A3412]" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mt-4 mb-3">
              <span className="text-base text-[#7C2D12]" style={{ fontWeight: 700 }}>
                Buscas recentes
              </span>
              <button onClick={clearAll} className="text-sm text-[#F97316]">
                Limpar
              </button>
            </div>

            {recentSearches.map(item => (
              <div
                key={item}
                className="flex items-center justify-between py-3 border-b border-[#FED7AA]"
              >
                <button
                  className="flex items-center gap-3 flex-1 text-left"
                  onClick={() => clickRecent(item)}
                >
                  <Clock size={18} className="text-[#9A3412] shrink-0" />
                  <span className="text-sm text-[#7C2D12]">{item}</span>
                </button>
                <button onClick={() => removeRecent(item)}>
                  <X size={18} className="text-[#9A3412]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Filter chips */}
        <div>
          <p className="text-base text-[#7C2D12] mt-6 mb-3" style={{ fontWeight: 700 }}>
            Filtros
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {FILTER_CHIPS.map(chip => {
              const active = activeFilters.includes(chip);
              return (
                <button
                  key={chip}
                  onClick={() => toggleFilter(chip)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 border transition-all ${
                    active
                      ? 'bg-[#F97316] text-white border-[#F97316]'
                      : 'bg-white text-[#7C2D12] border-[#FED7AA]'
                  }`}
                  style={{ fontWeight: active ? 500 : 400 }}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <p className="text-base text-[#7C2D12] mt-6 mb-3" style={{ fontWeight: 700 }}>
            Categorias
          </p>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className="flex flex-col items-center p-4 bg-white rounded-xl"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                {cat.icon}
                <span className="text-xs text-[#7C2D12] mt-2" style={{ fontWeight: 500 }}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
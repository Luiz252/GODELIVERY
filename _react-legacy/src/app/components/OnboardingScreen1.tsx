import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function OnboardingScreen1() {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-between px-6 relative overflow-hidden"
      style={{ backgroundColor: '#FFF7ED' }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-screen">
        {/* Skip Button */}
        <button
          onClick={() => navigate('/login')}
          className="absolute top-12 right-6 text-sm font-medium transition-opacity active:opacity-70"
          style={{ color: '#9A3412' }}
        >
          Pular
        </button>

        {/* Illustration Area */}
        <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-8">
        {/* Illustration */}
        <div className="w-[280px] h-[280px] mb-12 flex items-center justify-center">
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Door/House */}
            <rect x="60" y="80" width="160" height="180" rx="8" fill="#FED7AA" />
            <rect x="100" y="160" width="80" height="100" fill="#7C2D12" />
            <circle cx="175" cy="210" r="4" fill="#F97316" />
            
            {/* Window */}
            <rect x="90" y="110" width="40" height="40" rx="4" fill="#FFFFFF" />
            <rect x="150" y="110" width="40" height="40" rx="4" fill="#FFFFFF" />
            
            {/* Delivery Person */}
            <circle cx="200" cy="140" r="20" fill="#F97316" />
            <rect x="185" y="160" width="30" height="50" rx="8" fill="#F97316" />
            <rect x="180" y="200" width="15" height="30" rx="4" fill="#EA580C" />
            <rect x="205" y="200" width="15" height="30" rx="4" fill="#EA580C" />
            
            {/* Arms */}
            <rect x="165" y="165" width="20" height="10" rx="5" fill="#EA580C" />
            <rect x="215" y="165" width="20" height="10" rx="5" fill="#EA580C" />
            
            {/* Delivery Box */}
            <rect x="230" y="155" width="35" height="35" rx="4" fill="#7C2D12" />
            <path d="M 230 172 L 265 172" stroke="#F97316" strokeWidth="2" />
            <path d="M 247.5 155 L 247.5 190" stroke="#F97316" strokeWidth="2" />
            
            {/* Ground */}
            <ellipse cx="140" cy="250" rx="80" ry="10" fill="#FED7AA" opacity="0.5" />
            
            {/* Food Icons floating */}
            <g opacity="0.8">
              <circle cx="50" cy="100" r="8" fill="#F97316" />
              <circle cx="230" cy="90" r="6" fill="#EA580C" />
              <circle cx="45" cy="180" r="7" fill="#F97316" />
            </g>
          </svg>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center max-w-[280px]">
          <h1 className="text-2xl font-bold text-center mb-3" style={{ color: '#7C2D12' }}>
            Peça sua comida favorita
          </h1>
          <p className="text-base text-center leading-relaxed" style={{ color: '#9A3412' }}>
            Escolha entre centenas de restaurantes perto de você
          </p>
        </div>
      </div>

        {/* Page Indicators and Next Button */}
        <div className="pb-12 flex flex-col items-center gap-6">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ width: '24px', backgroundColor: '#F97316' }}
            />
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FED7AA' }}
            />
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FED7AA' }}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={() => navigate('/onboarding-2')}
            className="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

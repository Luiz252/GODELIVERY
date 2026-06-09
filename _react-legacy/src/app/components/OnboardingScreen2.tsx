import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function OnboardingScreen2() {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-between px-6 relative overflow-hidden"
      style={{ backgroundColor: '#FFF7ED' }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate('/onboarding-1')}
          className="absolute top-12 left-6 p-2 rounded-full active:bg-black/5 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#7C2D12' }} />
        </button>

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
            {/* Road/Ground */}
            <ellipse cx="140" cy="230" rx="100" ry="15" fill="#FED7AA" opacity="0.6" />
            
            {/* Delivery Person Body */}
            <circle cx="120" cy="120" r="18" fill="#F97316" />
            <rect x="107" y="138" width="26" height="45" rx="8" fill="#F97316" />
            
            {/* Arms */}
            <rect x="92" y="145" width="15" height="8" rx="4" fill="#EA580C" />
            <rect x="133" y="145" width="15" height="8" rx="4" fill="#EA580C" />
            
            {/* Legs */}
            <rect x="107" y="175" width="11" height="25" rx="4" fill="#EA580C" />
            <rect x="122" y="175" width="11" height="25" rx="4" fill="#EA580C" />
            
            {/* Backpack/Thermal Bag */}
            <rect x="95" y="125" width="35" height="40" rx="6" fill="#7C2D12" />
            <rect x="102" y="132" width="21" height="26" rx="3" fill="#9A3412" />
            <path d="M 112.5 125 L 112.5 110" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
            
            {/* Motorcycle */}
            <g transform="translate(140, 160)">
              {/* Body */}
              <rect x="0" y="20" width="70" height="20" rx="8" fill="#F97316" />
              <rect x="10" y="10" width="25" height="15" rx="4" fill="#EA580C" />
              
              {/* Wheels */}
              <circle cx="15" cy="50" r="15" fill="#7C2D12" />
              <circle cx="15" cy="50" r="10" fill="#9A3412" />
              <circle cx="15" cy="50" r="5" fill="#FED7AA" />
              
              <circle cx="55" cy="50" r="15" fill="#7C2D12" />
              <circle cx="55" cy="50" r="10" fill="#9A3412" />
              <circle cx="55" cy="50" r="5" fill="#FED7AA" />
              
              {/* Handlebar */}
              <path d="M 35 15 L 35 25" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="15" x2="45" y2="15" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
              
              {/* Seat */}
              <rect x="40" y="12" width="20" height="8" rx="4" fill="#7C2D12" />
            </g>
            
            {/* Speed Lines */}
            <g opacity="0.4">
              <line x1="30" y1="140" x2="50" y2="140" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="160" x2="45" y2="160" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="180" x2="50" y2="180" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
            </g>
            
            {/* Floating Food Icons */}
            <g opacity="0.7">
              <circle cx="60" cy="80" r="8" fill="#F97316" />
              <circle cx="220" cy="100" r="6" fill="#EA580C" />
              <circle cx="240" cy="150" r="7" fill="#F97316" />
            </g>
          </svg>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center max-w-[280px]">
          <h1 className="text-2xl font-bold text-center mb-3" style={{ color: '#7C2D12' }}>
            Entrega rápida e segura
          </h1>
          <p className="text-base text-center leading-relaxed" style={{ color: '#9A3412' }}>
            Acompanhe seu pedido em tempo real até chegar em você
          </p>
        </div>
      </div>

        {/* Page Indicators and Next Button */}
        <div className="pb-12 flex flex-col items-center gap-6">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FED7AA' }}
            />
            <div 
              className="h-2 rounded-full transition-all"
              style={{ width: '24px', backgroundColor: '#F97316' }}
            />
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FED7AA' }}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={() => navigate('/onboarding-3')}
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

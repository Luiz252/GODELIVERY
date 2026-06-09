import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function OnboardingScreen3() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/login');
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-between px-6 relative overflow-hidden"
      style={{ backgroundColor: '#FFF7ED' }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate('/onboarding-2')}
          className="absolute top-12 left-6 p-2 rounded-full active:bg-black/5 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#7C2D12' }} />
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
            {/* Table */}
            <ellipse cx="140" cy="180" rx="90" ry="12" fill="#FED7AA" />
            <rect x="60" y="140" width="160" height="40" rx="8" fill="#FDBA74" />
            
            {/* Person sitting */}
            <g transform="translate(105, 80)">
              {/* Head */}
              <circle cx="35" cy="0" r="20" fill="#F97316" />
              
              {/* Body */}
              <rect x="22" y="20" width="26" height="40" rx="8" fill="#EA580C" />
              
              {/* Arms */}
              <rect x="8" y="30" width="14" height="8" rx="4" fill="#EA580C" />
              <rect x="48" y="30" width="14" height="8" rx="4" fill="#EA580C" />
              
              {/* Legs (sitting) */}
              <rect x="22" y="58" width="10" height="20" rx="4" fill="#F97316" />
              <rect x="38" y="58" width="10" height="20" rx="4" fill="#F97316" />
            </g>
            
            {/* Food on table */}
            <g transform="translate(140, 135)">
              {/* Plate */}
              <circle cx="0" cy="0" r="28" fill="#FFEDD5" />
              <circle cx="0" cy="0" r="24" fill="#FED7AA" />
              
              {/* Pizza slice */}
              <path 
                d="M -8 -5 L 8 -5 L 0 -20 Z" 
                fill="#F97316" 
              />
              <circle cx="-3" cy="-10" r="2" fill="#EA580C" />
              <circle cx="3" cy="-8" r="2" fill="#EA580C" />
              <circle cx="0" cy="-13" r="2" fill="#EA580C" />
              
              {/* Burger */}
              <rect x="-10" y="2" width="20" height="12" rx="6" fill="#F97316" />
              <rect x="-9" y="5" width="18" height="3" fill="#EA580C" />
              <rect x="-9" y="9" width="18" height="2" fill="#7C2D12" />
            </g>
            
            {/* Drink cup */}
            <g transform="translate(190, 145)">
              <rect x="-10" y="0" width="20" height="30" rx="3" fill="#F97316" />
              <rect x="-8" y="5" width="16" height="20" rx="2" fill="#EA580C" />
              <circle cx="0" cy="-5" r="11" fill="#F97316" />
              
              {/* Straw */}
              <rect x="5" y="-15" width="3" height="20" rx="1.5" fill="#FDBA74" />
            </g>
            
            {/* Happy face details */}
            <g transform="translate(140, 80)">
              {/* Eyes */}
              <circle cx="-6" cy="0" r="2.5" fill="#7C2D12" />
              <circle cx="6" cy="0" r="2.5" fill="#7C2D12" />
              
              {/* Smile */}
              <path 
                d="M -8 4 Q 0 10 8 4" 
                stroke="#7C2D12" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
              />
            </g>
            
            {/* Floating hearts */}
            <g opacity="0.6">
              <path d="M 60 100 L 63 96 L 67 96 L 70 100 L 65 106 Z" fill="#F97316" />
              <path d="M 210 90 L 213 86 L 217 86 L 220 90 L 215 96 Z" fill="#EA580C" />
              <path d="M 230 130 L 232 127 L 235 127 L 237 130 L 234.5 134 Z" fill="#F97316" />
            </g>
            
            {/* Steam from food */}
            <g opacity="0.4">
              <path d="M 130 110 Q 125 100 130 90" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 140 105 Q 135 95 140 85" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 150 110 Q 145 100 150 90" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
            
            {/* Money/coupon icon */}
            <g transform="translate(85, 160)">
              <rect x="0" y="0" width="30" height="20" rx="4" fill="#7C2D12" />
              <rect x="3" y="3" width="24" height="14" rx="2" fill="#9A3412" />
              <circle cx="15" cy="10" r="5" fill="#FDBA74" />
              <text x="15" y="12" fontSize="8" fill="#7C2D12" textAnchor="middle" fontWeight="bold">%</text>
            </g>
          </svg>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center max-w-[280px]">
          <h1 className="text-2xl font-bold text-center mb-3" style={{ color: '#7C2D12' }}>
            Aproveite sua refeição
          </h1>
          <p className="text-base text-center leading-relaxed" style={{ color: '#9A3412' }}>
            Pague online com segurança e ganhe cupons exclusivos
          </p>
        </div>
      </div>

        {/* Page Indicators and Start Button */}
        <div className="pb-12 flex flex-col items-center gap-6">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FED7AA' }}
            />
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FED7AA' }}
            />
            <div 
              className="h-2 rounded-full transition-all"
              style={{ width: '24px', backgroundColor: '#F97316' }}
            />
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
}
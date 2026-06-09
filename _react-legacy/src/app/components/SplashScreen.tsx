import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona após 3 segundos
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      
      if (hasSeenOnboarding) {
        navigate('/login');
      } else {
        navigate('/onboarding-1');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-between relative">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #EA580C 0%, #F97316 100%)'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 w-full max-w-md mx-auto">
        {/* Logo Container */}
        <div className="flex flex-col items-center gap-6">
          {/* Logo with Hamburger Icon */}
          <div className="flex flex-col items-center gap-4">
            {/* Minimalist Hamburger Icon */}
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2"
            >
              {/* Top Bun */}
              <path 
                d="M8 20C8 20 12 12 32 12C52 12 56 20 56 20C56 20 56 24 56 26C56 28 54 28 54 28H10C10 28 8 28 8 26C8 24 8 20 8 20Z" 
                fill="white"
                opacity="0.95"
              />
              {/* Lettuce */}
              <path 
                d="M10 28H54C54 28 54 30 52 32C50 34 48 34 48 34H16C16 34 14 34 12 32C10 30 10 28 10 28Z" 
                fill="white"
                opacity="0.85"
              />
              {/* Patty */}
              <rect 
                x="12" 
                y="34" 
                width="40" 
                height="8" 
                rx="2" 
                fill="white"
                opacity="0.95"
              />
              {/* Bottom Bun */}
              <path 
                d="M10 42H54C54 42 56 42 56 44C56 46 54 52 32 52C10 52 8 46 8 44C8 42 10 42 10 42Z" 
                fill="white"
                opacity="0.95"
              />
            </svg>

            {/* GoDelivery Text Logo */}
            <h1 className="text-5xl text-white font-bold tracking-tight">
              GoDelivery
            </h1>
          </div>

          {/* Slogan */}
          <p className="text-white text-base font-normal" style={{ opacity: 0.8 }}>
            Seu sabor, entregue rápido.
          </p>
        </div>
      </div>

      {/* Bottom Loading Spinner */}
      <div className="relative z-10 pb-16 flex justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" strokeWidth={2} />
      </div>
    </div>
  );
}
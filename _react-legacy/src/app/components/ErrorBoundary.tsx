import { useRouteError, useNavigate } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="text-center px-6 max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#7C2D12' }}>
          Algo deu errado
        </h1>
        <p className="text-base mb-6" style={{ color: '#9A3412' }}>
          {error?.message || 'Ocorreu um erro inesperado'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-full font-bold text-white active:scale-95 transition-transform"
          style={{ backgroundColor: '#F97316' }}
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
}

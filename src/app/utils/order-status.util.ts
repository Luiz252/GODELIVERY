import { OrderStatus } from '../services/order.service';

export interface StatusDisplay {
  label: string;
  color: string;
  bgColor: string;
}

const STATUS_MAP: Record<OrderStatus, StatusDisplay> = {
  pending: { label: 'Aguardando cozinha', color: '#D97706', bgColor: '#FEF3C7' },
  preparing: { label: 'Em preparo', color: 'var(--gd-accent)', bgColor: 'var(--gd-border)' },
  ready: { label: 'Pronto para entrega', color: '#2563EB', bgColor: '#DBEAFE' },
  on_the_way: { label: 'A caminho', color: '#16A34A', bgColor: '#DCFCE7' },
  delivered: { label: 'Entregue', color: '#16A34A', bgColor: '#DCFCE7' },
  cancelled: { label: 'Cancelado', color: '#DC2626', bgColor: '#FEE2E2' },
};

export function getOrderStatusDisplay(status: OrderStatus): StatusDisplay {
  return STATUS_MAP[status];
}

export function getRouteForRole(role: string): string {
  switch (role) {
    case 'kitchen':
      return '/cozinha';
    case 'delivery':
      return '/motoboy';
    case 'owner':
      return '/dono';
    default:
      return '/home';
  }
}
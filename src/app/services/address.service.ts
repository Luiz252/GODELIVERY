import { Injectable, computed, signal } from '@angular/core';

export type AddressIcon = 'home' | 'work' | 'other';

export interface SavedAddress {
  id: string;
  label: string;
  icon: AddressIcon;
  street: string;
  complement: string;
  zipAndDistrict: string;
}

const STORAGE_KEY = 'godelivery_addresses';
const SELECTED_KEY = 'godelivery_selected_address';

const DEFAULT_ADDRESSES: SavedAddress[] = [
  {
    id: '1',
    label: 'Casa',
    icon: 'home',
    street: 'Rua das Flores, 123',
    complement: 'Apto 45, Bloco B',
    zipAndDistrict: '01234-567 • Jardim Primavera',
  },
  {
    id: '2',
    label: 'Trabalho',
    icon: 'work',
    street: 'Av. Paulista, 1000',
    complement: 'Sala 1501, 15º andar',
    zipAndDistrict: '01310-100 • Bela Vista',
  },
];

@Injectable({ providedIn: 'root' })
export class AddressService {
  addresses = signal<SavedAddress[]>(this.loadAddresses());
  selectedAddressId = signal<string>(this.loadSelectedId());

  selectedAddress = computed(() => {
    const id = this.selectedAddressId();
    return this.addresses().find((a) => a.id === id) ?? this.addresses()[0] ?? null;
  });

  shortLabel = computed(() => {
    const address = this.selectedAddress();
    if (!address) return 'Nenhum endereço selecionado';
    return `${address.street}${address.complement ? ` - ${address.complement}` : ''}`;
  });

  detailLabel = computed(() => {
    const address = this.selectedAddress();
    if (!address) return '';
    const district = address.zipAndDistrict.split('•').pop()?.trim() ?? '';
    return `${address.complement}${district ? ` • ${district}` : ''}`;
  });

  selectAddress(id: string): void {
    this.selectedAddressId.set(id);
    localStorage.setItem(SELECTED_KEY, id);
  }

  addAddress(input: {
    label: string;
    icon: AddressIcon;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
  }): SavedAddress {
    const streetLine = input.number ? `${input.street}, ${input.number}` : input.street;
    const zipAndDistrict = [input.cep, input.neighborhood, input.city && input.state ? `${input.city} - ${input.state}` : '']
      .filter(Boolean)
      .join(' • ');

    const address: SavedAddress = {
      id: `addr-${Date.now()}`,
      label: input.label,
      icon: input.icon,
      street: streetLine,
      complement: input.complement,
      zipAndDistrict,
    };

    const next = [...this.addresses(), address];
    this.addresses.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    this.selectAddress(address.id);
    return address;
  }

  private loadAddresses(): SavedAddress[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedAddress[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    return [...DEFAULT_ADDRESSES];
  }

  private loadSelectedId(): string {
    const stored = localStorage.getItem(SELECTED_KEY);
    const addresses = this.loadAddresses();
    if (stored && addresses.some((a) => a.id === stored)) {
      return stored;
    }
    return addresses[0]?.id ?? '1';
  }
}
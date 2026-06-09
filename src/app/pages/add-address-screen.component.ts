import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressIcon, AddressService } from '../services/address.service';
import {
  ReturnRoute,
  navigateWithReturn,
  parseReturnRoute,
} from '../utils/navigation.util';
import {
  LucideArrowLeft,
  LucideBriefcase,
  LucideHome,
  LucideMapPin,
  LucideSearch,
} from '@lucide/angular';

type AddressType = 'home' | 'work' | 'other';

interface FormData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  reference: string;
}

@Component({
  selector: 'app-add-address-screen',
  standalone: true,
  imports: [
    FormsModule,
    LucideArrowLeft,
    LucideHome,
    LucideBriefcase,
    LucideMapPin,
    LucideSearch,
  ],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="flex items-center gap-4 px-6 pt-12 pb-4">
          <button
            type="button"
            class="p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
            (click)="goBack()"
          >
            <svg lucideArrowLeft class="w-6 h-6" style="color: var(--gd-text)"></svg>
          </button>
          <h1 class="text-xl font-bold" style="color: var(--gd-text)">Novo endereço</h1>
        </div>
        <div
          class="flex-1 px-6 mt-4 pb-32 overflow-y-auto"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div>
            <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">
              Tipo de endereço
            </label>
            <div class="flex gap-2">
              <button
                type="button"
                class="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all active:scale-95"
                [style.backgroundColor]="addressType === 'home' ? 'var(--gd-accent)' : 'var(--gd-surface)'"
                [style.color]="addressType === 'home' ? 'var(--gd-on-accent)' : 'var(--gd-text)'"
                [style.border]="addressType === 'home' ? 'none' : '2px solid var(--gd-border)'"
                (click)="addressType = 'home'"
              >
                <svg lucideHome class="w-4 h-4"></svg>
                <span>Casa</span>
              </button>
              <button
                type="button"
                class="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all active:scale-95"
                [style.backgroundColor]="addressType === 'work' ? 'var(--gd-accent)' : 'var(--gd-surface)'"
                [style.color]="addressType === 'work' ? 'var(--gd-on-accent)' : 'var(--gd-text)'"
                [style.border]="addressType === 'work' ? 'none' : '2px solid var(--gd-border)'"
                (click)="addressType = 'work'"
              >
                <svg lucideBriefcase class="w-4 h-4"></svg>
                <span>Trabalho</span>
              </button>
              <button
                type="button"
                class="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all active:scale-95"
                [style.backgroundColor]="addressType === 'other' ? 'var(--gd-accent)' : 'var(--gd-surface)'"
                [style.color]="addressType === 'other' ? 'var(--gd-on-accent)' : 'var(--gd-text)'"
                [style.border]="addressType === 'other' ? 'none' : '2px solid var(--gd-border)'"
                (click)="addressType = 'other'"
              >
                <svg lucideMapPin class="w-4 h-4"></svg>
                <span>Outro</span>
              </button>
            </div>
          </div>
          <div class="mt-6">
            <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">CEP</label>
            <div class="relative">
              <input
                type="text"
                [(ngModel)]="formData.cep"
                (ngModelChange)="onCepChange($event)"
                placeholder="00000-000"
                maxlength="9"
                class="w-full h-14 rounded-xl px-4 pr-12 bg-gd-surface"
                style="border: 2px solid var(--gd-border); color: var(--gd-text)"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-1 active:scale-90 transition-transform"
                aria-label="Buscar CEP"
                (click)="searchCep()"
              >
                <svg lucideSearch class="w-5 h-5" style="color: var(--gd-accent)"></svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">Rua</label>
            <input
              type="text"
              [(ngModel)]="formData.street"
              placeholder="Nome da rua"
              class="w-full h-14 rounded-xl px-4 bg-gd-surface"
              style="border: 2px solid var(--gd-border); color: var(--gd-text)"
            />
          </div>
          <div class="flex gap-4 mt-4">
            <div class="flex-1">
              <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">Número</label>
              <input
                type="text"
                [(ngModel)]="formData.number"
                placeholder="123"
                class="w-full h-14 rounded-xl px-4 bg-gd-surface"
                style="border: 2px solid var(--gd-border); color: var(--gd-text)"
              />
            </div>
            <div class="flex-[2]">
              <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)"
                >Complemento</label
              >
              <input
                type="text"
                [(ngModel)]="formData.complement"
                placeholder="Apto, bloco..."
                class="w-full h-14 rounded-xl px-4 bg-gd-surface"
                style="border: 2px solid var(--gd-border); color: var(--gd-text)"
              />
            </div>
          </div>
          <div class="mt-4">
            <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">Bairro</label>
            <input
              type="text"
              [(ngModel)]="formData.neighborhood"
              placeholder="Nome do bairro"
              class="w-full h-14 rounded-xl px-4 bg-gd-surface"
              style="border: 2px solid var(--gd-border); color: var(--gd-text)"
            />
          </div>
          <div class="flex gap-4 mt-4">
            <div class="flex-[2]">
              <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">Cidade</label>
              <input
                type="text"
                [(ngModel)]="formData.city"
                placeholder="São Paulo"
                class="w-full h-14 rounded-xl px-4 bg-gd-surface"
                style="border: 2px solid var(--gd-border); color: var(--gd-text)"
              />
            </div>
            <div class="flex-1">
              <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">UF</label>
              <input
                type="text"
                [(ngModel)]="formData.state"
                (ngModelChange)="onStateChange($event)"
                placeholder="SP"
                maxlength="2"
                class="w-full h-14 rounded-xl px-4 bg-gd-surface"
                style="border: 2px solid var(--gd-border); color: var(--gd-text)"
              />
            </div>
          </div>
          <div class="mt-4">
            <label class="text-sm font-medium mb-2 block" style="color: var(--gd-text)">
              Ponto de referência (opcional)
            </label>
            <input
              type="text"
              [(ngModel)]="formData.reference"
              placeholder="Próximo ao mercado..."
              class="w-full h-14 rounded-xl px-4 bg-gd-surface"
              style="border: 2px solid var(--gd-border); color: var(--gd-text)"
            />
          </div>
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 bg-gd-surface p-6"
          style="border-top: 1px solid var(--gd-border); max-width: 448px; margin: 0 auto"
        >
          <button
            type="button"
            class="w-full h-14 rounded-2xl font-bold text-lg text-white active:scale-[0.98] transition-transform"
            style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            (click)="save()"
          >
            Salvar endereço
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AddAddressScreenComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private addressService = inject(AddressService);

  returnTo: ReturnRoute = 'cart';
  addressType: AddressType = 'home';
  formData: FormData = {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    reference: '',
  };

  ngOnInit(): void {
    this.returnTo = parseReturnRoute(this.route, 'cart');
  }

  goBack(): void {
    navigateWithReturn(this.router, '/address-select', this.returnTo);
  }

  onCepChange(value: string): void {
    const numbers = value.replace(/\D/g, '');
    const masked = numbers.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    this.formData = { ...this.formData, cep: masked };
  }

  onStateChange(value: string): void {
    this.formData = { ...this.formData, state: value.toUpperCase() };
  }

  searchCep(): void {
    if (this.formData.cep.length === 9) {
      this.formData = {
        ...this.formData,
        street: 'Rua das Flores',
        neighborhood: 'Jardim Primavera',
        city: 'São Paulo',
        state: 'SP',
      };
    }
  }

  save(): void {
    const label =
      this.addressType === 'home' ? 'Casa' : this.addressType === 'work' ? 'Trabalho' : 'Outro';

    this.addressService.addAddress({
      label,
      icon: this.addressType as AddressIcon,
      street: this.formData.street,
      number: this.formData.number,
      complement: this.formData.complement,
      neighborhood: this.formData.neighborhood,
      cep: this.formData.cep,
      city: this.formData.city,
      state: this.formData.state,
    });

    navigateWithReturn(this.router, '/address-select', this.returnTo);
  }
}
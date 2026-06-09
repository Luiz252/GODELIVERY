import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideArrowLeft, LucideBriefcase, LucideHome, LucidePlus } from '@lucide/angular';
import { AddressService } from '../services/address.service';
import {
  ReturnRoute,
  getReturnPath,
  navigateWithReturn,
  parseReturnRoute,
} from '../utils/navigation.util';

@Component({
  selector: 'app-address-select-screen',
  standalone: true,
  imports: [LucideArrowLeft, LucideHome, LucideBriefcase, LucidePlus],
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
          <h1 class="text-xl font-bold" style="color: var(--gd-text)">{{ pageTitle }}</h1>
        </div>
        <div
          class="flex-1 px-6 mt-4 overflow-y-auto"
          [class.pb-32]="showConfirmButton"
          [class.pb-8]="!showConfirmButton"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          @for (address of addressService.addresses(); track address.id) {
            <button
              type="button"
              class="w-full bg-gd-surface rounded-xl p-4 mb-3 flex items-start gap-4 transition-all active:scale-[0.98]"
              [style.border]="
                selectedAddressId === address.id ? '2px solid var(--gd-accent)' : '2px solid transparent'
              "
              [style.backgroundColor]="selectedAddressId === address.id ? 'var(--gd-bg)' : 'var(--gd-surface)'"
              style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06)"
              (click)="selectAddress(address.id)"
            >
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style="background-color: var(--gd-bg)"
              >
                @if (address.icon === 'home') {
                  <svg lucideHome class="w-6 h-6" style="color: var(--gd-accent)"></svg>
                } @else if (address.icon === 'work') {
                  <svg lucideBriefcase class="w-6 h-6" style="color: var(--gd-accent)"></svg>
                } @else {
                  <svg lucideHome class="w-6 h-6" style="color: var(--gd-accent)"></svg>
                }
              </div>
              <div class="flex-1 text-left">
                <h3 class="text-base font-bold" style="color: var(--gd-text)">{{ address.label }}</h3>
                <p class="text-sm mt-1" style="color: var(--gd-text-secondary)">{{ address.street }}</p>
                <p class="text-sm" style="color: var(--gd-text-secondary)">{{ address.complement }}</p>
                <p class="text-xs mt-1" style="color: var(--gd-text-secondary)">{{ address.zipAndDistrict }}</p>
              </div>
              <div class="flex items-center justify-center w-6 h-6 flex-shrink-0 mt-1">
                @if (selectedAddressId === address.id) {
                  <div
                    class="w-6 h-6 rounded-full flex items-center justify-center"
                    style="background-color: var(--gd-accent)"
                  >
                    <div class="w-2 h-2 rounded-full bg-gd-surface"></div>
                  </div>
                } @else {
                  <div class="w-6 h-6 rounded-full" style="border: 2px solid var(--gd-border)"></div>
                }
              </div>
            </button>
          }
          <button
            type="button"
            class="w-full h-14 rounded-xl flex items-center justify-center gap-2 mt-4 active:scale-[0.98] transition-transform"
            style="border: 2px dashed var(--gd-accent)"
            (click)="goToAddAddress()"
          >
            <svg lucidePlus class="w-5 h-5" style="color: var(--gd-accent)"></svg>
            <span class="font-medium" style="color: var(--gd-accent)">Adicionar novo endereço</span>
          </button>
        </div>
        @if (showConfirmButton) {
          <div
            class="fixed bottom-0 left-0 right-0 bg-gd-surface p-6"
            style="border-top: 1px solid var(--gd-border); max-width: 448px; margin: 0 auto"
          >
            <button
              type="button"
              class="w-full h-14 rounded-2xl font-bold text-lg text-white active:scale-[0.98] transition-transform"
              style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
              (click)="confirmSelection()"
            >
              {{ confirmButtonLabel }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class AddressSelectScreenComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  addressService = inject(AddressService);

  returnTo: ReturnRoute = 'cart';
  selectedAddressId = '';

  get isProfileMode(): boolean {
    return this.returnTo === 'profile';
  }

  get pageTitle(): string {
    return this.isProfileMode ? 'Endereços salvos' : 'Endereço de entrega';
  }

  get showConfirmButton(): boolean {
    return !this.isProfileMode;
  }

  get confirmButtonLabel(): string {
    return this.returnTo === 'checkout' ? 'Usar este endereço' : 'Confirmar endereço';
  }

  ngOnInit(): void {
    this.returnTo = parseReturnRoute(this.route, 'cart');
    this.selectedAddressId = this.addressService.selectedAddressId();
  }

  selectAddress(id: string): void {
    this.selectedAddressId = id;
    this.addressService.selectAddress(id);
  }

  goBack(): void {
    this.router.navigateByUrl(getReturnPath(this.returnTo));
  }

  goToAddAddress(): void {
    navigateWithReturn(this.router, '/add-address', this.returnTo);
  }

  confirmSelection(): void {
    this.addressService.selectAddress(this.selectedAddressId);
    this.router.navigateByUrl('/checkout');
  }
}
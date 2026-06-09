import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowLeft, LucideChevronDown, LucideMail, LucideMessageCircle, LucidePhone } from '@lucide/angular';

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-help-screen',
  standalone: true,
  imports: [LucideArrowLeft, LucideMessageCircle, LucideMail, LucidePhone, LucideChevronDown],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen pb-8">
        <div class="px-6 pt-12 pb-4">
          <div class="flex items-center gap-4">
            <button
              type="button"
              (click)="router.navigateByUrl('/profile')"
              class="w-10 h-10 rounded-full bg-gd-surface flex items-center justify-center active:scale-90 transition-transform"
              style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
            >
              <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
            </button>
            <h1 class="text-2xl font-bold" style="color: var(--gd-text)">Ajuda e suporte</h1>
          </div>
        </div>

        <div class="px-6 space-y-4">
          <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)">
            <p class="font-bold mb-3" style="color: var(--gd-text)">Fale conosco</p>
            <div class="space-y-3">
              <a [href]="'mailto:' + supportEmail" class="flex items-center gap-3">
                <svg lucideMail class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                <span class="text-sm" style="color: var(--gd-text)">{{ supportEmail }}</span>
              </a>
              <div class="flex items-center gap-3">
                <svg lucidePhone class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                <span class="text-sm" style="color: var(--gd-text)">0800 123 4567</span>
              </div>
              <div class="flex items-center gap-3">
                <svg lucideMessageCircle class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                <span class="text-sm" style="color: var(--gd-text)">Chat: Seg–Sex, 8h às 20h</span>
              </div>
            </div>
          </div>

          <p class="font-bold text-lg" style="color: var(--gd-text)">Perguntas frequentes</p>

          @for (item of faqs; track item.question) {
            <button
              type="button"
              (click)="toggle(item)"
              class="w-full bg-gd-surface rounded-2xl p-4 text-left active:scale-[0.99] transition-transform"
              style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="font-medium" style="color: var(--gd-text)">{{ item.question }}</span>
                <svg
                  lucideChevronDown
                  class="w-5 h-5 shrink-0 transition-transform"
                  [class.rotate-180]="item.open"
                  style="color: var(--gd-text-secondary)"
                ></svg>
              </div>
              @if (item.open) {
                <p class="text-sm mt-3 leading-relaxed" style="color: var(--gd-text-secondary)">{{ item.answer }}</p>
              }
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class HelpScreenComponent {
  router = inject(Router);
  supportEmail = 'suporte@godelivery.com';

  faqs: FaqItem[] = [
    {
      question: 'Como acompanho meu pedido?',
      answer: 'Acesse Meus Pedidos na barra inferior e toque no pedido para ver o status em tempo real.',
      open: false,
    },
    {
      question: 'Posso cancelar um pedido?',
      answer: 'Pedidos podem ser cancelados enquanto estiverem com status "Aguardando confirmação".',
      open: false,
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Cartão de crédito, débito, PIX e dinheiro na entrega.',
      open: false,
    },
    {
      question: 'Como altero meu endereço de entrega?',
      answer: 'No checkout ou em Perfil > Endereços salvos você pode adicionar ou selecionar um endereço.',
      open: false,
    },
  ];

  toggle(item: FaqItem): void {
    item.open = !item.open;
  }
}
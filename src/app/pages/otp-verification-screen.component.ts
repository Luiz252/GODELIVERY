import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';
import { GoLogoComponent } from '../shared/go-logo.component';

@Component({
  selector: 'app-otp-verification-screen',
  standalone: true,
  imports: [LucideArrowLeft, GoLogoComponent],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="relative flex items-center justify-center px-6 pt-12 pb-6">
          <button
            type="button"
            (click)="router.navigateByUrl('/forgot-password')"
            class="absolute left-6 top-12 p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
          >
            <svg lucideArrowLeft class="w-6 h-6" [style.color]="'var(--gd-text)'"></svg>
          </button>

          <div class="flex flex-col items-center">
            <app-go-logo [size]="48" className="mb-2" />
            <h1 class="text-2xl font-bold tracking-tight" style="color: var(--gd-accent)">GoDelivery</h1>
          </div>
        </div>

        <div class="flex-1 flex flex-col px-6 pt-8 pb-8">
          <div class="mb-12 text-center">
            <h2 class="text-2xl font-bold mb-3" style="color: var(--gd-text)">Verificação de código</h2>
            <p class="text-sm leading-relaxed" style="color: var(--gd-text-secondary)">
              Digite o código de 4 dígitos enviado para seu e-mail.
            </p>
          </div>

          <form (submit)="handleSubmit($event)" class="flex flex-col items-center">
            <div class="flex gap-3 mb-8">
              @for (digit of otp; track $index) {
                <input
                  #otpInput
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  [value]="digit"
                  (input)="handleChange($index, $event)"
                  (keydown)="handleKeyDown($index, $event)"
                  (paste)="$index === 0 ? handlePaste($event) : null"
                  class="w-14 h-14 text-center text-2xl font-bold bg-gd-surface rounded-xl border-2 transition-all outline-none"
                  [style.border-color]="digit ? 'var(--gd-accent)' : 'var(--gd-border)'"
                  style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                  [attr.aria-label]="'Dígito ' + ($index + 1)"
                />
              }
            </div>

            <div class="flex flex-col items-center gap-2 mb-8">
              <div class="text-sm" style="color: var(--gd-text)">
                Não recebeu o código?
                <button
                  type="button"
                  (click)="handleResend()"
                  [disabled]="!canResend"
                  class="font-bold transition-opacity"
                  [style.color]="'var(--gd-accent-dark)'"
                  [style.opacity]="canResend ? 1 : 0.5"
                  [style.cursor]="canResend ? 'pointer' : 'not-allowed'"
                >
                  Reenviar código
                </button>
              </div>

              @if (!canResend) {
                <span class="text-xs" style="color: var(--gd-text-secondary)"> Reenviar em {{ formatTime(timer) }} </span>
              }
            </div>

            <div class="w-full mt-auto pt-8">
              <button
                type="submit"
                class="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
                style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
              >
                Confirmar código
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class OtpVerificationScreenComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  router = inject(Router);

  otp: string[] = ['', '', '', ''];
  timer = 30;
  canResend = false;
  private timerInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  handleChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...this.otp];
    newOtp[index] = value.slice(-1);
    this.otp = newOtp;
    (event.target as HTMLInputElement).value = newOtp[index];

    if (value && index < 3) {
      this.focusInput(index + 1);
    }
  }

  handleKeyDown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.focusInput(index - 1);
    }
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text').slice(0, 4) ?? '';
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...this.otp];
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    this.otp = newOtp;

    const nextIndex = Math.min(pastedData.length, 3);
    this.focusInput(nextIndex);
  }

  handleResend(): void {
    if (!this.canResend) return;

    console.log('Resend OTP');
    this.timer = 30;
    this.canResend = false;
    this.otp = ['', '', '', ''];
    this.startTimer();
    setTimeout(() => this.focusInput(0));
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    const code = this.otp.join('');

    if (code.length !== 4) {
      alert('Por favor, digite o código completo');
      return;
    }

    console.log('Verify OTP:', code);
    this.router.navigateByUrl('/reset-password');
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  private startTimer(): void {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.canResend = true;
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  private focusInput(index: number): void {
    const inputs = this.otpInputs?.toArray();
    inputs?.[index]?.nativeElement?.focus();
  }
}
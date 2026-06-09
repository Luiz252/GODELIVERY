import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideArrowLeft, LucideMail, LucidePhone, LucideUser } from '@lucide/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-edit-profile-screen',
  standalone: true,
  imports: [FormsModule, LucideArrowLeft, LucideUser, LucideMail, LucidePhone],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
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
            <h1 class="text-2xl font-bold" style="color: var(--gd-text)">Editar perfil</h1>
          </div>
        </div>

        <form (submit)="save($event)" class="flex-1 px-6 pb-8 flex flex-col gap-4">
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg lucideUser class="w-5 h-5" style="color: var(--gd-accent)"></svg>
            </div>
            <input
              type="text"
              [(ngModel)]="name"
              name="name"
              placeholder="Nome completo"
              class="w-full h-14 pl-12 pr-4 bg-gd-surface rounded-xl border-2 outline-none"
              style="border-color: var(--gd-border)"
              required
            />
          </div>

          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg lucideMail class="w-5 h-5" style="color: var(--gd-accent)"></svg>
            </div>
            <input
              type="email"
              [ngModel]="email"
              name="email"
              disabled
              class="w-full h-14 pl-12 pr-4 bg-gray-50 rounded-xl border-2 outline-none opacity-70"
              style="border-color: var(--gd-border)"
            />
          </div>

          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg lucidePhone class="w-5 h-5" style="color: var(--gd-accent)"></svg>
            </div>
            <input
              type="tel"
              [(ngModel)]="phone"
              name="phone"
              placeholder="(00) 00000-0000"
              class="w-full h-14 pl-12 pr-4 bg-gd-surface rounded-xl border-2 outline-none"
              style="border-color: var(--gd-border)"
            />
          </div>

          @if (error) {
            <p class="text-sm text-center" style="color: #EF4444">{{ error }}</p>
          }

          <button
            type="submit"
            [disabled]="saving"
            class="w-full h-14 rounded-2xl font-bold text-white mt-4 active:scale-95 transition-transform disabled:opacity-60"
            style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
          >
            {{ saving ? 'Salvando...' : 'Salvar alterações' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class EditProfileScreenComponent implements OnInit {
  router = inject(Router);
  private firebase = inject(FirebaseService);

  name = '';
  email = '';
  phone = '';
  saving = false;
  error = '';

  ngOnInit(): void {
    const user = this.firebase.currentUser();
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone || '';
  }

  async save(event: Event): Promise<void> {
    event.preventDefault();
    this.error = '';
    this.saving = true;
    try {
      await this.firebase.updateUserProfile({ name: this.name.trim(), phone: this.phone.trim() });
      this.router.navigateByUrl('/profile');
    } catch {
      this.error = 'Não foi possível salvar. Tente novamente.';
    } finally {
      this.saving = false;
    }
  }
}
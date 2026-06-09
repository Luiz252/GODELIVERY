import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideLoader2 } from '@lucide/angular';
import { GoLogoComponent } from '../shared/go-logo.component';
import { FirebaseService } from '../services/firebase.service';
import { getRouteForRole } from '../utils/order-status.util';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [LucideLoader2, GoLogoComponent],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col items-center justify-between relative">
      <div
        class="absolute inset-0 z-0"
        style="background: linear-gradient(180deg, var(--gd-accent-dark) 0%, var(--gd-accent) 100%)"
      ></div>
      <div class="relative z-10 flex flex-col items-center justify-center flex-1 px-6 w-full max-w-md mx-auto">
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-col items-center gap-4">
            <app-go-logo [size]="64" color="white" variant="splash" className="mb-2" />
            <h1 class="text-5xl text-white font-bold tracking-tight">GoDelivery</h1>
          </div>
          <p class="text-white text-base font-normal" style="opacity: 0.8">Seu sabor, entregue rápido.</p>
        </div>
      </div>
      <div class="relative z-10 pb-16 flex justify-center">
        <svg lucideLoader2 class="w-8 h-8 text-white animate-spin" [strokeWidth]="2"></svg>
      </div>
    </div>
  `,
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private firebase = inject(FirebaseService);
  private timer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      const logged = !!this.firebase.currentUser();

      if (logged) {
        const user = this.firebase.currentUser();
        this.router.navigateByUrl(getRouteForRole(user?.role ?? 'customer'));
      } else if (hasSeenOnboarding) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/onboarding-1');
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
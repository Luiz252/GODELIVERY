import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-logo',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [class]="className"
    >
      <path
        d="M8 20C8 20 12 12 32 12C52 12 56 20 56 20C56 20 56 24 56 26C56 28 54 28 54 28H10C10 28 8 28 8 26C8 24 8 20 8 20Z"
        [attr.fill]="color"
        [attr.opacity]="variant === 'splash' ? '0.95' : '1'"
      />
      <path
        d="M10 28H54C54 28 54 30 52 32C50 34 48 34 48 34H16C16 34 14 34 12 32C10 30 10 28 10 28Z"
        [attr.fill]="color"
        [attr.opacity]="variant === 'splash' ? '0.85' : '0.8'"
      />
      <rect x="12" y="34" width="40" height="8" rx="2" [attr.fill]="color" [attr.opacity]="variant === 'splash' ? '0.95' : '1'" />
      <path
        d="M10 42H54C54 42 56 42 56 44C56 46 54 52 32 52C10 52 8 46 8 44C8 42 10 42 10 42Z"
        [attr.fill]="color"
        [attr.opacity]="variant === 'splash' ? '0.95' : '1'"
      />
    </svg>
  `,
})
export class GoLogoComponent {
  @Input() size = 48;
  @Input() color = 'var(--gd-accent)';
  @Input() variant: 'default' | 'splash' = 'default';
  @Input() className = '';
}
import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

@Component({
  selector: 'app-image-with-fallback',
  standalone: true,
  template: `
    @if (didError) {
      <div class="inline-block bg-gray-100 text-center align-middle" [class]="className" [ngStyle]="style">
        <div class="flex items-center justify-center w-full h-full">
          <img [src]="errorSrc" alt="Error loading image" [attr.data-original-url]="src" />
        </div>
      </div>
    } @else {
      <img
        [src]="src"
        [alt]="alt"
        [class]="className"
        [ngStyle]="style"
        (error)="onError()"
      />
    }
  `,
  imports: [NgStyle],
})
export class ImageWithFallbackComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() className = '';
  @Input() style: Record<string, string> | null = null;

  didError = false;
  errorSrc = ERROR_IMG_SRC;

  onError(): void {
    this.didError = true;
  }
}
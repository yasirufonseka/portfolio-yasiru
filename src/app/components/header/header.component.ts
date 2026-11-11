import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
  readonly links = NAV_LINKS;
  readonly profile = PROFILE;
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  constructor() {
    effect(() => {
      document.body.classList.toggle('menu-open', this.menuOpen());
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900 && this.menuOpen()) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

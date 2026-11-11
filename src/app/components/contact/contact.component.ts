import { Component, inject, signal } from '@angular/core';
import { PROFILE, SOCIAL_LINKS } from '../../data/portfolio';
import { ClockService } from '../../services/clock.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly socials = SOCIAL_LINKS;
  readonly clock = inject(ClockService);
  readonly copied = signal(false);

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.flagCopied();
    } catch {
      const field = document.createElement('textarea');
      field.value = this.profile.email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand('copy');
        this.flagCopied();
      } finally {
        document.body.removeChild(field);
      }
    }
  }

  private flagCopied(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2200);
  }
}

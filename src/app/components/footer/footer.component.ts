import { Component, inject } from '@angular/core';
import { NAV_LINKS, PROFILE, SOCIAL_LINKS } from '../../data/portfolio';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly links = NAV_LINKS;
  readonly socials = SOCIAL_LINKS;
  readonly clock = inject(ClockService);
  readonly year = new Date().getFullYear();
}

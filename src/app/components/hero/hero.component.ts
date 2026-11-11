import { Component } from '@angular/core';
import { HERO_STATS, PROFILE } from '../../data/portfolio';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly stats = HERO_STATS;
}

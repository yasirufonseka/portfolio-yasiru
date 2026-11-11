import { Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/portfolio';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly groups = SKILL_GROUPS;
}

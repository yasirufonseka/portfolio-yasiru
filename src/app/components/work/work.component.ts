import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  readonly projects = PROJECTS;
}

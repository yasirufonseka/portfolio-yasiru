import { Component } from '@angular/core';
import { PROCESS } from '../../data/portfolio';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent {
  readonly steps = PROCESS;
}

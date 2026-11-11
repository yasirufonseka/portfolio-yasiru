import { Component } from '@angular/core';
import { CERTIFICATIONS, EDUCATION } from '../../data/portfolio';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  readonly education = EDUCATION;
  readonly certifications = CERTIFICATIONS;
}

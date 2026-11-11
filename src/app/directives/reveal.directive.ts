import { Directive, ElementRef, OnDestroy, OnInit, inject, Input } from '@angular/core';

/**
 * Adds the `reveal` class and flips `is-visible` when the element enters the
 * viewport. Falls back to visible when IntersectionObserver is unavailable or
 * the visitor prefers reduced motion.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      node.classList.add('reveal', 'is-visible');
      return;
    }

    node.classList.add('reveal');
    if (this.revealDelay) {
      node.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

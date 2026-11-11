import { Injectable, signal } from '@angular/core';
import { PROFILE } from '../data/portfolio';

/** Live clock for the owner's timezone, updated twice a minute. */
@Injectable({ providedIn: 'root' })
export class ClockService {
  readonly time = signal(this.read());

  constructor() {
    setInterval(() => this.time.set(this.read()), 30_000);
  }

  private read(): string {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: PROFILE.timezone,
        hour12: false,
      }).format(new Date());
    } catch {
      return '';
    }
  }
}

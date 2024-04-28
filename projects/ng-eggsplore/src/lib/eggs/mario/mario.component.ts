import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { filter, fromEvent, map, merge, scan, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'mario',
  template: `
    @if (renderIt()) {
    <img
      #mario
      src="data:image/gif;base64,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"
    />
    }
  `,
  styles: `
      img {
          position: absolute;
          bottom: 0;
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarioComponent {
  renderIt = signal(false);

  mario = viewChild.required<ElementRef>('mario');

  reset$ = new Subject<void>();
  trigger$ = merge(
    fromEvent(window, 'keydown', (event: KeyboardEvent) => event.key),
    this.reset$.pipe(map(() => 'reset'))
  ).pipe(
    scan((acc, current) => {
      if (current === 'reset') {
        return '';
      }
      return `${acc}${current}`;
    }, ''),
    tap((value) => {
      if (value.length <= 5 && value !== 'mario'.substring(0, value.length)) {
        this.reset$.next();
      } else if (value.length > 5) {
        this.reset$.next();
      }
    }),
    filter((e) => e === 'mario')
  );

  constructor() {
    this.trigger$
      .pipe(takeUntilDestroyed())
      .subscribe((_) => this.#runMarioRun());
  }

  #runMarioRun(): void {
    this.renderIt.set(true);
    console.log('Here I am');
    const intervalId = setInterval(() => {
      const marioElement = this.mario().nativeElement;

      if (marioElement.getBoundingClientRect().left > window.innerWidth) {
        this.renderIt.set(false);
        clearInterval(intervalId);
      }

      marioElement.style.left =
        marioElement.getBoundingClientRect().left + 20 + 'px';
    }, 100);
  }
}

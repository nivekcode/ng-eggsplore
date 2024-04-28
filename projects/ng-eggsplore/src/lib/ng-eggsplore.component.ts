import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarioComponent } from './eggs/mario/mario.component';

@Component({
  standalone: true,
  selector: 'ng-eggsplore',
  template: `<mario />`,
  imports: [MarioComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgEggsploreComponent {}

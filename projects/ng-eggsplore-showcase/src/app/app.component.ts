import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgEggsploreComponent } from '../../../ng-eggsplore/src/lib/ng-eggsplore.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <h1>Type Mario and see what happens</h1>
    <ng-eggsplore />
  `,
  imports: [NgEggsploreComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

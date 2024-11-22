import { Routes } from '@angular/router';
import {StatisticsComponent} from './statistics/statistics.component';
import {LandingComponent} from './landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  }
];

import { Component } from '@angular/core';
import {RankingChartComponent} from '../ranking-chart/ranking-chart.component';
import {JoinChallengeComponent} from '../join-challenge/join-challenge.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RankingChartComponent,
    JoinChallengeComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}

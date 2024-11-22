import { Component } from '@angular/core';
import {RankingChartComponent} from '../ranking-chart/ranking-chart.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RankingChartComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

}

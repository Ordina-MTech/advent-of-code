import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RankingChartComponent} from './ranking-chart/ranking-chart.component';
import {JoinChallengeComponent} from './join-challenge/join-challenge.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RankingChartComponent, JoinChallengeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aoc-challenge';
}

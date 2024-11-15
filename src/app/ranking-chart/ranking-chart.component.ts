import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-ranking-chart',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './ranking-chart.component.html',
  styleUrl: './ranking-chart.component.scss'
})
export class RankingChartComponent {
  rankedUsers = [
    {progress: 70, points: 70, name: 'Maarten'},
    {progress: 65, points: 65, name: 'Jan'},
    {progress: 50, points: 50, name: 'Tom'},
    {progress: 45, points: 45, name: 'Gerbert'},
    {progress: 43, points: 43, name: 'Johan'},
  ];
}

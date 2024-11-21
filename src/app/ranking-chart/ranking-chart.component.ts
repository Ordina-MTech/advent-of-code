import {Component, OnDestroy} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-ranking-chart',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './ranking-chart.component.html',
  styleUrl: './ranking-chart.component.scss'
})
export class RankingChartComponent implements OnDestroy {
  rankedUsers = [
    {progress: 70, points: 70, name: 'Maarten'},
    {progress: 65, points: 65, name: 'Jan'},
    {progress: 50, points: 50, name: 'Tom'},
    {progress: 45, points: 45, name: 'Gerbert'},
    {progress: 43, points: 43, name: 'Johan'},
  ];

  public hasStarted = false;
  public intervalRef: any = null;

  public formattedCountdown = '';

  constructor() {
    this.formattedCountdown = this.getFormattedTimeLeftTillStart();
    this.setupCountdown();
  }


  setupCountdown(){
    this.intervalRef = setInterval(() => {
      this.formattedCountdown = this.getFormattedTimeLeftTillStart();
    }, 1000);
  }

  getFormattedTimeLeftTillStart(){
    const startDate = new Date(2024, 11, 1, 6, 0, 0);
    const total = startDate.getTime() - new Date().getTime();
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    let formattedCountdown = '';

    if(days > 0){
      formattedCountdown += days + " days, ";
    }

    if(hours > 0){
      formattedCountdown += hours + " hours, and ";
    }

    if(minutes > 0){
      formattedCountdown += minutes + " minutes";
    }

    return formattedCountdown
  }

  ngOnDestroy(){
    clearTimeout(this.intervalRef);
  }

}

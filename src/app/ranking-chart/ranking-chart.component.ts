import {Component, Input, OnDestroy} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {StatisticsService} from '../services/statistics-service';
import {RankedUser} from '../services/models/statistics';

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
  rankedUsers: RankedUser[] = [];

  private _showOnlySummary = true;

  @Input()
  public set showOnlySummary(showOnlySummary: boolean) {
    this._showOnlySummary = showOnlySummary;
    this.loadRankedUsers();
  };

  public get showOnlySummary(): boolean {
    return this._showOnlySummary;
  }

  public hasStarted = true;
  public intervalRef: any = null;

  public formattedCountdown = '';

  constructor(private statisticsService: StatisticsService) {
    this.formattedCountdown = this.getFormattedTimeLeftTillStart();

    this.setupCountdown();
    this.loadRankedUsers();
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

  private loadRankedUsers() {
    if(!this.hasStarted){
      this.rankedUsers = [
        {progress: 70, points: 70, name: 'Maarten', stars: 0, localScore: 0},
        {progress: 65, points: 65, name: 'Jan', stars: 0, localScore: 0},
        {progress: 50, points: 50, name: 'Tom', stars: 0, localScore: 0},
        {progress: 45, points: 45, name: 'Gerbert', stars: 0, localScore: 0},
        {progress: 43, points: 43, name: 'Johan', stars: 0,localScore: 0},
      ];

      return;
    }

    if(localStorage.getItem('stats_cache')){
      const statistics = JSON.parse(localStorage.getItem('stats_cache')!);

      this.rankedUsers = this.showOnlySummary ? statistics.rankedUsers.slice(0, 5) : statistics.rankedUsers;
    }

    this.statisticsService.getStatistics().subscribe((statistics) => {
      this.rankedUsers = this.showOnlySummary ? statistics.rankedUsers.slice(0, 5) : statistics.rankedUsers;
      localStorage.setItem('stats_cache', JSON.stringify(statistics));
    })
  }
}

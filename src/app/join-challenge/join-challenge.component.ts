import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-join-challenge',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './join-challenge.component.html',
  styleUrl: './join-challenge.component.scss'
})
export class JoinChallengeComponent {
  public showModal = false;
  public joinFlowStep = JoinFlowStep.ParticipateForPricesQuestion;
  public JoinFlowSteps = JoinFlowStep;

  closeModal() {
    this.showModal = false;
    this.joinFlowStep = JoinFlowStep.ParticipateForPricesQuestion;
  }
}

export enum JoinFlowStep {
  ParticipateForPricesQuestion,
  ParticipateEmailQuestion,
  ParticipateJoinCode,
}

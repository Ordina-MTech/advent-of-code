import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {ContestantService} from '../services/contestant-service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-join-challenge',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './join-challenge.component.html',
  styleUrl: './join-challenge.component.scss'
})
export class JoinChallengeComponent {
  public showModal = false;
  public joinFlowStep = JoinFlowStep.Rules;
  public JoinFlowSteps = JoinFlowStep;

  public isLoading = false;
  public errorMessage = '';

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  agreeToRules: boolean = false;

  constructor(private contestantService: ContestantService) {
  }

  registerContestant(){
    this.contestantService.register(this.registerForm.getRawValue())
      .subscribe({
        next: _ => {
          this.isLoading = false;
          this.errorMessage = '';
          this.joinFlowStep = JoinFlowStep.Rules;
        },
        error: _ => {
          this.errorMessage = 'Something went wrong. Please try again later';
          this.isLoading = false
        },
      });

  }

  closeModal() {
    this.showModal = false;
    this.joinFlowStep = JoinFlowStep.Rules;
  }
}

export enum JoinFlowStep {
  Rules,
  ParticipateForPricesQuestion,
  ParticipateEmailQuestion,
  ParticipateJoinCode,
}

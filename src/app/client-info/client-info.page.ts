import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserMock } from '../user-mock';
import { UserMockService } from '../user-mock.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.page.html',
  styleUrls: ['./client-info.page.scss'],
})
export class ClientInfoPage implements OnInit {
  clientId: number;
  selectedUser: UserMock;
  dailyCalories: number;
  takenCalories: number;
  remainingCalories: number;
  stepsGoal: number;
  stepCount: number;
  name: string;
  surname: string;

  constructor(private route: ActivatedRoute,
              private userMockService: UserMockService) { }

  ngOnInit() {
    this.clientId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.selectedUser = this.userMockService.getUser(this.clientId);
    this.dailyCalories = this.selectedUser.dailyCalories;
    this.takenCalories = this.selectedUser.takenCalories;
    this.remainingCalories = this.selectedUser.remainingCalories;
    this.stepsGoal = this.selectedUser.stepsGoal;
    this.stepCount = this.selectedUser.stepCount;
    this.name = this.selectedUser.name;
    this.surname = this.selectedUser.surname;
  }
}

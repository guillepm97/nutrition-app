import { Component } from '@angular/core';

import { UserMock } from '../user-mock'
import { UserMockService } from '../user-mock.service'

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss']
})
export class ClientsPage {
  users: UserMock[];
  acceptedClients: UserMock[];
  pendingClients: UserMock[];

  constructor(private userMockService: UserMockService) { }

  ionViewWillEnter() {
    this.getUsers();
    this.getAcceptedClients();
    this.getPendingClients();
  }

  getUsers(): void {
    this.users = this.userMockService.getUsers();
  }

  getAcceptedClients(): void {
    this.acceptedClients = this.userMockService.getAcceptedClients(this.userMockService.getCurrentUserId());
  }

  getPendingClients(): void {
    this.pendingClients = this.userMockService.getPendingClients(this.userMockService.getCurrentUserId());
  }

  acceptClient(id: number) {
    let listAccepted: Array<number> = this.userMockService.getNutritionistAcceptedList(this.userMockService.getCurrentUserId());
    let listPending: Array<number> = this.userMockService.getNutritionistPendingList(this.userMockService.getCurrentUserId());
    for (let user of this.users) {
      if (user.id == id) {
        listAccepted.push(id);
        this.acceptedClients.push(user);
        listPending.splice(listPending.indexOf(user.id), 1);
        this.pendingClients.splice(this.pendingClients.indexOf(user), 1);
      }
    }
  }
}

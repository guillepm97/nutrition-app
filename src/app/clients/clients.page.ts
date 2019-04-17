import { Component } from '@angular/core';

import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss']
})
export class ClientsPage {
  users: User[];
  acceptedClients: User[];
  pendingClients: User[];

  constructor(private userService: UserService) { }

  ionViewWillEnter() {
    this.getUsers();
    this.getAcceptedClients();
    this.getPendingClients();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  getAcceptedClients(): void {
    this.acceptedClients = this.userService.getAcceptedClients(this.userService.getCurrentUserId());
  }

  getPendingClients(): void {
    this.pendingClients = this.userService.getPendingClients(this.userService.getCurrentUserId());
  }

  acceptClient(id: number) {
    let listAccepted: Array<number> = this.userService.getNutritionistAcceptedList(this.userService.getCurrentUserId());
    let listPending: Array<number> = this.userService.getNutritionistPendingList(this.userService.getCurrentUserId());
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

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user';
import { UserService} from '../user.service';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss']
})
export class ClientsPage {
  user$: Observable<User>;
  acceptedClients: Observable<User>[];
  pendingClients: Observable<User>[];

  constructor(private userService: UserService,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.user$ = this.userService.getCurrentUser();
    this.getAcceptedClients();
    this.getPendingClients();
  }

  getAcceptedClients() {
    this.userService.getCurrentUser().subscribe(currentUser => {
      let array: Observable<User>[] = [];
      for (let accepted of currentUser.listAccepted) {
        array.push(this.userService.getUserById(accepted));
      }

      this.acceptedClients = array;
    });
  }

  getPendingClients() {
    this.userService.getCurrentUser().subscribe((currentUser) => {
      let array: Observable<User>[] = [];
      for (let pending of currentUser.listPending) {
        array.push(this.userService.getUserById(pending));
      }

      this.pendingClients = array;
    });
  }

  onAcceptClient(clientId: string, index: number) {
    this.userService.acceptClient(clientId, index);
  }
}

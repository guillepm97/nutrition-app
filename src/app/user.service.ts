import { Injectable } from '@angular/core';

import { User, UserType } from './user';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserId: number = 1;

  constructor() { }

  getUsers(): User[] {
    return USERS;
  }

  getUser(id: number): User {
    for (let user of this.getUsers()) {
      if (user.id == id) {
        return user;
      }
    }

    return null;
  }

  getCurrentUser(): User {
    return this.getUser(this.currentUserId);
  }

  currentUserNutritionist(): boolean {
    return this.getCurrentUser().type == UserType.Nutritionist;
  }
}

import { Injectable } from '@angular/core';

import { User, UserType } from './user';
import { USERS } from './mock-users';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserId: number = 0;

  constructor() { }

  getUsers(): User[] {
    return USERS;
  }

  addFood(food: Food) {
    let user = this.getCurrentUser();
    user.takenCalories = user.takenCalories+food.calories;
    user.remainingCalories = user.dailyCalories - user.takenCalories +
                             user.exerciseCalories;
    user.listFood.push(food);
  }

  deleteFood(food: Food) {
    let user = this.getCurrentUser();
    user.takenCalories = user.takenCalories - food.calories;
    user.remainingCalories = user.dailyCalories - user.takenCalories +
                             user.exerciseCalories;
    var isThisFood = false;
    for (var i = 0; i < user.listFood.length && isThisFood == false; i++) {
      if (food.id == user.listFood[i].id) {
        user.listFood.splice(i, 1);
        isThisFood = true;
      }
    }
  }

  getCurrentUserListFood() {
    let user = this.getCurrentUser();
    return user.listFood;
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

  getCurrentUserId(): number {
    return this.currentUserId;
  }

  currentUserNutritionist(): boolean {
    return this.getCurrentUser().type == UserType.Nutritionist;
  }

  getNutritionistAcceptedList(id: number) {
    let users: User[] = this.getUsers();
    for (let user of users) {
      if (user.type == UserType.Nutritionist && user.id == id) {
        return user.listAccepted;
      }
    }
  }

  getNutritionistPendingList(id: number) {
    let users: User[] = this.getUsers();
    for (let user of users) {
      if (user.type == UserType.Nutritionist && user.id == id) {
        return user.listPending;
      }
    }
  }

  getAcceptedClients(id: number): Array<User> {
    let users: User[] = this.getUsers();
    let acceptedClients: Array<User> = [];
    let list: Array<number> = this.getNutritionistAcceptedList(id);
    for (let i of list) {
      for (let user of users) {
        if (user.id == i) {
          acceptedClients.push(user);
        }
      }
    }

    return acceptedClients;
  }

  getPendingClients(id: number): Array<User> {
    let users: User[] = this.getUsers();
    let pendingClients: Array<User> = [];
    let list: Array<number> = this.getNutritionistPendingList(id);
    for (let i of list) {
      for (let user of users) {
        if (user.id == i) {
          pendingClients.push(user);
        }
      }
    }

    return pendingClients;
  }
}

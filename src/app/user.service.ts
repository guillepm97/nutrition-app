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

  currentUserNutritionist(): boolean {
    return this.getCurrentUser().type == UserType.Nutritionist;
  }
}

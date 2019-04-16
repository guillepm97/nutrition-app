import { Injectable } from '@angular/core';

import { Food } from './food';
import { FOODS } from './mock-food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getFood(): Food[] {
    return FOODS;
  }

  filterFood(foodName: string) {
    let items = this.getFood();
    if (foodName.trim() !== '') {
      return items = items.filter((item) => {
        return item.name.toLowerCase().indexOf(foodName.toLowerCase()) > -1;
      });
    } else {
      return items;
    }
  }
}

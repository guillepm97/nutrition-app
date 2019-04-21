import { Injectable } from '@angular/core';

import { FoodMock } from './food-mock';
import { FOODS } from './mock-food';

@Injectable({
  providedIn: 'root'
})
export class FoodMockService {

  constructor() { }

  getFood(): FoodMock[] {
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

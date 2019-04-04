import { Injectable } from '@angular/core';

import { Food } from './food'
import { FOODS } from './mock-food'

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getFood(): Food[] {
    return FOODS;
  }
}

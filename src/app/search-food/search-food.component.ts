import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FoodMock } from '../food-mock'
import { UserMockService } from '../user-mock.service';
import { FoodMockService } from '../food-mock.service';


@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
})
export class SearchFoodModal implements OnInit {
  food: FoodMock[];

  constructor(private modalController: ModalController,
              private userMockService: UserMockService,
              private foodMockService: FoodMockService) { }

  ngOnInit() {
    this.food = this.foodMockService.getFood();
  }

  selectFood(food: FoodMock) {
    this.userMockService.addFood(food);
    this.dismissModal();
  }

  setFilteredFood(foodName: string): void {
    this.food = this.foodMockService.filterFood(foodName);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}

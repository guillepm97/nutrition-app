import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Food } from '../food'
import { UserService } from '../user.service';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
})
export class SearchFoodModal implements OnInit {
  food: Food[];

  constructor(private modalController: ModalController,
              private userService: UserService,
              private foodService: FoodService) { }

  ngOnInit() {
    this.food = this.foodService.getFood();
  }

  selectFood(food: Food) {
    this.userService.addFood(food);
    this.dismissModal();
  }

  setFilteredFood(foodName: string): void {
    this.food = this.foodService.filterFood(foodName);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}

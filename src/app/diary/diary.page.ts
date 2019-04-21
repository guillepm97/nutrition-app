import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UserMock } from '../user-mock';
import { FoodMock } from '../food-mock';
import { UserMockService } from '../user-mock.service'

import { SearchFoodModal } from '../search-food/search-food.component';

@Component({
  selector: 'app-diary',
  templateUrl: 'diary.page.html',
  styleUrls: ['diary.page.scss']
})
export class DiaryPage {
  food: FoodMock[];
  user: UserMock;

  constructor(private modalController: ModalController,
              private userMockService: UserMockService) { }

  searchFood(): void {
    this.presentModal();
  }

  eliminateFood(food: FoodMock){
    this.userMockService.deleteFood(food);
  }

  ngOnInit() {
    this.food = this.userMockService.getCurrentUserListFood();
    this.user = this.userMockService.getCurrentUser();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchFoodModal,
    });
    return await modal.present();
  }
}

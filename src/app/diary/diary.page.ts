import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { User } from '../user';
import { Food } from '../food';
import { UserService } from '../user.service';

import { SearchFoodModal } from '../search-food/search-food.component';

@Component({
  selector: 'app-diary',
  templateUrl: 'diary.page.html',
  styleUrls: ['diary.page.scss']
})
export class DiaryPage {
  user$: Observable<User>;
  foodList: Food[];
  constructor(private modalController: ModalController,
              private userService: UserService) { }

  searchFood(): void {
    this.presentModal();
  }

  eliminateFood(food: Food, index: number) {
    this.userService.deleteFood(food, index);
  }

  ngOnInit() {
      this.user$ = this.userService.getCurrentUser();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchFoodModal,
    });
    return await modal.present();
  }
}

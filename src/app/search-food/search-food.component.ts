import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Food } from '../food';
import { UserService } from '../user.service'
import { FoodService } from '../food.service';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
})

export class SearchFoodModal {
  food$: Observable<Food[]>;
  foodFilter$: Subject<string>;

  constructor(private modalController: ModalController,
              private userService: UserService,
              private foodService: FoodService) {
    this.foodFilter$ = new Subject<string>();
    this.food$ = this.foodFilter$.pipe(
      switchMap(name =>
       this.foodService.getFood(name)
      )
    );
  }

  ionViewWillEnter() {
    this.foodFilter$.next('');
  }

  selectFood(food: Food) {
    this.userService.addFood(food);
    this.dismissModal();
  }

  setFilteredFood(name: string) {
    this.foodFilter$.next(name);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}

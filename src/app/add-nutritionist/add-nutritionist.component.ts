import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User, UserId } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-nutritionist',
  templateUrl: './add-nutritionist.component.html',
  styleUrls: ['./add-nutritionist.component.scss'],
})
export class AddNutritionistModal {
  query$: Observable<UserId[]>;
  nutritionistFilter$: Subject<string>;

  constructor(private modalController: ModalController,
              public userService: UserService) {
    this.nutritionistFilter$ = new Subject<string>();
    this.query$ = this.nutritionistFilter$.pipe(
      switchMap(name =>
       this.userService.getNutritionists(name)
      )
    );
  }

  ionViewWillEnter() {
    this.nutritionistFilter$.next('');
  }

  setFilteredNutritionists(name: string) {
    this.nutritionistFilter$.next(name);
  }

  selectNutritionist(id: string) {
    if(this.userService.setSelectedNutritionist(id) &&
       this.userService.requestNutritionist(id)) {
      this.modalController.dismiss()
    }
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}

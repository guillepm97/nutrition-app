import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { User } from '../user';
import { UserService } from '../user.service';

import { AddNutritionistModal } from '../add-nutritionist/add-nutritionist.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  user$: Observable<User>;

  constructor(public modalController: ModalController,
              public userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.getCurrentUser();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddNutritionistModal
    });
    return await modal.present();
  }
}

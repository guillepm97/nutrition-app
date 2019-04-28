import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.page.html',
  styleUrls: ['./client-info.page.scss'],
})
export class ClientInfoPage {
  user$: Observable<User>;
  userId: string;

  constructor(private route: ActivatedRoute,
              private alertController: AlertController,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user$ = this.userService.getUserById(this.userId);
  }

  onSelectData() {
    this.presentAlertPrompt();
  }

  updateClientData(dailyCalories: number) {
    this.userService.setClientData(this.userId, dailyCalories);
    this.userService.setClientFeed(this.userId, dailyCalories);
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Update daily calories',
      inputs: [
        {
          name: 'dailyCalories',
          type: 'text',
          placeholder: '2450'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'light',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: () => {
            alert.onDidDismiss().then(alert => {
              this.updateClientData(alert.data.values.dailyCalories);
            });
          }
        }
      ]
    });

    await alert.present();
  }
}

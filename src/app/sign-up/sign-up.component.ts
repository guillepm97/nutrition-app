import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpModal {
  picture: string = '';
  name: string;
  surname: string;
  email: string;
  password: string;
  type: string;

  constructor(private modalController: ModalController,
              private actionSheetController: ActionSheetController,
              private authService: AuthService,
              private cameraService: CameraService) { }

  onSelectPicture() {
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Take Photo',
        handler: () => {
          this.cameraService.takePhoto().then(pic => this.picture = pic);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async onSubmit() {
    if (await this.authService.signUp(this.picture, this.name, this.surname, this.email, this.password, this.type)) {
      this.dismissModal();
    }
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}

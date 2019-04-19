import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { SignUpModal } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;

  constructor(public modalController: ModalController,
              private authService: AuthService) { }

  async onSubmit() {
    await this.authService.signIn(this.email, this.password);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SignUpModal
    });
    return await modal.present();
  }
}

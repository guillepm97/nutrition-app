import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpModal {
  name: string;
  surname: string;
  email: string;
  password: string;
  type: string;

  constructor(private modalController: ModalController,
              private authService: AuthService) { }

  async onSubmit() {
    if (await this.authService.signUp(this.name, this.surname, this.email, this.password, this.type)) {
      this.dismissModal();
    }
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}

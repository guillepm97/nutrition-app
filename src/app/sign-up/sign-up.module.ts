import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignUpModal } from './sign-up.component';

@NgModule({
  declarations: [
    SignUpModal
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    SignUpModal
  ]
})
export class SignUpModule { }

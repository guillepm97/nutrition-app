import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNutritionistModal } from './add-nutritionist.component';

@NgModule({
  declarations: [
    AddNutritionistModal
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  entryComponents: [
    AddNutritionistModal
  ]
})
export class AddNutritionistModule { }

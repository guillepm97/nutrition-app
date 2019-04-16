import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchFoodModal } from './search-food.component';

@NgModule({
  declarations: [
    SearchFoodModal
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    SearchFoodModal
  ]
})
export class SearchFoodModule { }

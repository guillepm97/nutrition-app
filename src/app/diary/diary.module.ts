import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiaryPage } from './diary.page';
import { SearchFoodModule } from '../search-food/search-food.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DiaryPage }]),
    SearchFoodModule
  ],
  declarations: [DiaryPage]
})
export class DiaryPageModule {}

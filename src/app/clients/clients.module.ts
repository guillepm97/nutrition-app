import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsPage } from './clients.page';
import { ClientInfoPageModule } from '../client-info/client-info.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ClientsPage }]),
    ClientInfoPageModule
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}

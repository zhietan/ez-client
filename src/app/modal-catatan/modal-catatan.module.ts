import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCatatanPageRoutingModule } from './modal-catatan-routing.module';

import { ModalCatatanPage } from './modal-catatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCatatanPageRoutingModule
  ],
  declarations: [ModalCatatanPage]
})
export class ModalCatatanPageModule {}

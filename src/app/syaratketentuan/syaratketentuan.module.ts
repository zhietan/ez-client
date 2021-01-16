import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyaratketentuanPageRoutingModule } from './syaratketentuan-routing.module';

import { SyaratketentuanPage } from './syaratketentuan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyaratketentuanPageRoutingModule
  ],
  declarations: [SyaratketentuanPage]
})
export class SyaratketentuanPageModule {}

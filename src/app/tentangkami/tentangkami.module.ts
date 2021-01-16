import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TentangkamiPageRoutingModule } from './tentangkami-routing.module';

import { TentangkamiPage } from './tentangkami.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TentangkamiPageRoutingModule
  ],
  declarations: [TentangkamiPage]
})
export class TentangkamiPageModule {}

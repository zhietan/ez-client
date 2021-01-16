import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartingappPageRoutingModule } from './startingapp-routing.module';

import { StartingappPage } from './startingapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartingappPageRoutingModule
  ],
  declarations: [StartingappPage]
})
export class StartingappPageModule {}

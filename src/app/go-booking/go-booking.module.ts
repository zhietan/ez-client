import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GoBookingPageRoutingModule } from './go-booking-routing.module';

import { Ionic4DatepickerModule } from
  '@logisticinfotech/ionic4-datepicker';

import { GoBookingPage } from './go-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GoBookingPageRoutingModule
  ],
  declarations: [GoBookingPage]
})
export class GoBookingPageModule {}


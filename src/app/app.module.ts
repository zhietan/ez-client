import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule } from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomePageModule } from './home/home.module';
const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

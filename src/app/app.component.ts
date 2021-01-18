import { ServiceService } from './servive/service.service';
import { Component } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  user_data: any
  public on_badge: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private serveiceService: ServiceService,
    private navCtrl: NavController,
    private socket: Socket,
    private alertCtrl: AlertController
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.user_data = JSON.parse(localStorage.getItem(this.serveiceService.TOKEN_KEY));
      console.log('my_id', this.user_data.data[0].customer_id);

      this.get_on()

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.Auth();
    });
  }

  get_on() {
    console.log('connect socket, is online');
    this.socket.connect();
    this.socket.on("online", (resp) => {
      let customer_id = resp.user.customer_id
      let order_name = resp.user.service
      let is_first = resp.user.first
      let is_continue = resp.user.is_continue
      if (is_first == true && is_continue == false) {
        let my_id = this.user_data.data[0].customer_id;
        if (my_id == customer_id) {
          this.on_badge = true
          this.alert(order_name);
        }
      }
      else if (is_first == false && is_continue == true) {
        let my_id = this.user_data.data[0].customer_id;
        if (my_id == customer_id) {
          this.on_badge = true
          this.alert_continue(order_name);
        }
      }

      console.log('is online orderid', resp);
    })
  }

  async alert(order) {
    let alert = await this.alertCtrl.create({
      header: 'Notifikasi',
      message: 'Order ' + order + ' Sudah di proses oleh Mitra, silahkan ke tab order untuk cek tracking mitra',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.navigateForward('indexmenu/tabs/order');
        }
      }]
    })
    alert.present();
  }

  async alert_continue(order) {
    let alert = await this.alertCtrl.create({
      header: 'Mitra Melanjutkan',
      message: 'Order ' + order + ' dilanjutkan oleh Mitra, silahkan ke tab order untuk cek tracking mitra',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.navigateForward('indexmenu/tabs/order');
        }
      }]
    })
    alert.present();
  }

  Auth() {
    this.serveiceService.authenticationState.subscribe((data) => {
      if (data == true) {
        this.navCtrl.navigateRoot(['indexmenu']);
      } else {
        this.navCtrl.navigateRoot(['login']);
      }
    })
  }

  ngOnInit(): void {
    this.overrideDateToJsonFunction();
  }

  private overrideDateToJsonFunction(): void {
    Date.prototype.toJSON = function () {
      return new Date(this.getTime() - this.getTimezoneOffset() * 60 * 1000).toISOString();
    };
  }


}

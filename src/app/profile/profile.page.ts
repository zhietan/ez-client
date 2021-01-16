import { Component } from '@angular/core';
import { Platform, NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ServiceService } from './../servive/service.service';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  set_data:any;
  username:any;
  constructor(
    private router: Router,
    private nav:NavController,
    private serviceService : ServiceService
  ) {}
  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.username = this.set_data.data.name;
    });
  }
  editProfile(){
    this.nav.navigateForward('formprofile');
  }
  privasi(){
    this.nav.navigateForward('privasi');
  }
  syaratketentuan(){
    this.nav.navigateForward('syaratketentuan');
  }
  tentangkami(){
    this.nav.navigateForward('tentangkami');
  }
  logout(){
    this.serviceService.logout();
  }

  back() {
    this.router.navigate(['/indexmenu']);
  }
  
}

import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { ServiceService } from './../servive/service.service';
import { NavigationExtras } from '@angular/router';
import { IonSlides } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  set_data:any;
  user_data : any;
  public on_badge : boolean = false

  slideOptions = {
    initialSlide: 1,
    speed: 300,
  };
  
  constructor(
    private nav:NavController,
    private serviceService : ServiceService,
    
  ) {}
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  
  ngOnInit() {
 
  }



  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      console.log("index "+this.set_data.data.customer_id);
    });
  }

  goBookservice(partner,type,nominal){
    let navigationExtras : NavigationExtras = {
      state : {
        partner:partner,
        type:type
      }
    }
    if(type==='Cleaning'){
      this.nav.navigateForward('bookservice',navigationExtras);
    }else if(type==='Laundry'){
      this.nav.navigateForward('bookservice1',navigationExtras);
    }
  }

  goBooking(){
    this.nav.navigateForward('go-booking');
  }

}

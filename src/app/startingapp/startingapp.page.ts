import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-startingapp',
  templateUrl: './startingapp.page.html',
  styleUrls: ['./startingapp.page.scss'],
})
export class StartingappPage implements OnInit {

  slideOptions = {
    initialSlide: 1,
    speed: 300,
  };

  constructor(
    private nav : NavController
  ) { }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  ngOnInit() {
  }

  goRegister(){
    this.nav.navigateForward('register');
  }

  goLogin(){
    this.nav.navigateForward('login');
  }

}

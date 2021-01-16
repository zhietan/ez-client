import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {  OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';




@Component({
  selector: 'app-indexmenu',
  templateUrl: 'indexmenu.page.html',
  styleUrls: ['indexmenu.page.scss'],
})
export class IndexmenuPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription;  
  user_data : any;
  on_badge : boolean;
  constructor(
    private nav:NavController,
    private router: Router,
    private platform: Platform,
    private app : AppComponent
    
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      navigator['app'].exitApp();
    });
  }
  
  public home = function(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    this.on_badge = this.app.on_badge;
    console.log('badge home is',this.on_badge);
    
   }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

 

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}

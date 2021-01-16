import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Platform,NavController,LoadingController,ToastController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss'],
})
export class OrderPage {
  list_data: string = "list-1";
  id:any;
  set_data:any;
  dataform:any;
  ParamQuery:any;
  orderPending:any;
  orderReserved:any;
  orderGoing:any;
  orderComplete:any;

  otw_order : any;
  otw_order_id : any
  otw_user_id : any;
  user_data : any

  lazy_loading : boolean = true
  on_badge : boolean
  ongoing_badge : any;
  constructor(
    private nav:NavController,
    private router: Router,
    private formBuilder:FormBuilder,
    private serviceService : ServiceService,
    public route: ActivatedRoute,
    public loadingController : LoadingController,
    public toastController : ToastController,
    private Socket : Socket,
  ) {
    
  }

  ngOnInit(): void {
    this.user_data = JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
    console.log('user data',this.user_data.data[0].customer_id);
  }

  get_otw(){

    console.log('connect socket, is online');
    // this.Socket.connect();
    this.Socket.on("online", (resp) => {
      this.otw_order_id = resp.user.order_id
      this.otw_user_id = resp.user.pertner_id
      let customer_id = resp.user.customer_id
      let my_id = this.user_data.data[0].customer_id;
      if (my_id == customer_id) {
        this.on_badge = true
      }
      console.log('is online orderid',resp);
    })

    this.Socket.fromEvent('online').subscribe(online => {
      console.log('isONLINE',online);
      

    })
  }

  ionViewWillEnter() {
    
    this.get_otw()
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.load_pending()
      this.load_reserved()
      this.load_ongoing()
      this.load_complete()
    });
  }

  load_pending(){
    this.OrderPending(this.id,'Pending');
  }
  load_reserved(){
    this.OrderReserved(this.id,'Reserved');
  }
  load_ongoing(){
    this.OrderGoing(this.id,'On Going');
  }
  load_complete(){
    this.OrderComplete(this.id,'Completed');
  }

  async OrderPending(id,status){
    this.lazy_loading = true
    this.ParamQuery = {
      'status':status,
      'id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_pending').subscribe(
      data => {
        console.log(data);
          this.dataform = data;
          if(this.dataform.status !== 'success') {
            this.lazy_loading = false;
            }else{
              this.orderPending = this.dataform.data;
              this.lazy_loading = false;
            }
      },
      error => {
        console.log(error);
        }
    );
  }

  async OrderReserved(id,status){
    this.lazy_loading = true
    this.ParamQuery = {
      'status':status,
      'id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_reserved').subscribe(
      data => {
        console.log(JSON.stringify(data));
          this.dataform = data;
          if(this.dataform.status !== 'success') {
            this.lazy_loading = false;
            }else{
              this.lazy_loading = false;
              this.orderReserved = this.dataform.data;
            }
      },
      error => {
        console.log(error);
        
        }
    );
  }

  async OrderGoing(id,status){
    this.lazy_loading = true
    this.ParamQuery = {
      'status':status,
      'id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_going').subscribe(
      data => {
        console.log(JSON.stringify(data));
          this.dataform = data;
          if(this.dataform.status !== 'success') {
            this.lazy_loading = false;
            }else{
              this.lazy_loading = false;
              this.orderGoing = this.dataform.data;
              this.ongoing_badge = this.orderGoing.length
            }
      },
      error => {
          console.log(error);
          
        }
    );
  }

  async OrderComplete(id,status){
    this.lazy_loading = true
    this.ParamQuery = {
      'status':status,
      'id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_completed').subscribe(
      data => {
        console.log(JSON.stringify(data));
          this.dataform = data;
          if(this.dataform.status !== 'success') {
            this.lazy_loading = false;
            }else{
              this.lazy_loading = false;
              this.orderComplete = this.dataform.data;
            }
      },
      error => {
          console.log(error);
          
        }
    );
  }

  goDetail(item){
    console.log(this.otw_order_id);
    let order_id = item.order_id
    if (order_id == this.otw_order_id) {
      let navigationExtras : NavigationExtras = {
        state : {
          order_id: order_id,
          is_otw : true
        }
      }
      this.nav.navigateForward('detailorder',navigationExtras);
    }else{
      let navigationExtras : NavigationExtras = {
        state : {
          order_id:order_id,
          is_otw : false
        }
      }
      this.nav.navigateForward('detailorder',navigationExtras);
    }
    
    
  }
}

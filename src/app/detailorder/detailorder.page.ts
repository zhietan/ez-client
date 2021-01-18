import { Component } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { Platform,NavController,LoadingController,ToastController} from '@ionic/angular';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-detailorder',
  templateUrl: 'detailorder.page.html',
  styleUrls: ['detailorder.page.scss'],
})
export class DetailorderPage {

  order_id;
  id:any;
  set_data:any;
  ParamQuery:any;
  dataform:any;

  nama;
  service_type;
  date_order;
  date_finish;
  alamat;
  status;
  photo = 'assets/images/icon_delivery_service.png';
  latitude;
  longitude;
  phone;

  is_lazy : boolean = true
  is_otw : boolean;
  user_data : any;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private serviceService : ServiceService,
    public loadingController : LoadingController,
    public nav : NavController,
    private Socket : Socket 
  ) {}
  // ngOnInit() {
  //   this.order_id= this.router.getCurrentNavigation().extras.state.order_id;
  // }
  ngOnInit() {
    this.user_data = JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
    if(this.router.getCurrentNavigation().extras.state)
    {
      this.order_id = this.router.getCurrentNavigation().extras.state.order_id;
      this.is_otw = this.router.getCurrentNavigation().extras.state.is_otw;
      console.log('or_id',this.order_id);
      console.log('is otw',this.is_otw);
    }
    else 
    {      
      this.order_id= this.route.snapshot.params.order_id;
      this.is_otw = this.route.snapshot.params.is_otw;
      console.log('or_id',this.order_id);
      console.log('is otw',this.is_otw);
    }
  }
  get_otw(){

    console.log('connect socket, is online');
    // this.Socket.connect();
    this.Socket.on("online", (resp) => {
      let customer_id = resp.user.customer_id
      let my_id = this.user_data.data[0].customer_id;
      if (my_id == customer_id) {
       this.is_otw = true
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
      console.log('cek user',this.set_data);
      this.id = this.set_data.data.customer_id;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.setDetail(this.order_id);
    });
  }

  set : any;
  async setDetail(id){
    this.ParamQuery = {
      'order_id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_detail').subscribe(
      data => {
        console.log('detail order',data);
          this.dataform = data;
          if(this.dataform.status !== 'success') {
           this.is_lazy = false
          }else{
            this.is_lazy = false

            this.set = this.dataform.data[0];
            this.nama = this.set.partner_name;
            this.service_type = this.set.service_type;
            this.alamat = this.set.partner_address;
            this.date_order = this.set.date_order;
            this.status = this.set.status;
            // this.photo= "../../assets/images/"+this.set.photo;
            this.latitude = this.set.latitude;
            this.longitude = this.set.longitude;
            this.phone = this.set.partner_phone;
          }
      },
      error => {
          console.log(error);
          
        }
    );
  }

  goMap(lat, lon){
    let data_detail = {
      alamat : this.alamat,
      nama : this.nama,
      phone : this.phone,
      status : this.status,
      service : this.service_type

    }
    this.nav.navigateForward(['marker-map',{lat : lat,long: lon, data : JSON.stringify(data_detail)}],);
    console.log('log lat',lat, lon);
    console.log('data param',data_detail);
    
    

  }

  back() {
    this.router.navigate(['/indexmenu']);
  }
}

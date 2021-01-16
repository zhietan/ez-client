import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { Platform,NavController,LoadingController,ToastController} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ServiceService } from './../servive/service.service';


@Component({
  selector: 'app-select-package',
  templateUrl: './select-package.page.html',
  styleUrls: ['./select-package.page.scss'],
})
export class SelectPackagePage implements OnInit {
  id:any;
  set_data:any;
  dataform:any;
  booking_list:any;
  package_list : any = [
    {
    price : '120.000',
    luas : '30-45',
    durasi : '2'
    },
    {
    price : '180.000',
    luas : '50-75',
    durasi : '2'
    },
    {
    price : '240.000',
    luas : '75-100',
    durasi : '2'
    },
    {
    price : '300.000',
    luas : '105-125',
    durasi : '2'
    },
    {
    price : '360.000',
    luas : '130-150',
    durasi : '2'
    },
]
item : any
  constructor(
    private modalCtrl : ModalController,
    private router: Router,
    private serviceService : ServiceService,
    public loadingController : LoadingController
  ) { }

  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.getData();
    });
  }

  async getData(){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.serviceService.getBooking().subscribe(
      data => {
        this.dataform = data;
          if(this.dataform.status !== 'success') {
              loading.dismiss();
            }else{
              loading.dismiss();
              this.booking_list = this.dataform.data;
              console.log(this.booking_list);
            }
      },
      error => {
          loading.dismiss();
        }
    );
  }

  ngOnInit() {
  }
  select(item){
    this.item = item
    console.log(this.item);
    this.modalCtrl.dismiss(this.item)
    
  }

  back(){
    this.modalCtrl.dismiss()
  }

}

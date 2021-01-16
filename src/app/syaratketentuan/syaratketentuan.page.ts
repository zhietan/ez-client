import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { Platform,NavController,LoadingController,ToastController} from '@ionic/angular';
import { ServiceService } from './../servive/service.service';


@Component({
  selector: 'app-syaratketentuan',
  templateUrl: './syaratketentuan.page.html',
  styleUrls: ['./syaratketentuan.page.scss'],
})
export class SyaratketentuanPage implements OnInit {
  id:any;
  set_data:any;
  dataform:any;
  syaratketentuan:any;
  constructor(
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
    this.serviceService.getSyaratKetentuan().subscribe(
      data => {
        this.dataform = data;
          if(this.dataform.status !== 'success') {
              loading.dismiss();
            }else{
              loading.dismiss();
              this.syaratketentuan = this.dataform.data[0].value;
            }
      },
      error => {
          loading.dismiss();
        }
    );
  }


  ngOnInit() {
  }

  back() {
    this.router.navigate(['/indexmenu']);
  }

}

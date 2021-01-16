import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Platform,ModalController,NavController,LoadingController,ToastController} from '@ionic/angular';
import * as moment from 'moment';
import { ModalPage } from './modal/modal.page';
@Component({
  selector: 'app-bookservice',
  templateUrl: 'bookservice.page.html',
  styleUrls: ['bookservice.page.scss'],
})
export class BookservicePage {
  private currentNumberText = '2 Jam';
  currentNumber:any;
  FormOrder: FormGroup;
  partner:any;
  minHours:any;
  type:any;
  dataform:any;
  id:any;
  set_data:any;
  lat;
  lng;
  alamat;
  id_layanan;
  date_now = moment().format('YYYY-MM-DD');
  loc="";
  constructor(
    private nav:NavController,
    private router: Router,
    private formBuilder:FormBuilder,
    private serviceService : ServiceService,
    public route: ActivatedRoute,
    public loadingController : LoadingController,
    public toastController : ToastController,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    this.partner= this.router.getCurrentNavigation().extras.state.partner;
    this.type= this.router.getCurrentNavigation().extras.state.type;
    this.FormOrder=this.formBuilder.group({
      id : ['',Validators.required],
      partner : [this.partner,Validators.required],
      type : [this.type,Validators.required],
      tanggal : ['', Validators.required],
      jam : ['', Validators.required],
      qty : [this.currentNumber,Validators.required],
      alamat : [this.alamat, Validators.required],
      layanan:[this.id_layanan, Validators.required],
      lat:[''],
      lng:[''],
      note : ['']
    })
  }

  generateTime(){
    let hours = new Date().getHours() + 3;
    for(let i = hours; i <= 24; i++){
      if(this.minHours)
      {
        this.minHours += ", " + i;
      }
      else
      {
        this.minHours = i.toString();
      }
    } 
  }

  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      this.currentNumber=1;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.getlayanan();
      this.setHarga();
      this.generateTime();
    });
  }

  updateMyMinHours(event : any)
  {
    if(new Date(event.detail.value) >= new Date())
    {
      this.minHours = "";
    }
    else
    {
      this.generateTime();
    }
  }

  check_ruangan(){
    if(this.currentNumber == 2){
      let message='45M2 (2 Kamar + 1 Kamar mandi + 1 Ruang Lain)';
      this.presentToast(message);
    }
    if(this.currentNumber == 3){
      let message='70M2 (3 Kamar + 2 Kamar mandi + 1 Ruang Lain)';
      this.presentToast(message);
    }
    if(this.currentNumber == 4){
      let message='100M2 (4 Kamar + 3 Kamar mandi + 1 Ruang Lain)';
      this.presentToast(message);
    }
    if(this.currentNumber == 5){
      let message='125M2 (4 Kamar + 3 Kamar mandi + 2 Ruang Lain)';
      this.presentToast(message);
    }
    if(this.currentNumber == 6){
      let message='150M2 (5 Kamar + 4 Kamar mandi + 3 Ruang Lain)';
      this.presentToast(message);
    }
  }

  onDescrement() {
    if(this.currentNumber > 2){
      this.currentNumber--;
      this.currentNumberText = this.currentNumber+' Jam';
      this.setHargaEx(this.currentNumber);
      this.check_ruangan();
    }else{
      let message='Cleaning service minimum 2 Jam';
      this.presentToast(message)
    }
  }

  onIncrement() {
    if(this.currentNumber < 6){
      this.currentNumber++;
      this.currentNumberText = this.currentNumber+' Jam';
      this.setHargaEx(this.currentNumber);
      this.check_ruangan();
    }else{
      let message='Maaf, maksimum 6 Jam';
      this.presentToast(message)
    }
  }

  net_amt;
  setHargaEx(qty){
    let par = this.FormOrder.value;
    if(par.layanan!==null){
      let set = par.layanan.split("#");
      let harga = set[1];
      this.net_amt = harga*qty;
    }else{
      this.net_amt = 0;
    }
  }
  setHarga(){
    let par = this.FormOrder.value;
    if(par.layanan!==null){
      let set = par.layanan.split("#");
      let harga = set[1];
      let qty = par.qty;
      this.net_amt = harga*qty;
    }else{
      this.net_amt = 0;
    }
  }

  datalayanan;
  setlayanan;
  async getlayanan(){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.serviceService.getLayanan(this.FormOrder.value, 'layanan_service').subscribe(
      data => {
        console.log(JSON.stringify(data));
          loading.dismiss();
          this.datalayanan = data;
          this.setlayanan = this.datalayanan.data;

          let pilihlayanan = this.setlayanan.find(x=> x.id == 2);
          this.FormOrder.controls["layanan"].setValue(pilihlayanan.id + "#" + pilihlayanan.price);

          console.log(this.setlayanan);
      },
      error => {
        console.log(JSON.stringify(error));
            let message='Tidak dapat memproses permintaan anda';
            console.log(message)
            this.presentToast(message);
            loading.dismiss();
        }
    );
  }

  async SaveFunc(){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.serviceService.SaveBookService(this.FormOrder.value, 'save_bookservice').subscribe(
      data => {
        console.log(JSON.stringify(data));
          this.dataform = data;
          if(this.dataform.status !== 'success') {
              let message='Tidak dapat memproses permintaan anda';
              this.presentToast(message)
              loading.dismiss();
            }else{
              let message='Bookservice berhasil disimpan';
              this.presentToast(message)
              loading.dismiss();
              this.router.navigate(['/detailorder', {order_id:this.dataform.order_id}]);
              // this.router.navigateByUrl('/indexmenu/tabs/order');
              // this.router.navigateByUrl('/detailorder');
            }
      },
      error => {
        console.log(JSON.stringify(error));
        
            let message='Tidak dapat memproses permintaan anda';
            console.log(message)
            this.presentToast(message);
          loading.dismiss();
        }
    );
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message : Message,
      duration: 2500,
      position : "bottom"
    });
    toast.present();
  }

  parseParam;
  async showModal(){
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ModalPage
    });

    modal.onDidDismiss().then((detail) => {
      this.parseParam = detail.data;
      if (detail !== null) {
        this.lat= this.parseParam.latitude;
        this.lng= this.parseParam.longitude;
        this.alamat=this.parseParam.alamat;
        this.loc=this.parseParam.latitude;
      }
   });


    await modal.present();
  }

  goBooking(){
    this.router.navigateByUrl('success');
  }
}
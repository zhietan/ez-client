import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { Ionic4DatepickerModule } from
  '@logisticinfotech/ionic4-datepicker';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import * as moment_ from 'moment';
import { MapPage } from '../map/map.page';
import { ModalCatatanPage } from '../modal-catatan/modal-catatan.page';
import { SelectPackagePage } from '../select-package/select-package.page';
import { ServiceService } from './../servive/service.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Router, ActivatedRoute } from '@angular/router';

const moment = moment_;


@Component({
  selector: 'app-go-booking',
  templateUrl: './go-booking.page.html',
  styleUrls: ['./go-booking.page.scss'],
})
export class GoBookingPage implements OnInit {
  public name: string;
  public email: string;
  public date: string;
  catatan: any
  package_price: any = 0.00
  package_durasi: any = 0
  package_luas: any = '0 - 0'
  input: any = {}
  dataform:any;
  id:any;
  set_data:any;
  lat;
  lng;
  alamat;
  id_layanan;
  loc;

  constructor(
    public modalCtrl: ModalController,
    private navCtrl: NavController,    
    private router: Router,
    private serviceService : ServiceService,
    public toastController : ToastController,
    public loadController : LoadingController, public geo:Geolocation
  ) { }

  // submit(){
  //   console.log('DATE', this.mydate);
  //   this.navCtrl.navigateRoot('login')
  // }

  mydate = '11-12-2018';

  datePickerObj: any = {};
  datePickerObjPtBr: any = {};
  mydatePtBr = '06 Fev 2019';

  isDisableDatePicker: false;
  monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  selectedDate;

  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
    });
  }

  ngOnInit() {
    const disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format
      new Date('12-14-2018') // Short format
    ];

    // EXAMPLE OBJECT
    this.datePickerObj = {
      dateFormat: 'DD-MM-YYYY',
      fromDate: new Date('2010-01-01'), // default null
      yearInAscending: true
    };

    this.datePickerObjPtBr = {
      dateFormat: 'DD MMM YYYY',
      closeOnSelect: true,
      setLabel: 'OK',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      titleLabel: 'Selecione uma data',
      monthsList: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      clearButton: false
      // momentLocale: 'pt-BR'
    };
  }

  onChangeDate() {
    console.log('onChangeDate date ', this.mydate);
  }

  onClickSubmit() {
    // console.log('onClickSubmit', this.dataForm.value);
  }

  async openDatePicker() {
    const datePickerObj = {
      inputdate: moment(new Date()),
      closeOnSelect: true,
      titleLabel: 'Pilih tanggal',
      closeLabel: 'Batal',
      monthsList: [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ],
      showTodayButton: false,
      weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      dateFormat: 'DD-MMM-YYYY',
      clearButton: true
    };

    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { objConfig: datePickerObj }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then(data => {
      // this.isModalOpen = false;
      console.log(data);
      this.selectedDate = data.data.date;
      this.updateMyMinHours()
    });
  }

  async modalNote() {
    const modal = await this.modalCtrl.create({
      component: ModalCatatanPage,
      cssClass: 'modal-catatan'
    })
    modal.onDidDismiss()
      .then((data) => {
        console.log('data modal', data);
        this.catatan = data.data
      })
    return await modal.present();

  }

  parseParam;
  async modalMap() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      cssClass: 'modal-select-package'
    })
    modal.onDidDismiss()
      .then((data) => {
        console.log('data modal', data);
        this.parseParam = data.data;
        if (data !== null) {
          this.lat= this.parseParam.latitude;
          this.lng= this.parseParam.longitude;
          this.alamat=this.parseParam.alamat;
          this.loc =this.parseParam.latitude;
        }
      })
    return await modal.present();
  }

  async changePackage() {
    const modal = await this.modalCtrl.create({
      component: SelectPackagePage,
      cssClass: 'modal-select-package'
    })
    modal.onDidDismiss()
      .then((data) => {
        console.log('data modal', data.data);
        this.package_price = data.data.price
        this.package_luas = data.data.luas
        this.package_durasi = data.data.durasi
      })
    return await modal.present();
  }

  minHours:any;
  minMenit:any;
  timeDisabled : boolean = false;
  updateMyMinHours() {
    var today = new Date();
    var open = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0);
    if (new Date(this.selectedDate) > open) {
      this.minHours = "8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18";
      this.timeDisabled = false;
    }
    else {
      this.generateTime();
    }
  }

  generateTime(){
    let hours = new Date().getHours() + 3 <= 8 ? 8 : new Date().getHours() + 3 ;
    this.minHours = "";
    if(hours >= 18)
    {
      this.minHours = "18";
      this.minMenit = "0";
      this.timeDisabled = true;
    }
    else 
    {
      for(let i = hours; i <= 18; i++){
        if(this.minHours)
        {
          this.minHours += ", " + i;
        }
        else
        {
          this.minHours = i.toString();
        }
      } 
      this.input.time = null;
      this.minMenit = "0, 30";
    }
  }

  async submit()
  {
    const loading = await this.loadController.create({
      message : 'Please wait...'
    });
    let param = {
      id : this.id,
      partner : 0,
      type : "Cleaning",
      tanggal : this.selectedDate,
      jam : this.input.time,
      qty : this.package_durasi,
      alamat: "Koja, Jakarta Utara", // this.alamat,
	    layanan: this.package_durasi + '#' + this.package_price.replace('.',''),
	    lat: "-6.2614927", // this.lat,
	  	lng: "106.8105998", //this.lng,
	    note: this.catatan
    };

    await loading.present();
    this.serviceService.SaveBookService(param,'save_bookservice').subscribe(
      data => {
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
              // this.navCtrl.navigateRoot('order-success');
              // this.navCtrl.navigateRoot(['/detailorder', {order_id:this.dataform.order_id}]);

            }
      },
      error => {
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

  back() {
    this.router.navigate(['/indexmenu']);
  }

}

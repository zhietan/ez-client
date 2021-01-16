import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Platform, NavController, ToastController, ModalController, LoadingController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-verification',
  templateUrl: 'verification.page.html',
  styleUrls: ['verification.page.scss'],
})
export class VerificationPage {

  FormOTP: FormGroup;
  dataOtp: any;
  dataLogin:any;
  phoneParam: any;
  extras: any;
  timer : 30;
  shouldDisable=true;

  constructor(
    private nav:NavController,
    private formBuilder:FormBuilder,
    public toastController : ToastController,
    private serviceService : ServiceService,
    public modalController: ModalController,
    public route: ActivatedRoute,
    public router : Router,
    public loadingController : LoadingController
  ) {}

  ngOnInit() {
    this.extras = this.router.getCurrentNavigation().extras.state;
    this.phoneParam= this.router.getCurrentNavigation().extras.state.phone;
    this.FormOTP=this.formBuilder.group({
      first : ['', Validators.required],
      second : ['', Validators.required],
      third : ['', Validators.required],
      fourth : ['', Validators.required]
    })
    this.runTimer()
  }
  public runTimer(){
    let element = document.getElementById("circlecount");
    document.getElementById("resendlink").classList.add("disabled")
    element.classList.add("run-animation")
    document.getElementById('countdown-number').textContent = ""+30;

    for (let i = 1; i <= 30; i++) {
      setTimeout(function timer() {
        let countdown = 30-i;
        document.getElementById('countdown-number').textContent = ""+countdown;
        if (countdown==0){
          document.getElementById("resendlink").classList.remove("disabled")
          document.getElementById("circlecount").classList.remove("stop")
          element.classList.remove("run-animation");
          void element.offsetWidth;
        }
      }, i * 1000);
    }

  }
  async loginApiFunc() {  
    const loading = await this.loadingController.create({
      message : 'Mengirim Kembali ...'
    });

    await loading.present();

    this.serviceService.checkNumber(this.extras, 'auth/login').subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.dataLogin=data;
        if(this.dataLogin.status !== 'success') {
          let message='Ada kendala dalam pengiriman OTP ulang, harap coba kembali dalam beberapa menit!';
          this.presentToast(message)
          loading.dismiss();
        }else{
          let message='Sudah terkirim ulang, harap menunggu OTP masuk!';
          this.presentToast(message)
          loading.dismiss();
          this.runTimer();
        }
        
      },
      error => {
        console.log(JSON.stringify(error));
        if(error.status == 422) {
          let message='No Handphone Belum Terdafar';
          console.log(message)
          this.presentToast(message);
        }else{
          console.log(JSON.stringify(error));
          let message='Tidak dapat memproses permintaan anda';
          console.log(message)
          this.presentToast(message);
        }
        loading.dismiss();
        
      }
    )
  }
  
  async sendOtpConfirmation() {

    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });
    // const otpCode = `${this.FormOTP.value.first}${this.FormOTP.value.second}${this.FormOTP.value.third}${this.FormOTP.value.fourth}`;
    // let item = {
    //   otp : otpCode.trim(),
    //   phone : this.phoneParam
    // }

    const otpCode = this.FormOTP.value.first + this.FormOTP.value.second + this.FormOTP.value.third + this.FormOTP.value.fourth;
    let item = {
      otp : otpCode,
      phone : this.phoneParam
    }

    await loading.present();

    this.serviceService.confirmationOtp(item, 'auth/otp-confirmation').subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.dataOtp=data;
        if(this.dataOtp.status !== 'success') {
          let message = 'Kode Otp yang Anda Masukkan Salah';
          this.presentToast(message)
          loading.dismiss();
        }else{
          loading.dismiss();
          this.goHome();
        }
      },
      error => {
        console.log(JSON.stringify(error));
        if(error.status == 422) {
          let message='No Handphone Belum Terdafar';
          console.log(message)
          this.presentToast(message);
        }else{
          let message='Tidak dapat memproses permintaan anda';
          console.log(message)
          this.presentToast(message);
        }
        loading.dismiss();
        
      }
    )

    
  }

  goHome(){
    this.nav.navigateForward('indexmenu');
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message : Message,
      duration: 2500,
      position : "bottom"
    });
    toast.present();
  }

  otpController(event,next,prev){

    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
 }

//  back() {
//   this.router.navigate(['/indexmenu']);
//  }

}

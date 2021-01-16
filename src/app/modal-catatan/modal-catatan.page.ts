import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-catatan',
  templateUrl: './modal-catatan.page.html',
  styleUrls: ['./modal-catatan.page.scss'],
})
export class ModalCatatanPage implements OnInit {
  note : any
  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  back(){
    this.modalCtrl.dismiss()
  }

  submit(){
    this.modalCtrl.dismiss(this.note)
    
  }

}

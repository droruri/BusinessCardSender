import {Component} from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {Message} from "../../models/Message";


@Component({
  selector: 'page-choose-prefered-attachment-modal',
  templateUrl: 'choose-prefered-attachment-modal.html',
})
export class ChoosePreferredAttachmentModalPage {

  chosenMessage: Message = this.navParams.get('chosenMessage');
  phoneNumber: string = this.navParams.get('phoneNumber');

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}

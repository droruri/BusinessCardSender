import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MessagesStorageProvider} from "../../providers/messages-storage/messages-storage";

/**
 * Generated class for the AddNewMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-message',
  templateUrl: 'add-new-message.html',
})
export class AddNewMessagePage {

  addedMessageContent:string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private messagesStorageProvider:MessagesStorageProvider) {
  }

  saveMessage() {
    this.messagesStorageProvider.addMessageToSend(this.addedMessageContent);
    this.addedMessageContent = '';
    this.navCtrl.push('MessagesManagingPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewMessagePage');
  }

}

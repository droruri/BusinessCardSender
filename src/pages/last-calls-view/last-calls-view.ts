import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CallLogProvider} from "../../providers/call-log/call-log";
import {Subscription} from "rxjs";
import {CallDetails} from "../../models/CallDetails";
import {SendingSmsProvider} from "../../providers/sending-sms/sending-sms";
import {MessagesStorageProvider} from "../../providers/messages-storage/messages-storage";
import {Message} from "../../models/Message";
import {UserSettingsProvider} from "../../providers/user-settings/user-settings";

/**
 * Generated class for the LastCallsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-last-calls-view',
  templateUrl: 'last-calls-view.html',
})
export class LastCallsViewPage {

  lastCalls:CallDetails[];
  callLogPhoneNumbersSubscription:Subscription;
  usernameValiditySubscription:Subscription;

  favoriteMessage:Message = {id:null, content:""};

  isUsernameValid:boolean = false;

  constructor(public navCtrl: NavController,
              private callLog:CallLogProvider,
              private sendingSmsProvider:SendingSmsProvider,
              private callLogProvider:CallLogProvider,
              public messagesStorageProvider:MessagesStorageProvider,
              private userSettingsProvider:UserSettingsProvider,
              public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.callLogProvider.fetchCallLog();

    this.callLogPhoneNumbersSubscription = this.callLog.callLogPhoneNumbersObservable
      .subscribe((callLogs) => {
        this.lastCalls = [...callLogs.slice(0, 10)]
      });

    this.messagesStorageProvider.favoriteMessageObservable.subscribe((message)=>{
      this.favoriteMessage = message;
    });

    this.usernameValiditySubscription = this.userSettingsProvider.usernameValidityObservable
      .subscribe((isValid)=>{
        this.isUsernameValid = isValid;
      })
  }

  ionViewDidLeave(){
    this.callLogPhoneNumbersSubscription.unsubscribe();
    this.usernameValiditySubscription.unsubscribe();
  }

  sendWhatsappMessage(phoneNumber:string){
    this.sendingSmsProvider.sendFavoriteMessageViaWhatsAppToPhoneNumber(phoneNumber);
  }

  sendSmsMessage(phoneNumber:string){
    this.sendingSmsProvider.sendFavoriteMessageViaSmsAppToPhoneNumber(phoneNumber);
  }

  displayContent():string{
    if(this.isFavoriteMessageInvalid()){
      return 'עדיין לא נבחרה הודעה מועדפת';
    }
    return this.favoriteMessage.content;
  }

  isFavoriteMessageInvalid(){
    return this.favoriteMessage === null || this.favoriteMessage === undefined ||
      this.favoriteMessage.content.length === 0;
  }

  getContactNameOrNumber(phoneNumber: CallDetails) {
    if ((phoneNumber.name !== null) && (phoneNumber.name !== undefined) && phoneNumber.name.length > 0) {
      return phoneNumber.name;
    } else {
      return phoneNumber.number;
    }
  }
}

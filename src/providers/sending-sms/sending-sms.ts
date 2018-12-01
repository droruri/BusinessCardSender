import { Injectable } from '@angular/core';
import {AndroidCallLog} from "../../models/AndroidCallLog";
import {Message} from "../../models/Message";
import {SMS} from "@ionic-native/sms";
import {CallLogProvider} from "../call-log/call-log";
import {MessagesStorageProvider} from "../messages-storage/messages-storage";
import {Dialogs} from "@ionic-native/dialogs";
import {SocialSharing} from "@ionic-native/social-sharing";
import {UserSettingsProvider} from "../user-settings/user-settings";
import {GENERAL_WEBSITE_PREFIX, GENERAL_WEBSITE_SUFFIX} from "../../utilities/constants";

/*
  Generated class for the SendingSmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendingSmsProvider {

  lastCall: AndroidCallLog = null;
  lastCallNumber: string = null;

  favoriteMessage:Message = null;

  username:string = '';
  isUsernameValid:boolean = false;

  constructor(private callLogService:CallLogProvider,
              private sms: SMS,
              private dialogs: Dialogs,
              private socialSharing:SocialSharing,
              private userSettingsProvider:UserSettingsProvider,
              private messagesStorageProvider:MessagesStorageProvider){
    this.callLogService.lastCallObservable.subscribe((lastCall) => {
      this.lastCall = lastCall;
      this.setLastCallNumber();
    });

    this.messagesStorageProvider.favoriteMessageObservable
      .subscribe((message) => {
        this.favoriteMessage = message;
      });

    this.userSettingsProvider.storedXsiteUsernameObservable
      .subscribe((username)=>{
        this.username = username;
      });

    this.userSettingsProvider.usernameValidityObservable
      .subscribe((isValid)=>{
        this.isUsernameValid = isValid;
      });
  }

  private addInternationalPrefixForPhoneNumber(phoneNumber:string) {
    if (phoneNumber !== null && phoneNumber[0] === '0') {
      phoneNumber.substr(1);
      phoneNumber = '+972' + this.lastCallNumber;
    }
    return phoneNumber;
  }

  private setLastCallNumber() {
    this.lastCallNumber = ((this.lastCall !== null) && (this.lastCall !== undefined)
      && (this.lastCall.number !== null) && (this.lastCall.number !== undefined)) ? this.lastCall.number : null;
  }

  sendFavoriteMessageViaSmsAppToPhoneNumber(phoneNumber:string){
    this.sendSmsMessage(this.favoriteMessage, [phoneNumber]);
  }

  sendSmsFavoriteMessageToLastCaller() {
    this.sendFavoriteMessageViaSmsAppToPhoneNumber(this.lastCallNumber);
  }

  sendFavoriteMessageViaWhatsAppToPhoneNumber(phoneNumber:string){
    let prefixedPhoneNumber = this.addInternationalPrefixForPhoneNumber(phoneNumber);

    this.socialSharing
      .shareViaWhatsAppToReceiver(prefixedPhoneNumber,this.getCompleteMessage(this.favoriteMessage), null, null);
  }

  sendFavoriteMessageViaWhatsAppToLastCaller(){
    this.sendFavoriteMessageViaWhatsAppToPhoneNumber(this.lastCallNumber)
  }

  sendSmsMessageToSelectedContacts(message: Message, contactNumbers: string[]) {
    this.sendSmsMessage(message, contactNumbers);
  }

  sendSmsMessage(message: Message, contactNumbers: string[]) {
    this.sms.send(contactNumbers, this.getCompleteMessage(message))
      .then((args) => {
        this.dialogs.alert('ההודעה נשלחה בהצלחה!','הודעה');
      }, (err) => {
        console.log('Error');
      });
  }

  getCompleteMessage(message:Message){
    if(this.isUsernameValid){
      return `${message.content}\n\n${this.getFullAddressForPersonalWebsite()}`;
    } else {
      return `${message.content}`;
    }
  }

  getFullAddressForPersonalWebsite(){
    if(this.isUsernameValid){
      return `${GENERAL_WEBSITE_PREFIX}${this.username}${GENERAL_WEBSITE_SUFFIX}`;
    }
    return '';
  }



}

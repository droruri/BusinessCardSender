import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
import {CallLogProvider} from "../../providers/call-log/call-log";
import {Subscription} from "rxjs";
import {CallDetails} from "../../models/CallDetails";
import {SendingSmsProvider} from "../../providers/sending-sms/sending-sms";
import {MessagesStorageProvider} from "../../providers/messages-storage/messages-storage";
import {Message} from "../../models/Message";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {AppState} from "../../state-management/app-state";
import {Store} from "@ngrx/store";
import {getChosenAttachment, getSettingsValidity} from "../../state-management/settings.selector";
import {ChoosePreferredAttachmentModalPage} from "../choose-prefered-attachment-modal/choose-prefered-attachment-modal";
import {CallNumber} from "@ionic-native/call-number";
import {attachments, CHOOSE_WHATSAPP} from "../../utilities/constants";
import {Dialogs} from "@ionic-native/dialogs";

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

  lastCalls: CallDetails[] = [];
  callLogPhoneNumbersSubscription: Subscription;
  usernameValiditySubscription: Subscription;

  messages: Message[] = [];
  chosenMessage: Message;

  areSettingsValid: boolean = false;

  NUMBER_OF_LAST_CALLS = 10;
  index = 0;

  attachment: attachments = CHOOSE_WHATSAPP;

  constructor(public navCtrl: NavController,
              private callLog: CallLogProvider,
              private sendingSmsProvider: SendingSmsProvider,
              private callLogProvider: CallLogProvider,
              private androidPermissions: AndroidPermissions,
              public messagesStorageProvider: MessagesStorageProvider,
              public modalCtrl: ModalController,
              private callNumber: CallNumber,
              private dialogs: Dialogs,
              private store: Store<AppState>) {
    this.store.select(getChosenAttachment)
      .subscribe(attachment => {
        this.attachment = attachment
      });

  }

  ionViewCanEnter(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.READ_CALL_LOG,
        this.androidPermissions.PERMISSION.READ_CONTACTS,
        this.androidPermissions.PERMISSION.SEND_SMS,
        this.androidPermissions.PERMISSION.READ_PHONE_STATE,
        this.androidPermissions.PERMISSION.CALL_PHONE
      ]).then(() => {
          console.log(true);
          resolve(true);
        }
        ,
        () => {
          this.navCtrl.setRoot('WelcomePage');
          console.log(false);
          resolve(false);
        })
    })
  }

  ionViewDidEnter() {
    this.callLogProvider.fetchCallLog();

    this.callLogPhoneNumbersSubscription = this.callLog.callLogPhoneNumbersObservable
      .subscribe((callLogs) => {
        this.lastCalls = [...callLogs.slice(0, this.NUMBER_OF_LAST_CALLS)]
      });

    this.messagesStorageProvider.messagesToSendObservable.subscribe((res: Message[]) => {
      this.initializeAllMessages(res);
    });

    this.usernameValiditySubscription = this.store.select(getSettingsValidity)
      .subscribe((isValid) => {
        this.areSettingsValid = isValid;
      })
  }

  private initializeAllMessages(_allMessages: Message[]) {
    const allMessages = _allMessages;
    if (allMessages.length > 0) {
      this.messages = allMessages;
      this.initializeFavoriteMessage();
    }
  }

  private initializeFavoriteMessage() {
    this.index = this.messages.findIndex(message => message.isFavorite === true);
    this.chosenMessage = this.messages[this.index];
  }

  ionViewDidLeave() {
    this.callLogPhoneNumbersSubscription.unsubscribe();
    this.usernameValiditySubscription.unsubscribe();
  }

  sendWhatsappMessage(phoneNumber: string) {
    this.sendingSmsProvider.sendMessageViaWhatsAppToPhoneNumber(this.chosenMessage, phoneNumber);
  }

  sendSmsMessage(phoneNumber: string) {
    this.sendingSmsProvider.sendMessageViaSmsAppToPhoneNumber(this.chosenMessage, phoneNumber);
  }

  makePhoneCall(phoneNumber: string) {
    this.callNumber.callNumber(phoneNumber, true);
  }

  isFavoriteMessageValid() {
    return this.messages.length > 0 &&
      this.messages.filter(message => message.isFavorite).length > 0;
  }

  getContactNameOrNumber(phoneNumber: CallDetails) {
    if ((phoneNumber.name !== null) && (phoneNumber.name !== undefined) && phoneNumber.name.length > 0) {
      return phoneNumber.name;
    } else {
      return phoneNumber.number;
    }
  }

  setPreviousIndex(index: number) {
    if (index > 0) {
      this.index = this.index - 1;
      this.setMessageToDisplayByIndex(this.index);
    }
  }

  setNextIndex(index: number) {
    if (index < (this.messages.length - 1)) {
      this.index = this.index + 1;
      this.setMessageToDisplayByIndex(this.index);
    }
  }

  setMessageToDisplayByIndex(index: number) {
    this.chosenMessage = this.messages[index];
  }

  refreshCalls() {
    this.callLogProvider.fetchCallLog();
  }

  openModal(phoneNumber: string) {
    if(!this.canMakeAttachment()){
      this.dialogs.alert(`לא ניתן ליצור קשר עקב חוסר בפרטים מזהים!`, 'הודעה');
    }else{
      let myModal = this.modalCtrl.create(ChoosePreferredAttachmentModalPage,
        {chosenMessage: this.chosenMessage, phoneNumber: phoneNumber},
        { showBackdrop: true, enableBackdropDismiss: true, cssClass:'select-modal'});
      myModal.present();
    }
  }

  canMakeAttachment(){
    return this.areSettingsValid && (this.messages.length > 0);
  }
}

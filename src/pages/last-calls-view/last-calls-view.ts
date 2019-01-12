import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

  lastCalls: CallDetails[] = [];
  callLogPhoneNumbersSubscription: Subscription;
  usernameValiditySubscription: Subscription;

  messages: Message[] = [];
  chosenMessage: Message;

  isUsernameValid: boolean = false;

  NUMBER_OF_LAST_CALLS = 10;
  index = 0;

  constructor(public navCtrl: NavController,
              private callLog: CallLogProvider,
              private sendingSmsProvider: SendingSmsProvider,
              private callLogProvider: CallLogProvider,
              public messagesStorageProvider: MessagesStorageProvider,
              private userSettingsProvider: UserSettingsProvider,
              public navParams: NavParams) {

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

    this.usernameValiditySubscription = this.userSettingsProvider.usernameValidityObservable
      .subscribe((isValid) => {
        this.isUsernameValid = isValid;
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

  isFavoriteMessageInvalid() {
    return this.messages === null || this.messages === undefined;
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
}

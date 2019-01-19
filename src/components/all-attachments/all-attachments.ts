import {Component, Input} from '@angular/core';
import {SendingSmsProvider} from "../../providers/sending-sms/sending-sms";
import {CallNumber} from "@ionic-native/call-number";
import {Message} from "../../models/Message";

/**
 * Generated class for the AllAttachmentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'all-attachments',
  templateUrl: 'all-attachments.html'
})
export class AllAttachmentsComponent {

  @Input() phoneNumber: string;
  @Input() chosenMessage: Message;

  constructor(private sendingSmsProvider: SendingSmsProvider,
              private callNumber: CallNumber) {

  }

  sendWhatsappMessage() {
    this.sendingSmsProvider.sendMessageViaWhatsAppToPhoneNumber(this.chosenMessage, this.phoneNumber);
  }

  sendSmsMessage() {
    this.sendingSmsProvider.sendMessageViaSmsAppToPhoneNumber(this.chosenMessage, this.phoneNumber);
  }

  makePhoneCall() {
    this.callNumber.callNumber(this.phoneNumber, true);
  }

}

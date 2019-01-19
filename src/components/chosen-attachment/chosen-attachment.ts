import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../state-management/app-state";
import {getChosenAttachment} from "../../state-management/settings.selector";
import {attachments, CHOOSE_WHATSAPP} from "../../utilities/constants";
import {SendingSmsProvider} from "../../providers/sending-sms/sending-sms";
import {CallNumber} from "@ionic-native/call-number";
import {Message} from "../../models/Message";

@Component({
  selector: 'chosen-attachment',
  templateUrl: 'chosen-attachment.html'
})
export class ChosenAttachmentComponent {

  attachment: attachments = CHOOSE_WHATSAPP;
  @Input() phoneNumber: string;
  @Input() chosenMessage: Message;

  constructor(private sendingSmsProvider: SendingSmsProvider,
              private callNumber: CallNumber,
              private store: Store<AppState>) {
    this.store.select(getChosenAttachment)
      .subscribe(attachment => this.attachment = attachment);
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

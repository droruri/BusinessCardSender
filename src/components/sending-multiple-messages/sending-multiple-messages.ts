import { Component } from '@angular/core';

/**
 * Generated class for the SendingMultipleMessagesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sending-multiple-messages',
  templateUrl: 'sending-multiple-messages.html'
})
export class SendingMultipleMessagesComponent {

  text: string;

  constructor() {
    console.log('Hello SendingMultipleMessagesComponent Component');
    this.text = 'Hello World';
  }

}

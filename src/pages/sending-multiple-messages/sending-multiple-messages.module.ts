import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendingMultipleMessagesPage } from './sending-multiple-messages';

@NgModule({
  declarations: [
    SendingMultipleMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(SendingMultipleMessagesPage),
  ],
})
export class SendingMultipleMessagesPageModule {}

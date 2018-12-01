import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesManagingPage } from './messages-managing';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MessagesManagingPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesManagingPage),
    TranslateModule.forChild()
  ],
})
export class MessagesManagingPageModule {}

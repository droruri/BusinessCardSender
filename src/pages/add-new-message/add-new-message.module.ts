import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewMessagePage } from './add-new-message';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AddNewMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewMessagePage),
    TranslateModule.forChild()
  ],
})
export class AddNewMessagePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastCallsViewPage } from './last-calls-view';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LastCallsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(LastCallsViewPage),
    TranslateModule.forChild()
  ],
})
export class LastCallsViewPageModule {}

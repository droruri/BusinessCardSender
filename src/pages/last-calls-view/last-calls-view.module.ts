import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastCallsViewPage } from './last-calls-view';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonsSliderComponent} from "../../components/buttons-slider/buttons-slider";

@NgModule({
  declarations: [
    LastCallsViewPage,
    ButtonsSliderComponent
  ],
  imports: [
    IonicPageModule.forChild(LastCallsViewPage),
    TranslateModule.forChild()
  ],
})
export class LastCallsViewPageModule {}

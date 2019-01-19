import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }

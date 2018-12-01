import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFromCallLogPage } from './select-from-call-log';

@NgModule({
  declarations: [
    SelectFromCallLogPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFromCallLogPage),
  ],
})
export class SelectFromCallLogPageModule {}

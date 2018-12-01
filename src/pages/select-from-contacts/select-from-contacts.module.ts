import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFromContactsPage } from './select-from-contacts';

@NgModule({
  declarations: [
    SelectFromContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFromContactsPage),
  ],
})
export class SelectFromContactsPageModule {}

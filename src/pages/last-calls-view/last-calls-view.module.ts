import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastCallsViewPage } from './last-calls-view';
import {TranslateModule} from "@ngx-translate/core";
import {ChosenAttachmentComponent} from "../../components/chosen-attachment/chosen-attachment";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    LastCallsViewPage
  ],
  imports: [
    IonicPageModule.forChild(LastCallsViewPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class LastCallsViewPageModule {}

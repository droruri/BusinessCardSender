import { NgModule } from '@angular/core';
import {ChooseAttachmentComponent} from "../components/choose-attachment/choose-attachment";
import {ChosenAttachmentComponent} from "../components/chosen-attachment/chosen-attachment";
import {CommonModule} from "@angular/common";
import { AllAttachmentsComponent } from './all-attachments/all-attachments';
import {IonicModule} from "ionic-angular";


@NgModule({
	declarations: [ChooseAttachmentComponent, ChosenAttachmentComponent,
    AllAttachmentsComponent],
	imports: [CommonModule, IonicModule],
	exports: [ChooseAttachmentComponent, ChosenAttachmentComponent,
    AllAttachmentsComponent]
})
export class ComponentsModule {}

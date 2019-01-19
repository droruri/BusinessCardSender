import {Component, EventEmitter, Output} from '@angular/core';
import {attachments, CHOOSE_WHATSAPP} from "../../utilities/constants";
import {Store} from "@ngrx/store";
import {AppState} from "../../state-management/app-state";
import {SettingsActions} from "../../state-management/settings.actions";
import {getChosenAttachment, getSettingsValidity} from "../../state-management/settings.selector";


@Component({
  selector: 'choose-attachment',
  templateUrl: 'choose-attachment.html'
})
export class ChooseAttachmentComponent {

  attachment: attachments = CHOOSE_WHATSAPP;
  areSettingsValid: boolean = false;

  @Output() chosenAttachment: EventEmitter<attachments> = new EventEmitter<attachments>();

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(getChosenAttachment)
      .subscribe(attachment => {
        this.attachment = attachment
      });

    this.store.select(getSettingsValidity)
      .subscribe((areSettingsValid: boolean) => {
        this.areSettingsValid = areSettingsValid
      });
  }

  ionViewDidEnter() {

  }

  setNewAttachment(attachment: attachments) {
    this.attachment = attachment;
    this.chosenAttachment.emit(attachment);
  }

}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AppState} from "../../state-management/app-state";
import {Store} from "@ngrx/store";
import {SettingsActions} from "../../state-management/settings.actions";
import {getReferenceId, getXSiteUsername} from "../../state-management/settings.selector";
import {Dialogs} from "@ionic-native/dialogs";
import {ATTACHMENT, REFERENCE_ID, XSITE_USERNAME} from "./SETTINGS_IDENTIFIERS";
import {attachments, CHOOSE_WHATSAPP} from "../../utilities/constants";

/*
  Generated class for the UserSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSettingsProvider {

  username: string = '';
  referenceId: number = null;

  constructor(public http: HttpClient,
              private storage: Storage,
              private store: Store<AppState>,
              private dialogs: Dialogs,
              private settingsActions: SettingsActions) {
    this.loadSettings();
    this.store.select(getXSiteUsername)
      .subscribe((username) => {
        this.username = username;
      });

    this.store.select(getReferenceId)
      .subscribe((referenceId) => {
        this.referenceId = referenceId;
      })

  }

  storeValueByKeyInLocalStorage(value: string, key: string) {
    return new Promise((resolve, reject) => {
      this.storage.set(key, value)
        .then(() => resolve())
        .catch(() => reject());
    })
  }

  loadValueByKeyFromLocalStorage(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.get(key)
        .then((value) => resolve(value))
        .catch(() => reject());
    });
  }

  private setUsername(storedXsiteUsername: string) {
    this.store.dispatch(this.settingsActions.storeXSiteUsername(storedXsiteUsername));

  }

  private setRefId(refId: number) {
    this.store.dispatch(this.settingsActions.storeReferenceId(refId));
  }

  private setAttachment(attachment: attachments) {
    if (attachment === null || attachment === undefined) {
      this.store.dispatch(this.settingsActions.storeChosenAttachment(CHOOSE_WHATSAPP));
    } else {
      this.store.dispatch(this.settingsActions.storeChosenAttachment(attachment));
    }
  }



  saveSettings(username: string, referenceId: number, attachment: attachments) {
    return Promise.all([
      this.storeValueByKeyInLocalStorage(username, XSITE_USERNAME),
      this.storeValueByKeyInLocalStorage(referenceId.toString(), REFERENCE_ID),
      this.storeValueByKeyInLocalStorage(attachment, ATTACHMENT)
    ]).then(() => {
      this.setUsername(username);
      this.setRefId(referenceId);
      this.setAttachment(attachment);
      this.dialogs.alert(`השינויים נשמרו בהצלחה`, 'הודעה');
    })
  }

  loadSettings() {
    return Promise.all([
      this.loadValueByKeyFromLocalStorage(XSITE_USERNAME),
      this.loadValueByKeyFromLocalStorage(REFERENCE_ID),
      this.loadValueByKeyFromLocalStorage(ATTACHMENT)
    ]).then((result: [string, number, attachments]) => {
      this.setUsername(result[0]);
      this.setRefId(result[1]);
      this.setAttachment(result[2]);
    });
  }

}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AppState} from "../../state-management/app-state";
import {Store} from "@ngrx/store";
import {SettingsActions} from "../../state-management/settings.actions";
import {getReferenceId, getXSiteUsername} from "../../state-management/settings.selector";
import {Dialogs} from "@ionic-native/dialogs";
import {REFERENCE_ID, XSITE_USERNAME} from "./SETTINGS_IDENTIFIERS";

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
    this.store.dispatch(this.settingsActions.storeSettingsValidity(UserSettingsProvider.areSettingsValid(this.username, refId)));
  }

  private static areSettingsValid(username: string, refId: number) {
    return username !== null &&
      username !== undefined &&
      username.length > 0 && refId !== null &&
      refId !== undefined;
  }

  saveSettings(username: string, referenceId: number) {
    return Promise.all([
      this.storeValueByKeyInLocalStorage(username, XSITE_USERNAME),
      this.storeValueByKeyInLocalStorage(referenceId.toString(), REFERENCE_ID)
    ]).then(() => {
      this.setUsername(username);
      this.setRefId(referenceId);
      this.dialogs.alert(`השינויים נשמרו בהצלחה`, 'הודעה');
    })
  }

  loadSettings() {
    return Promise.all([
      this.loadValueByKeyFromLocalStorage(XSITE_USERNAME),
      this.loadValueByKeyFromLocalStorage(REFERENCE_ID)
    ]).then((result: [string, number]) => {
      this.setUsername(result[0]);
      this.setRefId(result[1]);
    }).then(() => {
        this.store.dispatch(this.settingsActions.storeSettingsValidity(UserSettingsProvider.areSettingsValid(this.username, this.referenceId)));
      })
  }

}

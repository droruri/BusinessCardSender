import {Injectable} from '@angular/core';
import {ActionModel} from "./action.model";

@Injectable()
export class SettingsActions {

  static STORE_XSITE_USERNAME = 'STORE_XSITE_USERNAME';
  storeXSiteUsername(username: string): ActionModel {
    return {
      type: SettingsActions.STORE_XSITE_USERNAME,
      payload: username
    }
  }

  static STORE_SETTINGS_VALIDITY = 'STORE_SETTINGS_VALIDITY';
  storeSettingsValidity(isValid: boolean): ActionModel {
    return {
      type: SettingsActions.STORE_SETTINGS_VALIDITY,
      payload: isValid
    }
  }

  static STORE_REFERENCE_ID = 'STORE_REFERENCE_ID';
  storeReferenceId(id: number): ActionModel {
    return {
      type: SettingsActions.STORE_REFERENCE_ID,
      payload: id
    }
  }

}

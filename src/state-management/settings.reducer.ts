
import {SettingsState} from "./app-state";
import {SettingsActions} from "./settings.actions";

const initialState:SettingsState = {
  xSiteUsername: '',
  referenceId: 0,
  areSettingsValid: false
};

export function settingsReducer(state = initialState, action): SettingsState {
  switch (action.type) {
    case SettingsActions.STORE_XSITE_USERNAME:
      return {
        xSiteUsername: action.payload,
        areSettingsValid:state.areSettingsValid,
        referenceId:state.referenceId
      };
    case SettingsActions.STORE_REFERENCE_ID:
      return {
        xSiteUsername: state.xSiteUsername,
        areSettingsValid:state.areSettingsValid,
        referenceId: action.payload
      };
    case SettingsActions.STORE_SETTINGS_VALIDITY:
      return {
        xSiteUsername: state.xSiteUsername,
        areSettingsValid: action.payload,
        referenceId:state.referenceId
      };
    default:
      return state;
  }
}

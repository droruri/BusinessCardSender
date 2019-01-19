
import {SettingsState} from "./app-state";
import {SettingsActions} from "./settings.actions";
import {CHOOSE_WHATSAPP} from "../utilities/constants";

const initialState:SettingsState = {
  xSiteUsername: '',
  referenceId: 0,
  areSettingsValid: false,
  chosenAttachment: CHOOSE_WHATSAPP
};

export function settingsReducer(state = initialState, action): SettingsState {
  switch (action.type) {
    case SettingsActions.STORE_XSITE_USERNAME:
      return {
        xSiteUsername: action.payload,
        areSettingsValid: areSettingsValid(action.payload, state.referenceId),
        referenceId:state.referenceId,
        chosenAttachment: state.chosenAttachment
      };
    case SettingsActions.STORE_REFERENCE_ID:
      return {
        xSiteUsername: state.xSiteUsername,
        areSettingsValid: areSettingsValid(state.xSiteUsername, action.payload),
        referenceId: action.payload,
        chosenAttachment: state.chosenAttachment
      };
    case SettingsActions.STORE_SETTINGS_VALIDITY:
      return {
        xSiteUsername: state.xSiteUsername,
        areSettingsValid: action.payload,
        referenceId:state.referenceId,
        chosenAttachment: state.chosenAttachment
      };
    case SettingsActions.STORE_CHOSEN_ATTACHMENT:
      return {
        xSiteUsername: state.xSiteUsername,
        areSettingsValid: state.areSettingsValid,
        referenceId:state.referenceId,
        chosenAttachment: action.payload
      };
    default:
      return state;
  }
}

function areSettingsValid(username: string, refId: number) {
  return username !== null &&
    username !== undefined &&
    username.length > 0 &&
    refId !== null &&
    refId !== undefined &&
    refId.toString().length > 0;
}

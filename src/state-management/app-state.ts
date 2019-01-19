import {settingsReducer} from "./settings.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {attachments} from "../utilities/constants";

export interface AppState {
  settingsState: SettingsState;
}

export interface SettingsState {
  xSiteUsername: string;
  referenceId: number;
  chosenAttachment: attachments;
  areSettingsValid:boolean;
}

export const reducers: ActionReducerMap<AppState> = {
  settingsState: settingsReducer
};

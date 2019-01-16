import {settingsReducer} from "./settings.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  settingsState: SettingsState;
}

export interface SettingsState {
  xSiteUsername: string;
  referenceId: number;
  areSettingsValid:boolean;
}

export const reducers: ActionReducerMap<AppState> = {
  settingsState: settingsReducer
};

import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState, SettingsState} from "./app-state";

export const getSettings = createFeatureSelector<SettingsState>('settingsState');

export const getXSiteUsername = createSelector(
  getSettings,
  (state: SettingsState) => state.xSiteUsername
);

export const getSettingsValidity = createSelector(
  getSettings,
  (state: SettingsState) => state.areSettingsValid
);

export const getReferenceId = createSelector(
  getSettings,
  (state: SettingsState) => state.referenceId
);

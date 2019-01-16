import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserSettingsProvider} from "../../providers/user-settings/user-settings";
import {AppState} from "../../state-management/app-state";
import {Store} from "@ngrx/store";
import {getReferenceId, getXSiteUsername} from "../../state-management/settings.selector";
import {Dialogs} from "@ionic-native/dialogs";


/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  page: string = 'main';

  username: string = '';
  referenceId: number = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              private store: Store<AppState>,
              private dialogs: Dialogs,
              private userSettingsProvider: UserSettingsProvider) {
  }

  ionViewDidLoad() {
    this.store.select(getXSiteUsername)
      .subscribe((username) => {
        this.username = username;
      });

    this.store.select(getReferenceId)
      .subscribe((referenceId) => {
        this.referenceId = referenceId;
      })
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render

    this.page = this.navParams.get('page') || this.page;
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

  saveSettings() {
    this.userSettingsProvider.saveSettings(this.username, this.referenceId);
  }
}

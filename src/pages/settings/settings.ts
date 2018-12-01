import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserSettingsProvider} from "../../providers/user-settings/user-settings";


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

  username:string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
              private userSettingsProvider:UserSettingsProvider) {
  }

  ionViewDidLoad() {
    this.userSettingsProvider.storedXsiteUsernameObservable.subscribe((username) => {
      this.username = username;
    })
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render

    this.page = this.navParams.get('page') || this.page;
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

  saveSettings(){
    this.userSettingsProvider.storeUserNameInLocalStorage(this.username);
  }
}

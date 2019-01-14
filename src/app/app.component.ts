import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {TranslateService} from '@ngx-translate/core';
import {Config, Nav, Platform, ToastController} from 'ionic-angular';

import {FirstRunPage} from '../pages';

@Component({
  templateUrl: "./app.component.html"
})
export class MyApp {
  rootPage = FirstRunPage;
  counter = 0;
  toastFadingTimeInMilliseconds = 3000;

  @ViewChild(Nav) nav: Nav;

  pages: any[];

  constructor(private translate: TranslateService,
              private platform: Platform,
              private config: Config,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.performVisualActionsOnInitialize();
      this.translatePageTitles(translate);

      platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => {
            this.counter = 0;
          }, this.toastFadingTimeInMilliseconds)
        } else {
          // console.log("exitapp");
          platform.exitApp();
        }
      }, 0)
    });
    this.initTranslate();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "לחץ שוב ליציאה",
      duration: this.toastFadingTimeInMilliseconds,
      position: "middle"
    });
    toast.present();
  }

  private translatePageTitles(translate: TranslateService) {
    translate.get([
      "ADD_NEW_MESSAGE",
      "MESSAGES_MANAGING",
      "LAST_CALLS_VIEW",
      "SETTINGS_TITLE"
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.pages = [
          {title: values.LAST_CALLS_VIEW, component: 'LastCallsViewPage'},
          {title: values.ADD_NEW_MESSAGE, component: 'AddNewMessagePage'},
          {title: values.MESSAGES_MANAGING, component: 'MessagesManagingPage'},
          {title: values.SETTINGS_TITLE, component: 'SettingsPage'},
        ];
      });
  }

  private performVisualActionsOnInitialize() {
    this.statusBar.backgroundColorByHexString("#488aff");
    this.splashScreen.hide();
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.

    this.setLanguageAndDirectionForApplication();

    this.translateBackButton();

  }

  private translateBackButton() {
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  private setLanguageAndDirectionForApplication() {
    this.translate.setDefaultLang('he');

    this.platform.setDir('rtl', true);
  }

  /*private setLanguageByDeviceLanguage(browserLang) {
    if (browserLang) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en');
    }
  }*/

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

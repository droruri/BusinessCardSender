import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a addNewMessage/showLastCalls page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) { }

  addNewMessage() {
    this.navCtrl.setRoot('AddNewMessagePage', {}, {animate: true, direction: 'forward'});
  }

  showLastCalls() {
    this.navCtrl.setRoot('LastCallsViewPage', {}, {animate: true, direction: 'forward'});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ContactsProvider} from "../../providers/contacts/contacts";
import {Observable} from "rxjs";
import {PhoneNumber} from "../../models/PhoneNumber";

/**
 * Generated class for the SelectFromContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-from-contacts',
  templateUrl: 'select-from-contacts.html',
})
export class SelectFromContactsPage {

  phoneNumbers:Observable<PhoneNumber[]> = new Observable<PhoneNumber[]>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private contactsProvider:ContactsProvider) {
  }

  ionViewDidLoad() {
    this.phoneNumbers = this.contactsProvider.contactsPhoneNumbersObservable;
  }

}

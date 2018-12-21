import {Injectable} from '@angular/core';
import {CallDetails} from "../../models/CallDetails";
import {BehaviorSubject, Observable} from "rxjs";
/*import {ContactFieldType, Contacts} from "@ionic-native/contacts";*/
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {PermissionsProvider} from "../permissions/permissions";

@Injectable()
export class ContactsProvider {

  contacts: any[] = [];
  phoneNumbers: CallDetails[] = [];

  private contactsPhoneNumbersSubject: BehaviorSubject<CallDetails[]> = new BehaviorSubject<CallDetails[]>(null);
  contactsPhoneNumbersObservable: Observable<CallDetails[]> = this.contactsPhoneNumbersSubject.asObservable();

  constructor(/*private contactsNative: Contacts,*/
              private permissionsProvider: PermissionsProvider,
              private androidPermissions: AndroidPermissions) {
    this.permissionsProvider.askUserToUsePermission(this.androidPermissions.PERMISSION.READ_CONTACTS)
      .then(() => {
        this.getAllContacts();
      });
  }

  getAllContacts() {
    /*const REQUIRED_CONTACT_FIELDS:ContactFieldType[] = ['name', 'phoneNumbers'];
    const FIND_CONTACTS_OPTIONS = {filter: "", multiple: true};

    this.contactsNative.find(REQUIRED_CONTACT_FIELDS, FIND_CONTACTS_OPTIONS)
      .then(contacts => {
        this.contacts = contacts;
        this.extractAndObserveAllPhoneNumbersOfContacts();
      });*/
  }

  /*private extractAndObserveAllPhoneNumbersOfContacts() {
    this.contacts.forEach((contact) => {
      this.insertAllPhoneNumbersOfContact(contact);
    });

    this.contactsPhoneNumbersSubject.next(this.phoneNumbers);
  }*/

  /*private insertAllPhoneNumbersOfContact(contact) {
    contact.phoneNumbers.forEach(phoneNumber => {
      this.insertNewPhoneNumberIfNotExist(phoneNumber, contact);
    });
  }*/

  /*private insertNewPhoneNumberIfNotExist(phoneNumber, contact) {
    if (!this.isPhoneNumberAlreadyInArray(phoneNumber)) {
      this.phoneNumbers.push({name: contact.name.displayname, number: phoneNumber.value});
    }
  }*/


}

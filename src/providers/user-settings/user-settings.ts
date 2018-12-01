import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Dialogs} from "@ionic-native/dialogs";
import {BehaviorSubject, Observable} from "rxjs";

/*
  Generated class for the UserSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSettingsProvider {

  storedXsiteUsername: string;

  private storedXsiteUsernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  storedXsiteUsernameObservable: Observable<string> = this.storedXsiteUsernameSubject.asObservable();

  private usernameValiditySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  usernameValidityObservable: Observable<boolean> = this.usernameValiditySubject.asObservable();

  constructor(public http: HttpClient,
              private storage: Storage,
              private dialogs: Dialogs) {
    this.loadFavoriteMessageFromLocalStorage()
  }

  storeUserNameInLocalStorage(username: string) {
    this.storage.set("storedXsiteUsername", username)
      .then(() => {
        this.setAndSendUsername(username);
        this.dialogs.alert(`שם המשתמש נשמר בהצלחה!`, 'הודעה');
      })
      .catch(() => this.setAndSendUsername(''));
  }

  loadFavoriteMessageFromLocalStorage() {
    this.storage.get("storedXsiteUsername")
      .then((storedXsiteUsername) => this.setAndSendUsername(storedXsiteUsername))
      .catch(() => this.setAndSendUsername(''));
  }

  private setAndSendUsername(storedXsiteUsername) {
    this.storedXsiteUsername = storedXsiteUsername;
    this.storedXsiteUsernameSubject.next(this.storedXsiteUsername);
    this.usernameValiditySubject.next(this.isUsernameValid());
  }

  isUsernameValid() {
    return this.storedXsiteUsername !== null &&
      this.storedXsiteUsername !== undefined &&
      this.storedXsiteUsername.length > 0;
  }

}

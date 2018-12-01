import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AndroidPermissions} from "@ionic-native/android-permissions";

/*
  Generated class for the PermissionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PermissionsProvider {

  constructor(public http: HttpClient, private androidPermissions: AndroidPermissions) {

  }

  askUserToUsePermission(permission: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.androidPermissions.checkPermission(permission)
        .then(() => {
          this.androidPermissions.requestPermission(permission)
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => reject());
    });
  }

}

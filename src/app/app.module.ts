import { HttpClient, HttpClientModule } from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { User, Api } from '../providers';
import { MyApp } from './app.component';
import { MessagesStorageProvider } from '../providers/messages-storage/messages-storage';
import {Dialogs} from "@ionic-native/dialogs";
import { SendingSmsProvider } from '../providers/sending-sms/sending-sms';
import { CallLogProvider } from '../providers/call-log/call-log';
import { ContactsProvider } from '../providers/contacts/contacts';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {CallLog} from "@ionic-native/call-log";
import {SMS} from "@ionic-native/sms";
import { PermissionsProvider } from '../providers/permissions/permissions';
import {SocialSharing} from "@ionic-native/social-sharing";
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import {ComponentsModule} from "../components/components.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../state-management/app-state";
import {SettingsActions} from "../state-management/settings.actions";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    StoreModule.forRoot(reducers)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    Dialogs,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MessagesStorageProvider,
    SendingSmsProvider,
    CallLogProvider,
    ContactsProvider,
    AndroidPermissions,
    CallLog,
    SMS,
    SocialSharing,
    PermissionsProvider,
    UserSettingsProvider,
    SettingsActions
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {AndroidCallLog} from "../../models/AndroidCallLog";
import {BehaviorSubject, Observable} from "rxjs";
import {PhoneNumber} from "../../models/PhoneNumber";
import {CallLog, CallLogObject} from "@ionic-native/call-log";
import {Platform} from "ionic-angular";

/*
  Generated class for the CallLogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallLogProvider {

  phoneNumbers:PhoneNumber[]=[];
  callLogs:AndroidCallLog[]=[];
  lastCall: AndroidCallLog = null;

  DAY_IN_MILLISECONDS = 1000*60*60*24;

  isLastCallWasPerformedSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private lastCallSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  lastCallObservable: Observable<any> = this.lastCallSubject.asObservable();
  private callLogPhoneNumbersSubject: BehaviorSubject<PhoneNumber[]> = new BehaviorSubject<PhoneNumber[]>([]);
  callLogPhoneNumbersObservable: Observable<PhoneNumber[]> = this.callLogPhoneNumbersSubject.asObservable();

  constructor(private callLog: CallLog,public plt :Platform){
  }

  fetchCallLog() {
    return new Promise((resolve, reject) => {
      const lastDay = this.getLastDayTimestamp();
      const filters: CallLogObject[] = [{name: "date", value: lastDay.toString(), operator: "!="}];

      this.callLog.hasReadPermission()
        .then(() => {
          this.callLog.getCallLog(filters)
            .then(callLogs => {
              this.onGettingCallLogs(callLogs);
              resolve();
            })
            .catch(() => reject());
        })
        .catch(() => reject());
    })
  }

  private onGettingCallLogs(callLogs) {
    this.callLogs = callLogs.sort(this.sortCallsByDescDate());
    this.observeAndSendAllPhoneNumbersOfCallLog();
    this.observeIfThereIsLastCallAndSetLastCallIfExist();
  }

  private observeIfThereIsLastCallAndSetLastCallIfExist() {
    const isCallsArrayNotEmpty = (this.callLogs.length > 0);
    this.isLastCallWasPerformedSubject.next(isCallsArrayNotEmpty);
    if(isCallsArrayNotEmpty){
      this.setLastCall(this.callLogs[0]);
    }
  }

  getLastDayTimestamp(): number {
    return ((new Date()).getTime() - this.DAY_IN_MILLISECONDS);
  }

  private setLastCall(lastCall) {
    this.lastCall = lastCall;
    this.lastCallSubject.next(this.lastCall);
  }

  private sortCallsByDescDate() {
    return (a: AndroidCallLog, b: AndroidCallLog) => Number(b.date) - Number(a.date);
  }

  private observeAndSendAllPhoneNumbersOfCallLog() {
    this.callLogs.forEach(
      (callLog) => this.phoneNumbers.push({name: callLog.name, number: callLog.number}));
    this.callLogPhoneNumbersSubject.next(this.phoneNumbers);
  }
}

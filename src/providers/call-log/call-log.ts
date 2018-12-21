import { Injectable } from '@angular/core';
import {AndroidCallLog} from "../../models/AndroidCallLog";
import {BehaviorSubject, Observable} from "rxjs";
import {CallDetails} from "../../models/CallDetails";
import {CallLog, CallLogObject} from "@ionic-native/call-log";
import {Platform} from "ionic-angular";

/*
  Generated class for the CallLogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallLogProvider {

  phoneNumbers:CallDetails[]=[];
  callLogs:AndroidCallLog[]=[];
  lastCall: AndroidCallLog = null;

  DAY_IN_MILLISECONDS = 1000*60*60*24;

  isLastCallWasPerformedSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private lastCallSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  lastCallObservable: Observable<any> = this.lastCallSubject.asObservable();
  private callLogPhoneNumbersSubject: BehaviorSubject<CallDetails[]> = new BehaviorSubject<CallDetails[]>([]);
  callLogPhoneNumbersObservable: Observable<CallDetails[]> = this.callLogPhoneNumbersSubject.asObservable();

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
    this.phoneNumbers = this.removeDuplicateNumbersFromArray(this.phoneNumbers);
    this.callLogPhoneNumbersSubject.next(this.phoneNumbers);
  }

  private removeDuplicateNumbersFromArray(callDetails:CallDetails[]){
    return callDetails.filter((item, pos) => {
      return this.getNumbersFromCallDetails(callDetails)
        .indexOf(item.number) == pos
    })
  }

  private getNumbersFromCallDetails(callDetails:CallDetails[]){
    return callDetails.map(callDetail=>callDetail.number);
  }
}

import { Injectable } from '@angular/core';
import {Message} from "../../models/Message";
import {BehaviorSubject, Observable} from "rxjs";
import { Storage } from '@ionic/storage'
import {Dialogs} from "@ionic-native/dialogs";

@Injectable()
export class MessagesStorageProvider {

  private messagesToSend:Message[] = [];
  private favoriteMessage:Message = {id:null, content:''};
  private messagesToSendSubject:BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  private favoriteMessageSubject:BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

  public messagesToSendObservable:Observable<Message[]> = this.messagesToSendSubject.asObservable();
  public favoriteMessageObservable:Observable<Message> = this.favoriteMessageSubject.asObservable();

  constructor(private storage: Storage, private dialogs:Dialogs){
    this.loadAllMessagesFromLocalStorage();
    this.loadFavoriteMessageFromLocalStorage();
  }

  loadAllMessagesFromLocalStorage() {
    this.storage.get("storedMessages")
      .then((storedMessages) => {
        this.initializeMessagesToSend(storedMessages);
        this.messagesToSendSubject.next(this.messagesToSend);
      })
      .catch(()=> this.storeMessagesInLocalStorage([]));
  }

  private storeMessagesInLocalStorage(storedMessages) {
    this.initializeMessagesToSend(storedMessages);
    this.storage.set("storedMessages", JSON.stringify(this.messagesToSend)).then(() => {
      this.messagesToSendSubject.next(this.messagesToSend);
    });
  }

  loadFavoriteMessageFromLocalStorage() {
    this.storage.get("favoriteMessage")
      .then((favoriteMessage) => {
        this.initializeFavoriteMessageFromLocalStorage(favoriteMessage);
        this.favoriteMessageSubject.next(this.favoriteMessage);
      })
      .catch(()=>this.storeFavoriteMessageInLocalStorage(null));
  }

  private storeFavoriteMessageInLocalStorage(favoriteMessage) {
    this.initializeFavoriteMessageFromLocalStorage(favoriteMessage);
    this.storage.set("favoriteMessage", JSON.stringify(this.favoriteMessage)).then(() => {
      this.favoriteMessageSubject.next(this.favoriteMessage);
    });
  }

  private initializeMessagesToSend(storedMessages) {
    if (storedMessages !== null) {
      this.messagesToSend = JSON.parse(storedMessages);
    } else {
      this.messagesToSend = [];
    }
  }

  private initializeFavoriteMessageFromLocalStorage(favoriteMessage) {
    if (favoriteMessage !== null) {
      this.favoriteMessage = JSON.parse(favoriteMessage);
    } else {
      this.favoriteMessage = {id: null, content: ''};
    }
  }

  addMessageToSend(content){
    let maxId = this.getNextSequenceId();
    const newMessage = {id: maxId+1, content: content};
    this.messagesToSend = [...this.messagesToSend, newMessage];
    this.updateMessagesInLocalStorage(this.messagesToSend)
      .then(()=>this.popSuccessAlertForAddingNewMessage());
  }

  private getNextSequenceId() {
    let maxId;
    if (this.messagesToSend.length > 0) {
      maxId = Math.max(...this.messagesToSend.map((message) => message.id));
    } else {
      maxId = 1;
    }
    return maxId;
  }

  private updateMessagesInLocalStorage(messages: Message[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.set("storedMessages", JSON.stringify(messages))
        .then(() => {
          resolve();
          this.messagesToSendSubject.next(messages);
        })
        .catch(()=>reject())  ;
    })
  }

  private popSuccessAlertForAddingNewMessage(){
    this.dialogs.alert(`ההודעה נוספה בהצלחה!`,'הודעה');
  }

  private popSuccessAlertForDeletingMessage(){
    this.dialogs.alert(`ההודעה נמחקה בהצלחה!`,'הודעה');
  }

  setFavoriteMessageInLocalStorage(favoriteMessage:Message){
    this.storage.set("favoriteMessage", JSON.stringify(favoriteMessage)).then(()=>{
      this.favoriteMessageSubject.next(favoriteMessage);
    });
  }

  deleteMessageById(messageToDeleteId:number){
    const messagesWithoutMessageToDelete = this.messagesToSend.filter((message)=>message.id !== messageToDeleteId);
    this.messagesToSend = [...messagesWithoutMessageToDelete];
    this.updateMessagesInLocalStorage(this.messagesToSend)
      .then(()=>this.popSuccessAlertForDeletingMessage());
  }

}

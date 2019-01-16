import {Injectable} from '@angular/core';
import {Message} from "../../models/Message";
import {BehaviorSubject, Observable} from "rxjs";
import {Storage} from '@ionic/storage'
import {Dialogs} from "@ionic-native/dialogs";

@Injectable()
export class MessagesStorageProvider {

  private messagesToSend: Message[] = [];
  private messagesToSendSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  private favoriteMessageSubject: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

  public messagesToSendObservable: Observable<Message[]> = this.messagesToSendSubject.asObservable();
  public favoriteMessageObservable: Observable<Message> = this.favoriteMessageSubject.asObservable();

  constructor(private storage: Storage, private dialogs: Dialogs) {
    this.loadAllMessagesFromLocalStorage();
  }

  private loadAllMessagesFromLocalStorage() {
    this.storage.get("storedMessages")
      .then((storedMessages) => {
        this.initializeMessagesToSend(storedMessages);
        this.emitMessagesSubjects();
      })
      .catch(() => this.storeMessagesInLocalStorage([]));
  }

  private storeMessagesInLocalStorage(storedMessages) {
    this.initializeMessagesToSend(storedMessages);
    this.storage.set("storedMessages", JSON.stringify(this.messagesToSend)).then(() => {
      this.emitMessagesSubjects();
    });
  }

  private initializeMessagesToSend(storedMessages) {
    if (storedMessages !== null) {
      this.messagesToSend = JSON.parse(storedMessages);
    } else {
      this.messagesToSend = [];
    }
  }

  addMessageToSend(content) {
    const newMessage = this.initializeNewMessage(content);
    this.messagesToSend = [...this.messagesToSend, newMessage];
    this.updateMessagesInLocalStorage(this.messagesToSend)
      .then(() => this.popSuccessAlertForAddingNewMessage());
  }

  private initializeNewMessage(content): Message {
    let maxId = this.getNextSequenceId();
    return {id: maxId, content: content, isFavorite: this.messagesToSend.length === 0};
  }

  private getNextSequenceId() {
    const messagesIDs = this.messagesToSend.map((message) => message.id);
    return (this.messagesToSend.length > 0) ? Math.max(...messagesIDs) + 1 : 1;
  }

  private updateMessagesInLocalStorage(messages: Message[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.set("storedMessages", JSON.stringify(messages))
        .then(() => {
          resolve();
          this.emitMessagesSubjects();
        })
        .catch(() => reject());
    })
  }

  private popSuccessAlertForAddingNewMessage() {
    this.dialogs.alert(`ההודעה נוספה בהצלחה!`, 'הודעה');
  }

  private popSuccessAlertForDeletingMessage() {
    this.dialogs.alert(`ההודעה נמחקה בהצלחה!`, 'הודעה');
  }

  updateFavoriteMessage(message: Message) {
    this.setMessageAsFavorite(message);
    this.updateMessagesInLocalStorage([...this.messagesToSend]);
  }

  deleteMessageById(messageToDeleteId: number) {
    return new Promise((resolve, reject) => {
      this.deleteMessageAndSetFavorite(messageToDeleteId);
      this.updateMessagesInLocalStorage([...this.messagesToSend])
        .then(() => {
          this.popSuccessAlertForDeletingMessage();
          resolve()
        })
        .catch(()=>reject());
    })
  }

  private deleteMessageAndSetFavorite(messageToDeleteId: number) {
    const messagesWithoutMessageToDelete = this.messagesToSend.filter((message) => message.id !== messageToDeleteId);
    this.messagesToSend = [...messagesWithoutMessageToDelete];
    if (this.messagesToSend.length > 0) {
      this.setMessageAsFavorite(this.messagesToSend[0]);
    }
  }

  setMessageAsFavorite(message: Message) {
    this.messagesToSend.forEach(message => message.isFavorite = false);
    const newFavoriteIndex = this.messagesToSend.indexOf(message);
    this.messagesToSend[newFavoriteIndex].isFavorite = true;
  }

  getFavoriteMessage() {
    return this.messagesToSend.filter(message => message.isFavorite)[0];
  }

  emitMessagesSubjects() {
    this.messagesToSendSubject.next(this.messagesToSend);
    this.favoriteMessageSubject.next(this.getFavoriteMessage());
  }
}

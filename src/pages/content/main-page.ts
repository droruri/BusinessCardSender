import {Component, OnDestroy} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {MessagesStorageProvider} from "../../providers/messages-storage/messages-storage";
import {Message} from "../../models/Message";
import {SocialSharing} from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: 'main-page',
  templateUrl: 'main-page.html'
})
export class MainPage implements OnDestroy {

  favoriteMessage: Message = {id: null, content: '', isFavorite: false};
  messages: Message[] = [];

  constructor(public navCtrl: NavController,
              private socialSharing: SocialSharing,
              private messagesStorageProvider: MessagesStorageProvider) {
  }

  ionViewDidLoad() {
    this.messagesStorageProvider.favoriteMessageObservable
      .subscribe((message) => {
        this.favoriteMessage = message;
      });

    this.messagesStorageProvider.messagesToSendObservable
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  sendMessageToLastCaller() {

  }

  whatsAppShare() {

  }

  regularShare() {
    this.socialSharing.share(`${this.favoriteMessage.content}`, null, null, null);
  }


  ngOnDestroy() {

  }
}

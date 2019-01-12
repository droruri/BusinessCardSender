import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MessagesStorageProvider} from "../../providers/messages-storage/messages-storage";
import {Message} from "../../models/Message";
import {Dialogs} from "@ionic-native/dialogs";
import {OK_RESULT} from "../../utilities/constants";

/**
 * Generated class for the MessagesManagingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages-managing',
  templateUrl: 'messages-managing.html',
})
export class MessagesManagingPage implements OnInit {

  favoriteMessage: Message = null;
  messagesToSend: Message[] = [];

  constructor(private dialogs: Dialogs,
              public navCtrl: NavController,
              public navParams: NavParams,
              private _messagesStorageProvider: MessagesStorageProvider) {

  }

  ngOnInit(): void {
    this._messagesStorageProvider.messagesToSendObservable
      .subscribe((messages: Message[]) => {
        this.messagesToSend = messages;
      });

    this._messagesStorageProvider.favoriteMessageObservable
      .subscribe((message) => {
        this.favoriteMessage = message;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesManagingPage');
  }

  deleteMessage(message: Message) {
    this.dialogs.confirm(`ההודעה תימחק, האם אתה בטוח?`, 'אזהרה').then(result => {
      if (result === OK_RESULT) {
        this._messagesStorageProvider.deleteMessageById(message.id)
          .then(() => {
            if (message.id === this.favoriteMessage.id) {
              this.setFavoriteMessage(this.messagesToSend[0])
            }
          });
      }
    });
  }

  setFavoriteMessage(message: Message) {
    this._messagesStorageProvider.updateFavoriteMessage(message);
  }

  isMessageNotFavorite(message) {
    if (this.favoriteMessage !== null) {
      return (this.favoriteMessage.id !== message.id)
    }
    return true;
  }
}

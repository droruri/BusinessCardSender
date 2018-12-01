import {Component, OnDestroy} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {SendingSmsProvider} from "../../providers/sending-sms/sending-sms";
import {MessagesStorageProvider} from "../../providers/messages-storage/messages-storage";
import {Message} from "../../models/Message";
import {CallLogProvider} from "../../providers/call-log/call-log";
import {SocialSharing} from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: 'main-page',
  templateUrl: 'main-page.html'
})
export class MainPage implements OnDestroy{

  favoriteMessage:Message = {id:null, content:''};
  messages:Message[] = [];

  constructor(public navCtrl: NavController,
              private sendingSmsProvider:SendingSmsProvider,
              private callLogProvider:CallLogProvider,
              private socialSharing:SocialSharing,
              private messagesStorageProvider:MessagesStorageProvider) {
  }

  ionViewDidLoad() {
    this.messagesStorageProvider.favoriteMessageObservable
      .subscribe((message)=>{
        this.favoriteMessage = message;
      });

    this.messagesStorageProvider.messagesToSendObservable
      .subscribe((messages)=>{
        this.messages = messages;
      });


  }

  sendMessageToLastCaller(){
    this.callLogProvider.fetchCallLog()
      .then(()=>this.sendingSmsProvider.sendSmsFavoriteMessageToLastCaller());
  }

  whatsAppShare(){
    this.callLogProvider.fetchCallLog()
      .then(()=>this.sendingSmsProvider.sendFavoriteMessageViaWhatsAppToLastCaller());
  }

  regularShare(){
    this.socialSharing.share(`${this.favoriteMessage.content}`, null, null, null);
  }


  ngOnDestroy(){

  }
}

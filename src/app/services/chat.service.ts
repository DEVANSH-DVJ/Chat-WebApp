import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  username: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        // this.afAuth.authState.subscribe(auth => {
        //   if (auth !== undefined && auth !== null) {
        //     this.user = auth;
        //   }
        // });
    }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = "test@example.com";
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      // username: this.username,
      username: "test-user",
      email: email });

    console.log('Called sendMessage().')
  }

  getMessages(): AngularFireList<ChatMessage> {
    console.log("odawwosnd");
    return this.db.list('/messages', ref => {
      return ref.limitToLast(25).orderByKey()
    });
  }

  getMessagesObservable(): any {
    console.log("123");
    return this.db.list('/messages', ref => {
      return ref.limitToLast(25).orderByKey()
    }).valueChanges();
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}

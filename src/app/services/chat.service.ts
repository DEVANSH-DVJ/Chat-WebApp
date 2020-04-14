import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable()
export class ChatService {

  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  email: string;
  username: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router) {
        this.afAuth.currentUser.then(data => {this.username = data.displayName; this.email = data.email; console.log(data); })
          .catch(error => {this.router.navigate(['login']); console.log("155");});
    }

  checkIfUndefined(): boolean {
    if (this.username === undefined || this.username === null) {
      this.router.navigate(['login']);
      console.log("155");
      return true;
    }
    else return false;
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessages();
    if (this.checkIfUndefined() === false) {
      this.chatMessages.push({
        message: msg,
        timeSent: timestamp,
        username: this.username,
        email: this.email });
      console.log('Called sendMessage().')
    }
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('/messages', ref => {
      return ref.limitToLast(25).orderByKey()
    });
  }

  getMessagesObservable(): any {
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

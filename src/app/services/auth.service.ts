import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs/Observable';
// import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newUser: any;
  value: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
      this.value = "1245";
  }

  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.displayName
        });
        const status = 'online';
        console.log(userCredential.user.uid);
        this.setUserData(user.email, user.displayName, status, userCredential.user.uid);
        this.router.navigate(['chat'])
      })
      .catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string, uid: string): void {
      const path = `users/${uid}`;
      const data = {
        email: email,
        displayName: displayName,
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }


}

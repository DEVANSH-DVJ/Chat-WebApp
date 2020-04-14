import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  err: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
  }

  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        userCredential.user.updateProfile({
          displayName: user.displayName
        });
        const status = 'online';
        console.log(userCredential.user.uid);
        this.setUserData(user.email, user.displayName, status, userCredential.user.uid);
        this.login(user);
      })
      .catch(error => {this.err = error;});
    return this.err;
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

  login(user) {
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        if (userCredential) {
          const status = 'online';
          console.log(userCredential.user.uid);
          this.setUserStatus(status, userCredential.user.uid);
          this.router.navigate(['chat']);
        }
      })
      .catch(error => {this.err = error;});
    return this.err;
  }

  setUserStatus(status: string, uid: string): void {
    const path = `users/${uid}`;
    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }


  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

}

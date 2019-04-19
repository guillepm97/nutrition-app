import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

interface User {
  name: string;
  surname: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string;

  constructor(private ngZone: NgZone,
              private router: Router,
              public alertController: AlertController,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.ngZone.run(() => this.router.navigate(['/tabs']));
      } else {
        this.ngZone.run(() => this.router.navigate(['/login']));
      }
    });
  }

  getCurrentUser(): Observable<User> {
    return this.afs.doc<User>(`users/${this.uid}`).valueChanges();
  }

  async signUp(name: string, surname: string, email: string, password: string, type: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let uid: string = await this.createUser(email, password);

      if (uid == '') {
        return resolve(false);
      }

      if (await this.addAttributes(uid, name, surname, type)) {
        resolve(true);
      } else {
        await this.deleteUser();
        resolve(false);
      }
    });
  }

  async createUser(email: string, password: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          resolve(credential.user.uid);
        })
        .catch((error) => {
          resolve('');
          this.presentAlert(error.message);
        });
    });
  }

  async addAttributes(uid: string, name: string, surname: string, type: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

      const data: User = {
        name: name,
        surname: surname,
        type: type
      }

      await userRef.set(data)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          this.presentAlert(error.message);
        });
    });
  }

  async deleteUser() {
    let $user = await this.afAuth.user.subscribe(async (user) => {
      if (user) {
        await user.delete()
          .catch((error) => {
            this.presentAlert(error.message);
          });
        $user.unsubscribe();
      }
    });
  }

  async signIn(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.presentAlert(error.message);
      });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
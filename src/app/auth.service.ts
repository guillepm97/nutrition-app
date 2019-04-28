import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { User } from './user';
import { UserService } from './user.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private ngZone: NgZone,
              private router: Router,
              public alertController: AlertController,
              public userService: UserService,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userService.setCurrentUserId(user.uid);
        this.ngZone.run(() => this.router.navigate(['/tabs']));
      } else {
        this.ngZone.run(() => this.router.navigate(['/login']));
      }
    });
  }

  async signUp(picture: string, name: string, surname: string, email: string, password: string, type: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let uid: string = await this.createUser(email, password);

      if (uid == '') {
        return resolve(false);
      }

      if (await this.addAttributes(uid, picture, name, surname, type)) {
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

  async addAttributes(uid: string, picture: string, name: string, surname: string, type: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

      const isNutritionist = type == 'nutritionist';

      const data: User = {
        picture: picture,
        name: name,
        surname: surname,
        type: type,
        dailyCalories: isNutritionist ? 0 : 2450,
        takenCalories: 0,
        exerciseCalories: 0,
        remainingCalories: isNutritionist ? 0 : 2450,
        stepsGoal: isNutritionist ? 0 : 10000,
        stepCount: 0,
        selectedNutritionist: '',
        currentNutritionist: '',
        listAccepted: [],
        listPending: [],
        feed: []
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

  async signOut() {
    await this.afAuth.auth.signOut()
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

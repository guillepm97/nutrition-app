import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserId } from './user';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid: string;

  constructor(public alertController: AlertController,
              public afs: AngularFirestore) { }

  setCurrentUserId(id: string) {
    this.uid = id;
  }

  getCurrentUser(): Observable<User> {
    return this.afs.doc<User>(`users/${this.uid}`).valueChanges();
  }

  getNutritionists(name: string): Observable<UserId[]> {
    let nutritionistCollection = this.afs.collection<User>('users', ref => {
      if (name == '') {
        return ref.where('type', '==', 'nutritionist')
      } else {
        return ref.where('type', '==', 'nutritionist').where('name', '==', name);
      }
    });

    return nutritionistCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  setSelectedNutritionist(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.uid}`);

      await userRef.update({ selectedNutritionist: id })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          this.presentAlert(error.message);
        });
    });
  }

  requestNutritionist(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const userRef: AngularFirestoreDocument = this.afs.doc(`users/${id}`);

      await userRef.update({ listPending: firestore.FieldValue.arrayUnion(this.uid) })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          this.presentAlert(error.message);
        });
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

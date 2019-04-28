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

  getUserById(id: string): Observable<User> {
    return this.afs.doc<User>(`users/${id}`).valueChanges();
  }

  getCurrentUser(): Observable<User> {
    return this.getUserById(this.uid);
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

  acceptClient(clientId: string, index: number) {
    let nutritionistRef = this.afs.collection('users').doc(this.uid);
    nutritionistRef.get().toPromise().then(doc => {
      if (doc.exists) {
        let nutritionist = doc.data();
        for (let user of nutritionist.listPending) {
          if (user == clientId) {
            nutritionist.listAccepted.push(user);
            nutritionist.listPending.splice(index, 1);
            nutritionistRef.set(<User> nutritionist);
          }
        }
      }
    }).catch(error => {
      this.presentAlert(error.message);
    });
    this.setCurrentNutritionist(clientId);
  }

  setCurrentNutritionist(clientId: string) {
    let nutritionistId = this.uid;
    let clientRef = this.afs.collection('users').doc(clientId);
    clientRef.get().toPromise().then(doc => {
      if (doc.exists) {
        let client = doc.data();
        client.currentNutritionist = nutritionistId;
        clientRef.set(<User> client);
      }
    }).catch(error => {
      this.presentAlert(error.message);
    });
  }

  setClientData(id: string, dailyCalories: number) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${id}`);

    userRef.update({ dailyCalories: dailyCalories })
      .catch((error) => {
        this.presentAlert(error.message);
      });
  }

  setClientFeed(id: string, dailyCalories: number) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);

    userRef.update({ feed: firestore.FieldValue.arrayUnion(`Your daily
      calorie intake has been set to ${dailyCalories} by your nutritionist.`) })
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

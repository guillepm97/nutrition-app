import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './user';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid: string;

  constructor(public afs: AngularFirestore) { }

  getCurrentUser(): Observable<User> {
    return this.afs.doc<User>(`users/${this.uid}`).valueChanges();
  }

  setCurrentUserId(id: string) {
    this.uid = id;
  }
}

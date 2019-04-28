import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Food } from './food';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  constructor(public afs: AngularFirestore) { }

  getFood(name: string): Observable<Food[]> {
    let foodCollection = this.afs.collection<Food>('food', ref => {
      if (name == '') {
        return ref;
      } else {
        return ref.where('name', '==', name);
      }
    });

    return foodCollection.valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentData, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  async saveUserInfo(userInfo: any) {
    const currentUser = await this.fireAuth.currentUser;
    currentUser.updateProfile({ displayName: userInfo.name });
    this.firestore.collection('users').doc(currentUser.uid).set(
      { id: currentUser.uid, email: userInfo.email, name: userInfo.name } as DocumentData);
  }

  subscribeToChanges(collection: string, query: QueryFn): Observable<any> {
    return this.firestore.collection(collection, query).valueChanges()
  }
  update(collection: string, data: DocumentData, documentUid?: string) {
    return this.firestore.collection(collection).doc(documentUid).update(data)
  }
  getUserById(userId: string) {
    return this.firestore.collection('users', ref => ref.where('id', '==', userId))
      .get().toPromise();
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  async saveUserInfo(userInfo: any) {
    const currentUser = await this.fireAuth.currentUser;
    currentUser.updateEmail(userInfo.email);
    currentUser.updateProfile({ displayName: userInfo.name });
    this.firestore.collection('users').doc(currentUser.uid).set(
      { id: currentUser.uid, email: userInfo.email, name: userInfo.name, phone: userInfo.phone } as DocumentData);
  }

  subscribeToChanges(collection: string) {
    return this.firestore.collection(collection).valueChanges()
  }
}

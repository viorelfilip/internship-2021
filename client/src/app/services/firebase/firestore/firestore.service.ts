import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth, private storage: StorageService) { }

  async saveUserInfo(userInfo: any) {
    const currentUser = await this.fireAuth.currentUser;
    currentUser.updateEmail(userInfo.email);
    currentUser.updateProfile({ displayName: userInfo.name });
    this.firestore.collection('users').doc(currentUser.uid).set(
      { id: currentUser.uid, email: userInfo.email, name: userInfo.name, phone: userInfo.phone } as DocumentData);
  }
  async addRequest(request: RequestModel) {
    const currentUser = await this.fireAuth.currentUser;
    request.userId = currentUser.uid;
    const doc = await this.firestore.collection('requests').doc();
    request.id = doc.ref.id;
    console.log({request});
    await doc.set(request as DocumentData).then(console.warn);
    return request.id;
    }
      
  subscribeToChanges(collection: string) {
    return this.firestore.collection(collection).valueChanges()
  }
}

export interface RequestModel {
  id?: string,
  title: string,
  userId?: string,
  consultantId?: string,
  requestStamp?: Date,
  appointmentStamp?: Date,
  resolutionStamp?: Date,
  status: number,
  description?: string,
  photoUrl?: string
}
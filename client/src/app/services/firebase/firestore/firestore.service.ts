import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentData, QueryFn } from '@angular/fire/firestore';
import { RequestModel } from 'src/app/pages/home/models/request-model';
import { StorageService } from '../../storage/storage.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
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
    await doc.set(request as DocumentData);
    return request.id;
  }
  async updateRequest(request: RequestModel) {
    this.firestore.collection('requests').doc(request.id).update(
      request as DocumentData);
  }
  subscribeToChanges(collection: string, query: QueryFn): Observable<any> {
    return this.firestore.collection(collection, query).valueChanges();
  }
}

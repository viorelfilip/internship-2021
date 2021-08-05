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
  async addRequest() {
    this.firestore.collection('requests').doc().set(
      { userId: (await this.storage.get('userId')), stamp: new Date() } as DocumentData);
  }

  async addToInProcess(){
    this.firestore.collection('requests').doc().set(
      { userId: (await this.storage.get('userId')), stamp: new Date() } as DocumentData);
  }

  subscribeToChanges(collection: string) {
    return this.firestore.collection(collection).valueChanges();
  }
  subscribeToChangesPending(collection: string) {
    return this.firestore.collection(collection, ref => ref.where('status', '==', 0)).valueChanges();
  }


  subscribeToChangesInProcess(collection: string){
    return this.firestore.collection(collection, ref => ref.where('status', '==', 1) ).valueChanges();
  }

  getThatUser(collection: string, aidi: string){
    return this.firestore.collection(collection, ref => ref.where('id', '==', aidi)).valueChanges();
  }

  async setStatus(request: any, stat: number/*, consId: string*/){
    console.log("aidi recuest: ", request.id);
    this.firestore.collection('requests', ref => ref.where('id', '==', request.id)).doc(request.id).update(
      { status: stat, resolutionStamp: new Date()/*, consultantId: consId*/} as DocumentData);
      //intreaba aici de ce daca am pus request.id in doc() merge

  }

  //pot sa folosesc where ca sa where ca sa separ ce am nevoie sa extrag
  //o fac in functie de status

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) {
  }
  isSignedIn() {
    return new Promise<boolean>((resolve, reject) => {
      this.fireAuth.authState.subscribe((res) => {
        if (res) {
          resolve(true);
        } else {
          reject(false);
        }

      })
    })
  }
  async logout() {
    await this.fireAuth.signOut();
  }
  async getCurrentUser(): Promise<firebase.User> {
    return new Promise<firebase.User>((resolve, reject) => {
      this.fireAuth.authState.subscribe((res) => {
        if (res) {
          resolve(res);
        } else {
          reject('User is not authenticated');
        }
      })
    });
  }
  async updateProfile(model: any) {
    const currentUser = await this.fireAuth.currentUser;
    await currentUser.updateProfile({ displayName: model.displayName });
  }

  register(userInfo: any): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);
  }
  login(userInfo: any): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(userInfo.email, userInfo.password);
  }
}

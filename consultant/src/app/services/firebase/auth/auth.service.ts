import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email!:String;

  private confirmationResult: firebase.auth.ConfirmationResult;
  constructor(private fireAuth: AngularFireAuth) { }

  signInWithMailAndPassword(email: string, password:string) {
    this.email = email;
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(email, password)
        .then((confirmationResult) => {
          console.log(confirmationResult)
          resolve(confirmationResult);
        }).catch((error) => {
          reject(error.message || error);
        });
    });
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
          console.warn("user autentificat");
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

  enterVerificationCode(code: string) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then((result) => {
        resolve(result.user);
      }).catch((error) => {
        reject(error.message || error);
      });
      
    });
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password)
        .then((confirmationResult) => {
          resolve(confirmationResult);
        }).catch((error) => {
          reject(error.message || error);
        });
    });
  }

}

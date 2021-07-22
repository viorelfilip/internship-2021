import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private confirmationResult: firebase.auth.ConfirmationResult;
  constructor(private fireAuth: AngularFireAuth) { }

  signInWithMailAndPassword(email: string, password:string) {
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

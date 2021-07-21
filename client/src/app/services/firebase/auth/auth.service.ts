import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private confirmationResult: firebase.auth.ConfirmationResult;
  constructor(private fireAuth: AngularFireAuth) { }

  signInWithPhoneNumber(recaptchaVerifier: firebase.auth.ApplicationVerifier, phoneNumber: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
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

}

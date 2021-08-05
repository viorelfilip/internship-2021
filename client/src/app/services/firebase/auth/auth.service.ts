import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseApp } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";
import { DocumentData } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private confirmationResult: firebase.auth.ConfirmationResult;
  constructor(private fireAuth: AngularFireAuth) { }

  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
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
  public async enterVerificationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        resolve(result.user);
      }).catch((error) => {
        reject(error.message || error);
      });
    });
  }

}
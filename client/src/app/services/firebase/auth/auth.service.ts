import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private confirmationResult: firebase.auth.ConfirmationResult;

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
    })
  }
  async updateProfile(model: any) {
    const currentUser = await this.fireAuth.currentUser;
    await currentUser.updateProfile({ displayName: model.displayName });
  }
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import * as firebase from 'firebase';

import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  model = {
    phone: undefined,
    name: undefined,
    email: undefined,
    termsAndConditions: false
  }
  recaptchaVerifier: firebase.default.auth.RecaptchaVerifier;

  constructor(private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private authService: AuthService,
    private firestoreService: FirestoreService) {
  }

  async ionViewDidEnter() {

    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container', {
      callback: () => {

      },
      'expired-callback': () => {
      }
    });
  }
  ngOnInit() {

  }
  async continue() {
    if (!this.isValid()) {
      this.presentToast('Completati campurile!');
      return;
    }
    if (!this.model.termsAndConditions) {
      this.presentToast('Trebuie sa acceptati termenii si conditile!');
      return;
    }
    this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+40' + this.model.phone)
      .then(
        this.smsVerification
      ).catch(err => this.presentToast(err, 5000));
  }

  private async presentToast(message: string, duration: number = 2000) {
    (await this.toastController.create({
      message: message,
      duration: duration
    })).present();
  }

  private isValid(): boolean {
    return this.model.name && this.model.email && this.model.phone;
  }

  private navigateToHome() {
    this.router.navigate(['home']);
  }

  private async smsVerification() {
    const alert = await this.alertController.create({
      header: 'We have sent you a sms with the verification code',
      backdropDismiss: false,
      mode: 'md',
      inputs: [
        {
          name: 'code',
          type: 'number',
          placeholder: 'Verification code',
        }
      ],
      buttons: [{
        text: 'Ok',
        handler: (res) => {
          this.authService.enterVerificationCode(res.code).then(
            async (userData: firebase.default.UserInfo) => {
              await this.storage.set('userId', userData.uid)
              this.firestoreService.saveUserInfo(this.model);
              this.navigateToHome();
            }
          ).catch(err => this.presentToast(err, 5000));
        }
      }
      ]
    });
    await alert.present();
  }

}

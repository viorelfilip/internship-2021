import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  model = {
    name: undefined,
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
    termsAndConditions: false
  }

  constructor(private authService: AuthService,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private storage: StorageService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
    if (!this.isValid()) {
      this.presentToast('Completati campurile!');
      return
    }
    if (this.model.password !== this.model.passwordConfirmation) {
      this.presentToast('Parolele nu coincid!');
      return;
    }
    if (!this.model.termsAndConditions) {
      this.presentToast('Trebuie sa acceptati termenii si conditile!');
      return;
    }
    this.authService.register(this.model).then((res) => {
      this.firestoreService.saveUserInfo(this.model);
      this.storage.set('userId', res.user.uid);
      this.router.navigate(['/'])

    }).catch(err => this.presentToast(err, 5000));
  }
  private isValid(): boolean {
    return this.model.email && this.model.name && this.model.password && this.model.passwordConfirmation;
  }
  private async presentToast(message: string, duration: number = 2000) {
    (await this.toastController.create({
      message: message,
      duration: duration
    })).present();
  }
}

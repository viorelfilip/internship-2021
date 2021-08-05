import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/firebase/auth/auth.service';
import { FirestoreService } from '../services/firebase/firestore/firestore.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model = { email: '', password: '' };
  constructor(private router: Router, private storage: StorageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private auth: AuthService,
    private firestoreService: FirestoreService) { }

  async ngOnInit() {
    this.model = await this.storage.get('login');
    this.model = this.model || { email: '', password: '' };
    console.log({ email: this.model.email });
    if(this.model.email && this.model.password) this.logMeIn();
  }

  async logMeIn() {
    this.auth.signInWithMailAndPassword(this.model.email, this.model.password)
      .then(async x => {
        this.router.navigate(['/home']);
        await this.storage.set('login', this.model);
      }).catch(err => {
        alert("Nu s-a putut conecta")
        console.error(err)
      })

  }

  regis() {

    this.router.navigate(['/register'])
  }

}

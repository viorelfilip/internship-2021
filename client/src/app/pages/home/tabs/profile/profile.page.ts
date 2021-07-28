import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: firebase.User = {} as firebase.User;
  isEditable: boolean = false;
  model: any;
  constructor(private authService: AuthService, private router: Router, private toastConstroller: ToastController) {
  }

  ionViewWillEnter() {
    this.getUserData();
  }
  async ngOnInit() {
  }
  private getUserData() {
    this.authService.getCurrentUser().then((user) => {
      this.userData = user;
      this.model = { ...user as any };
    });
  }
  toggleEditable() {
    this.isEditable = !this.isEditable
  }
  getInputStateColor(value) {
    return value ? null : 'danger';
  }
  getToggleIcon() {
    return this.isEditable ? 'close-outline' : 'create-outline';
  }
  isValid() {
    return this.model.displayName
  }
  async update() {
    if (this.isValid()) {
      await this.authService.updateProfile(this.model);
      await this.getUserData();
    } else {
      (await this.toastConstroller.create({
        message: "Check fields",
        duration: 2000
      })).present();
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['register']);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private fireAuth: AngularFireAuth, private storage: StorageService, private router: Router) {
  }
  async canActivate(): Promise<boolean> {
    const registerData = await this.storage.get('registerData');
    let user = await this.fireAuth.currentUser;
    if (!user) {
      console.warn('inititializare lipsă.... rutare la login');
      this.router.navigate(['login']);
      return false;
    }
    console.log(user.email, user);
    return true;
  }
}

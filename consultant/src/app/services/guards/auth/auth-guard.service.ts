import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../firebase/auth/auth.service';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private fireAuth: AuthService, private router: Router) {
  }

  async canActivate(router): Promise<boolean> {
    console.log(router.routeConfig.path);
    try {
      await this.fireAuth.isSignedIn();
      if (router.routeConfig.path !== 'home') {
        this.router.navigate(['home']);
        return false;
      }
      return true;
    } catch (err) {
      if (router.routeConfig.path !== 'login') {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
  }
}

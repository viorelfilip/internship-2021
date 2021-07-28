import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AuthService } from '../../firebase/auth/auth.service';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private fireAuth: AuthService) {
  }

  async canActivate(router): Promise<boolean> {
    try {
      await this.fireAuth.isSignedIn();
      if (router.routeConfig.path !== 'home') {
        this.router.navigate(['home']);
        return false;
      }
      return true;
    } catch (err) {
      if (router.routeConfig.path !== 'register') {
        this.router.navigate(['register']);
        return false;
      }
      return true;
    }
  }
}

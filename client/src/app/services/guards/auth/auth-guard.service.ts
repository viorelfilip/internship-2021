import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    const session = await this.storage.get('userId');
    console.log('userId', session);
    if (!session) {
      this.router.navigate(['/register']);
      return false;
    }
    return true;
  }
}
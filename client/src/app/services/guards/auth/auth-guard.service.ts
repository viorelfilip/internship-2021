import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private storage: StorageService, private router: Router) { 

  }
  async canActivate():Promise<boolean> {
    const registerData = await this.storage.get('registerData')
    if(!registerData) {
      console.warn('initializare lipsa.... rutare la register');
      this.router.navigate(['register']);
      return false;
    }
    console.log({registerData});
      return true;
    
  }
}

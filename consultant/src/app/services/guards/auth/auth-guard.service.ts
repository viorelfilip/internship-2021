import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private storage: StorageService, private router: Router) { }
  async canActivate(): Promise<boolean> {
    if(!(await this.storage.get('registerData'))){
      this.router.navigate(['register']);
      return false;
    } 
    return true;
  }
}

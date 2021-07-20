import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  model = { nume: '', telefon: '', email: '' };
  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {
  }
  
  async register() {
    console.log(this.model);
    await this.storage.set('registerData', this.model);
    this.router.navigate(['home']);
  }
}

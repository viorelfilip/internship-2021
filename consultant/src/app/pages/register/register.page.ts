import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  model = {email: '', parola: ''}
  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {
  }
  async register() {
    console.log(this.model);
    // await this.storage.set("registerData", {nume: 'Vlad', telefon: '0722334455', email: 'test@email.com'});
    this.router.navigate(['home'])
  }
}
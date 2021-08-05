import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model = {email:'', password: ''}
  constructor (private router: Router, private storage:StorageService ) { }

  ngOnInit() {
  }

  logMeIn(){
    this.storage.set('registerData', this.model);
    this.router.navigate(['/home'])
  }

}

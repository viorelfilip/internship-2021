import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model = {
    email: undefined,
    password: undefined,
  }
  private visibility: boolean = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }
  register() {
    this.router.navigate(['register']);
  }
  private isValid() {
    return this.model.email && this.model.password;
  }
  getType() {
    return this.visibility ? 'text' : 'password';
  }
  getIcon(): string {
    return this.visibility ? 'eye-outline' : 'eye-off-outline'
  }
  toggleVisibility() {
    this.visibility = !this.visibility;
  }
  login() {
    if (this.isValid())
      this.auth.login(this.model).then((res) => {
        this.router.navigate(['home']);
      }).catch(console.error)
  }
}

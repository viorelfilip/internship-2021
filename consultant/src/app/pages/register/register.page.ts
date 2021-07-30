import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],

})


export class RegisterPage implements OnInit {
  show: boolean = false;
  constructor(private router: Router,
    private storage: StorageService,
    private auth: AuthService) { }
  model = {
    email: "",
    parola: "",
    parolaConfirm: "",
    telefon: ""
  }
  get minLenghtClass() { return this.model.parola.length > 7 ? 'success' : 'danger' };
  get lowercaseClass() { return /[a-z]/.test(this.model.parola) ? 'success' : 'danger' };
  get uppercaseClass() { return /[A-Z]/.test(this.model.parola) ? 'success' : 'danger' };
  get hasNumberClass() { return /\d/.test(this.model.parola) ? 'success' : 'danger' };

  next() {
    this.router.navigate(['/login']);
  }
  homepage() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }
  firebaseError = "";
  emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  passwordpattern = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
  phonepattern = /^[0-9]{10}$/;

  password() {
    this.show = !this.show;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  register() {
    this.auth
      .createUserWithEmailAndPassword(this.model.email, this.model.parola)
      .then(() => this.router.navigate(['home']))
      .catch(err => {
        console.error({ err });
      })
  }
}

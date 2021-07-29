import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],

})


export class RegisterPage implements OnInit {
  show: boolean = false;
  constructor(private route: Router, private alertController: AlertController) { }
  model = {
    email: "",
    parola: "",
    telefon:""
  }
  next() {
    this.route.navigate(['/login']);
  }
  homepage() {
    this.route.navigate(['/home']);
  }

  ngOnInit() {
  }
  eroareFirebase = "Ceva lipseste";
  emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  passwordpattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
  phonepattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"

  password() {
    this.show = !this.show;
}}

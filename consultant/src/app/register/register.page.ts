import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  model = {email: '', password: ''}
  confirmation = {password: ''}
  error : String
  constructor (private router: Router, private storage:StorageService,
    private auth:AuthService ) { }

  ngOnInit() {
  }

  registerMe(){
    if (this.model.password === this.confirmation.password){
      //this.storage.set('registerData', this.model);
      this.auth.createUserWithEmailAndPassword(this.model.email, this.model.password)
      .then(x => {
        this.router.navigate(['/home'])
      }).catch(err => {
        alert("Contul nu s-a creat")
        console.error(err)
      })
      
    }else{
      this.error = "Invalid password confirmation";
    }
  }


}

import { Component } from '@angular/core';
import { FirestoreService } from '../services/firebase/firestore/firestore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { AuthService } from '../services/firebase/auth/auth.service';
//import { CallNumber } from '@ionic-native/call-number';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public requests: any[]
  public inProcess: any[]
  public waiting: any[]
  public email:string
  public lungimeCoada: number;
  public users: any[]
  public phoneNumber: number;
  currentUser: any;

  constructor(private fs: FirestoreService,private route: ActivatedRoute,
    private router: Router, private fsa: AuthService) {

    fs.subscribeToChangesPending("requests").subscribe(x=>{
      //console.log("debug aici: ", x)
      this.requests = x;
    })
    fs.subscribeToChangesInProcess("requests").subscribe(y=>{
      console.log("inProgress: ", y);
      this.inProcess = y;
    })
  }

  ngOnInit(){
      this.fsa.getCurrentUser().then(data => {this.currentUser = data;
        console.log("id current user: ", this.currentUser.email);});
  }

  takeTask(request : any){
    
    console.log("id current user: ", this.currentUser.id);
    this.fs.setStatus(request, 1);
    this.fs.subscribeToChangesPending("requests").subscribe(x=>{
      //console.log("debug aici: ", x)
      this.requests = x;
    })
    this.fs.subscribeToChangesInProcess("requests").subscribe(y=>{
      this.inProcess = y;
    })

    this.fs.getThatUser("users", request.userId).subscribe(z=>{
      console.log("userii: ", z);
      this.users = z;
    })
    console.log("Ze phone: ", this.phoneNumber);

  }

  /*finishTask(request : any){
    
    this.fs.setStatus(request);
    this.fs.subscribeToChangesPending("requests").subscribe(x=>{
      //console.log("debug aici: ", x)
      this.requests = x;
    })
    this.fs.subscribeToChangesInProcess("requests").subscribe(y=>{
      this.inProcess = y;
    })

    this.fs.getThatUser("users", request.userId).subscribe(z=>{
      console.log("userii: ", z);
      this.users = z;
    })
    console.log("Ze phone: ", this.phoneNumber);

  }

  call(){
  }*/

}

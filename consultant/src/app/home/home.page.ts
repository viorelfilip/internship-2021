import { Component } from '@angular/core';
import { FirestoreService } from '../services/firebase/firestore/firestore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/firebase/auth/auth.service';

//import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pendingRequests: any[]
  public request: any = {};
  public inProcess: any[]
  public waiting: any[]
  public email: string
  public lungimeCoada: number;
  public user: any = {};
  public phoneNumber: number;
  currentUser: any;
  img = 'https://www.bankrate.com/2021/03/29162835/car-crash-stats-featured.jpg?auto=webp&optimize=high&crop=16:9&width=912';
  get pendingInfo() { return 'așteaptă de 17 minute'; }
  get queLength() { return this.pendingRequests ? this.pendingRequests.length : 0 }
  constructor(private fs: FirestoreService, private route: ActivatedRoute,
    private router: Router, private fsa: AuthService) {

    fs.subscribeToChangesPending("requests").subscribe(x => {
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0);
      this.pendingRequests = x
        .filter((e: any) => e.requestStamp)
        .map((e: any) => (e.requestStamp = new Date(e.requestStamp.seconds * 1000)) && e)
        .filter((e: any) => e.requestStamp.getTime() > today.getTime())
        .sort((a: any, b: any) => a.requestStamp < b.requestStamp ? -1 : 1);
      // console.log(this.pendingRequests);
      this.request = this.pendingRequests[0] || {};
      if (this.request) {
        this.fs.getThatUser("users", this.request.userId).subscribe(user => {
          console.log({ user });
          this.user = user[0] || {};
        })
      }
    })
    fs.subscribeToChangesInProcess("requests").subscribe(y => {
      console.log("inProgress: ", y);
      this.inProcess = y;
    })
  }

  ngOnInit() {
    this.fsa.getCurrentUser().then(data => {
      this.currentUser = data;
      console.log("id current user: ", this.currentUser.email);
    });
  }

  takeTask(request: any) {

    console.log("id current user: ", this.currentUser.id);
    this.fs.setStatus(request, 1);
    this.fs.subscribeToChangesPending("requests").subscribe(x => {
      //console.log("debug aici: ", x)
      this.pendingRequests = x;
    })
    this.fs.subscribeToChangesInProcess("requests").subscribe(y => {
      this.inProcess = y;
    })

    this.fs.getThatUser("users", request.userId).subscribe(z => {
      console.log("userii: ", z);
      this.user = z;
    })
    console.log("Ze phone: ", this.phoneNumber);

  }
  call() {
    this.fs
      .setStatus(this.request, 1)
      .then(() => {
        alert('call' + this.user.phone)
      })
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

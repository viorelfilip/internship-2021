import { Component } from '@angular/core';
import { FirestoreService } from '../services/firebase/firestore/firestore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/firebase/auth/auth.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  images = [
    "https://www.bankrate.com/2021/03/29162835/car-crash-stats-featured.jpg?auto=webp&optimize=high&crop=16:9&width=912",
    "https://media.npr.org/assets/img/2021/06/08/20210607_184450-2e240569e1dc66bcff31f74bc88fb1d5c301686b-s1800-c85.webp",
    "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/03/boxborough-car-boston-t.jpg",
    "https://www.masslive.com/resizer/smNoxFJdn_Vzk9dAbmSTzRKx0d0=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/3ZVJO5ZPHFHM7O634SMC7LSXRU.jpg",
    "https://www.belfasttelegraph.co.uk/news/northern-ireland/northern-ireland-school-formal-off-as-car-crash-teen-fights-for-life-38236435.html#"
  ];
  public pendingRequests: any[]
  public request: any = {};
  public inProcess: any[]
  public waiting: any[]
  public email: string
  public lungimeCoada: number;
  public user: any = {};
  public phoneNumber: number;
  currentUser: any;
  img = '';
  get pendingInfo() { return 'așteaptă de 17 minute'; }
  get queLength() { return this.pendingRequests ? this.pendingRequests.length : 0 }
  constructor(private fs: FirestoreService, private route: ActivatedRoute,
    private router: Router, private fsa: AuthService, private callNumber: CallNumber) {

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
      let index = this.images.indexOf(this.img);
      if (~index) {
        this.img = this.images[++index % this.images.length];
      } else {
        this.img = this.images[0];
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


  call() {
    if (this.request.id)
      this.fs
        .setStatus(this.request, 1)
        .then(() => {
          this.callNumber
          .callNumber(this.user.phone, true)
          .then(console.log)
          .catch(console.error)
        })
  }

  /*
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
  finishTask(request : any){
    
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

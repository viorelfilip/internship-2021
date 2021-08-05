import { Component } from '@angular/core';
import { FirestoreService } from '../services/firebase/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public requests: any[]

  constructor(private fs: FirestoreService) {

    fs.subscribeToChanges("requests").subscribe(x=>{
      console.log("debug aici: ", x)
      this.requests = x;
    })

  }



}

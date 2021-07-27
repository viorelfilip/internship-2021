import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { AuthService } from "../../services/firebase/auth/auth.service";
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.subscribeToChanges('requests').subscribe((data) => {
      console.log(data);
    });
  }
  addRequest() {
    this.firestoreService.addRequest();
  }

}
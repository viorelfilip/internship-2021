import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { AuthService } from "../services/firebase/auth/auth.service";
import { StorageService } from '../services/storage/storage.service';
import { PhotoService } from '../services/photo/photo.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
      public photoService: PhotoService,
      private firestoreService: FirestoreService,
      ) 
      {
    // this.firestoreService.subscribeToChanges('requests').subscribe((data) => {
    //   // console.log(data);
    // });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  addRequest() {
    this.firestoreService.addRequest();
  }

}
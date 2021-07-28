import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RequestStatuses } from 'src/app/helpers/enums/request-statuses';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { FirebaseStorageService } from 'src/app/services/firebase/storage/firebase-storage.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { RequestModel } from '../../models/request-model';

@Component({
  selector: 'app-request-consultant',
  templateUrl: './request-consultant.page.html',
  styleUrls: ['./request-consultant.page.scss'],
})
export class RequestConsultantPage implements OnInit {

  requestModel: RequestModel = {
    title: undefined,
    status: RequestStatuses.pending,
  }
  imageBlob: Blob;
  imageBase64: string;

  constructor(private firestoreService: FirestoreService,
    private toastController: ToastController,
    private photoService: PhotoService,
    private storage: FirebaseStorageService) {

  }
  async addRequest() {
    this.requestModel.requestStamp = new Date();

    if (this.imageBlob) {
      this.storage.uploadFile(this.imageBlob).then(async ref => {
        console.log(await ref.getDownloadURL());
        const url = await ref.getDownloadURL();
        this.addToFirestore(url);
      })
    } else {
      this.addToFirestore();
    }

  }
  async addToFirestore(photourl?: string) {
    if (photourl) {
      this.requestModel.photoUrl = photourl;

    }
    this.firestoreService.addRequest(this.requestModel).then(() => {
      this.requestModel = {
        title: undefined,
        status: RequestStatuses.pending,
      }
      this.presentToast({ message: 'Request added successfuly', duration: 2000 });
    });
  }
  ngOnInit() {
  }
  async presentToast(options: { message: string, duration: number }) {
    const toast = await this.toastController.create({
      message: options.message,
      duration: options.duration
    });
    await toast.present();
  }
  takePicture() {
    this.photoService.takePhoto().then(res => {
      this.imageBlob = this.base64ToBlob(res.base64String);
      this.imageBase64 = 'data:image/jpeg;base64,' + res.base64String;
    }).catch(console.error)
  }
  getImage() {
    let src = 'assets/placeholder.jpeg';
    if (this.imageBase64) {
      return this.imageBase64;
    }
    return src;
  }
  private base64ToBlob(base64String: string) {
    const rawData = atob(base64String);
    const bytes = new Array(rawData.length);
    for (var x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    return new Blob([arr], { type: 'image/jpg' });
  }
  private blobToBase64(blob: Blob) {
    return new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(base64data);
        res(base64data.toString())
      }
      reader.readAsDataURL(blob);
    })
  }
}

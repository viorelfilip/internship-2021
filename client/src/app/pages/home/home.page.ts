import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { AuthService } from "../../services/firebase/auth/auth.service";
import { StorageService } from '../../services/storage/storage.service';
import { AlertController} from '@ionic/angular';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private firestoreService: FirestoreService, public alertController: AlertController, private navCtrl: NavController) {
    this.firestoreService.subscribeToChanges('requests').subscribe((data) => {
      console.log(data);
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmare',
      message: 'Solicitarea dumneavoastra a fost inregistrata cu succes. Un operator va lua legatura cu dvs. in urmatoarele 15 min.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateRoot('/test');
          }
        }
      ],
      
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  addRequest() {
    this.firestoreService.addRequest();
  }
  

}
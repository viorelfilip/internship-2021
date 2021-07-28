import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { RequestStatuses } from 'src/app/helpers/enums/requests-status';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { RequestModel } from '../../models/request-model';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.page.html',
  styleUrls: ['./pending-requests.page.scss'],
})
export class PendingRequestsPage implements OnInit {

  requests: [] = [];
  isLoading: boolean = true;
  constructor(private firestoreService: FirestoreService,
    private alertController: AlertController,
    private authService: AuthService) {

  }

  async ngOnInit() {
    this.firestoreService.subscribeToChanges('requests', ref => ref
      .where('status', '==', 0)
      .orderBy('requestStamp', 'desc')
    ).pipe(
      map(async requests => {
        return await Promise.all(requests.map(async (request: any) => {
          const colection = await this.firestoreService.getUserById(request.userId);
          if (colection.docs.length) {
            const doc = colection.docs[0]
            request.user = doc.data()
          }
          return request;
        })
        )
      })
    ).subscribe(async (data) => {
      this.isLoading = false;
      console.log(await data)
      this.requests = (await data) as any;
    });
  }

  public getDate(request: any): string {
    const date: Date = request.requestStamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  async startRequest(request: RequestModel) {
    const requestToUpdate = { ...request };
    const alert = await this.alertController.create({
      message: 'Would you like to take over the request?',
      buttons: [{
        text: 'Ok',
        handler: async (res) => {
          requestToUpdate.appointmentStamp = new Date();
          requestToUpdate.consultantId = await (await this.authService.getCurrentUser()).uid;
          requestToUpdate.status = RequestStatuses.processing;
          delete requestToUpdate['user'];
          await this.firestoreService.update('requests', requestToUpdate, requestToUpdate.id);
        }
      }, {
        text: 'Cancel'
      }]
    });
    alert.present();
  }

}

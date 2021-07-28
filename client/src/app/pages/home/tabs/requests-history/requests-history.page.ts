import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestStatuses } from 'src/app/helpers/enums/request-statuses';
import { RequestInfoComponent } from 'src/app/modals/request-info/request-info.component';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { RequestModel } from '../../models/request-model';

@Component({
  selector: 'app-requests-history',
  templateUrl: './requests-history.page.html',
  styleUrls: ['./requests-history.page.scss'],
})
export class RequestsHistoryPage implements OnInit {

  requests: [] = []
  constructor(private firestoreService: FirestoreService,
    private fireAuthService: AuthService,
    private modalController: ModalController) {

  }

  async ngOnInit() {
    const userId = await (await this.fireAuthService.getCurrentUser()).uid;
    this.firestoreService.subscribeToChanges('requests', ref => ref
      .where('userId', '==', userId)
      .where('status', 'not-in', [RequestStatuses.pending, RequestStatuses.processing])
      .orderBy('status')
      .orderBy('requestStamp', 'desc')
    ).subscribe((data) => {
      this.requests = data;
    });
  }

  public getDate(request: any): string {
    const date: Date = request.requestStamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  async openRequestModal(request: RequestModel) {
    const modal = await this.modalController.create({
      component: RequestInfoComponent,
      componentProps: {
        request: request
      }
    })
    modal.present();
  }

  getStatusColor(request: RequestModel) {
    switch (request.status) {
      case RequestStatuses.rejected:
        return 'danger';
      case RequestStatuses.solved:
        return 'success';
    }
  }
  getStatusText(request: RequestModel) {
    switch (request.status) {
      case RequestStatuses.rejected:
        return 'Rejected';
      case RequestStatuses.solved:
        return 'Solved';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { RequestStatuses } from 'src/app/helpers/enums/requests-status';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { RequestModel } from '../../models/request-model';
import { RequestsHistoryPageRoutingModule } from '../requests-history/requests-history-routing.module';

@Component({
  selector: 'app-active-request',
  templateUrl: './active-request.page.html',
  styleUrls: ['./active-request.page.scss'],
})
export class ActiveRequestPage implements OnInit {

  request: RequestModel = {} as RequestModel;
  constructor(private firestore: FirestoreService, private authService: AuthService) {
    this.init();
  }
  async init() {
    const currentUser = await this.authService.getCurrentUser();
    console.log(currentUser.uid);
    this.firestore.subscribeToChanges('requests',
      ref => ref.where('consultantId', '==', currentUser.uid)
        .where('status', '==', RequestStatuses.processing))
      .subscribe((requests) => {
        console.log(requests);
        if (requests.length) {
          this.request = requests[0]
        }
      })
  }

  async ngOnInit() {


  }

  public get minDate(): string {
    return new Date().toLocaleDateString()
  }


}

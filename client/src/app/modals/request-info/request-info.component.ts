import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { RequestStatuses } from 'src/app/helpers/enums/request-statuses';
import { RequestModel } from 'src/app/pages/home/models/request-model';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';

@Component(
  {

    selector: 'app-request-info',
    templateUrl: './request-info.component.html',
    styleUrls: ['./request-info.component.scss'],
  })
export class RequestInfoComponent implements OnInit {

  @Input() request: RequestModel;
  isEditable: boolean = false;
  constructor(private modalController: ModalController,
    private firestoreService: FirestoreService,
    private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.request);
  }


  public get canEdit(): boolean {
    return this.request.status === RequestStatuses.pending;
  }
  toggleEditable() {
    this.isEditable = !this.isEditable;
  }
  getToggleIcon() {
    return this.isEditable ? 'close-outline' : 'create-outline';
  }
  getStatusColor(request: RequestModel) {
    switch (request.status) {
      case RequestStatuses.pending:
        return 'warning';
      case RequestStatuses.processing:
        return 'secondary';
      case RequestStatuses.rejected:
        return 'danger';
      case RequestStatuses.solved:
        return 'success';
    }
  }
  getStatusText(request: RequestModel) {
    switch (request.status) {
      case RequestStatuses.pending:
        return 'Pending';
      case RequestStatuses.processing:
        return 'Processing';
      case RequestStatuses.rejected:
        return 'Rejected';
      case RequestStatuses.solved:
        return 'Solved';
    }
  }
  isValid() {
    return this.request.title;
  }
  async updateRequest() {
    console.log(this.request)
    if (this.isValid()) {
      await this.firestoreService.updateRequest(this.request)
    } else {
      this.presentToast({ message: "Title field is not valid", duration: 2000 });
    }
  }
  async presentToast(options: { message: string, duration: number }) {
    const toast = await this.toastController.create({
      message: options.message,
      duration: options.duration
    });
    await toast.present();
  }
  async close() {
    await this.modalController.dismiss();
  }
}

import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore/firestore.service';
import { StorageService } from '../../services/storage/storage.service';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';

type IRequest = { requestStamp: Date, userId: string, description: string, resolutionStamp: any };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaded: boolean = false;
  description = '';
  requests: Array<IRequest> = [];
  pendingRequest: IRequest = undefined;
  queLength: number = 0;
  estimatedTime: Date;
  avgTime = 0;
  img = 'https://www.bankrate.com/2021/03/29162835/car-crash-stats-featured.jpg?auto=webp&optimize=high&crop=16:9&width=912';
  constructor(private animationCtrl: AnimationController, private firestoreService: FirestoreService, public alertController: AlertController, private storage: StorageService) {
    this.firestoreService.subscribeToChanges('requests').subscribe((requests: any[]) => {
      let today = new Date().toJSON().substr(0, 10);
      // console.log({ today }, requests);
      this.requests = requests.filter(el => this.egualsToDate(el, today));
      // console.log({ requests }, { today: this.requests });
      this.createStatistics()
    });
  }
  async createStatistics() {
    // cautam daca exista cerere in asteptare
    let userId = await this.storage.get('userId');
    let myReq = this.requests
      .filter(el => el.userId === userId && !el.resolutionStamp)
      .sort((a, b) => a.requestStamp < b.requestStamp ? 1 : -1);
    this.pendingRequest = myReq.length ? myReq[0] : undefined;
    this.loaded = true;
    if (!this.pendingRequest) return;
    this.queLength = this.requests.filter(el => el.requestStamp < this.pendingRequest.requestStamp && !el.resolutionStamp).length;
    let completed = this.requests.filter(el => el.resolutionStamp && el.resolutionStamp.seconds);
    let time = completed.reduce((acc, el) => {
      return acc + el.resolutionStamp.seconds - (el.requestStamp.getTime() / 1000);
    }, 0) || 0;
    if (completed.length) {
      // timpul scurs de la cea mai mare valoare a resolutionStamp
      time += (new Date().getTime() / 1000) - completed.sort((a, b) => a.resolutionStamp < b.resolutionStamp ? 1 : -1)[0].resolutionStamp.seconds;
    } else {
      time += (new Date().getTime() / 1000) - this.requests.sort((a, b) => a.requestStamp < b.requestStamp ? -1 : 1)[0].requestStamp.getTime()/1000;
    }

    this.avgTime = (time / (completed.length + 1)) / 60;

    this.estimatedTime = new Date(this.pendingRequest.requestStamp.getTime() + (this.avgTime * 1000 * 60 * this.queLength));
    console.log({estimatedTime:this.estimatedTime});
    this.animationCtrl.create()
      .addElement(document.getElementById('estimatedTimeCtrl'))
      .duration(3000)
      //.iterations(Infinity)
      .keyframes([
        { offset: 0, background: 'red' },
        { offset: 0.72, background: 'blue' },
        { offset: 1, background: 'transparent' }
      ]).play();
  }
  egualsToDate(el, date) {
    if (el && el.requestStamp && el.requestStamp.seconds) {
      let d = new Date(el.requestStamp.seconds * 1000);
      el.requestStamp = d;
      return d.toJSON().startsWith(date);
    } else {
      return false;
    }
  }
  addRequest() {
    this.loaded = false;
    this
      .firestoreService
      .addRequest(this.description || '-');
  }
}
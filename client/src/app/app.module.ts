import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/firebase/auth/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';

import { StorageService } from './services/storage/storage.service';
import { FirestoreService } from './services/firebase/firestore/firestore.service';
import { RequestInfoComponent } from './modals/request-info/request-info.component';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';


@NgModule({
  declarations: [AppComponent, RequestInfoComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    { provide: BUCKET, useValue: 'internship-2021.appspot.com' },
    AuthService,
    FirestoreService,
    StorageService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {

}

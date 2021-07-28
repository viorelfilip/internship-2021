import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/firebase/auth/auth.service';
import { FirestoreService } from './services/firebase/firestore/firestore.service';
import { StorageService } from './services/storage/storage.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },

    AuthService,
    FirestoreService,
    StorageService],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from './services/storage/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
//import { CallNumber } from '@ionic-native/call-number';
//import { CallNumber } from '@ionic-native/call-number/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebaseConfig), IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    AngularFireAuthModule,
    AngularFirestoreModule,
   StorageService
   ],
  bootstrap: [AppComponent],
})
export class AppModule {}

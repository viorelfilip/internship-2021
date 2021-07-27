import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
   }
   async init() {
     await this.storage.create();
   }
   async get(key: string){
    return await this.storage.get(key)
   }
   async set(key: string, data: any){
    await this.storage.set(key, data)
   }

}

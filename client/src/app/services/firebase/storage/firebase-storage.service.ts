import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private fireStorage: AngularFireStorage, private authService: AuthService) { }

  async uploadFile(blob) {
    const currentUser = await this.authService.getCurrentUser()
    const filePath = `${currentUser.uid}/Images/${new Date()}`;
    const ref = this.fireStorage.ref(filePath);
    const task = ref.put(blob);
    return (await task).ref;
  }

}

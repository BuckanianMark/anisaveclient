import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {Storage,getDownloadURL,ref,uploadBytes} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs:Firestore,private storage:Storage) { }
  async uploadImage(selectedImg:any){
    const filepath = `animeimage/${Date.now()}`;
    const storageRef = ref(this.storage,filepath)
    await uploadBytes(storageRef,selectedImg)
    let url = await getDownloadURL(storageRef)
    return url;
  }
}

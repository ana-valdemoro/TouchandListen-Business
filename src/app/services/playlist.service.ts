import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private afs: AngularFirestore) { }


  activateCurrentSong(id: string){
    this.afs.collection('Playlist').doc(id).update( {isPlaying: true} )
        .then(()=>{
            console.log("Hemos actualizado isPlaying a true");
        },
        ()=> console.log("No hemos actualizado isPlaying"));
  }

  deleteCurrentSong(id:string){
    this.afs.collection('Playlist').doc(id).delete()
      .then(()=> console.log("Hemos eliminado la cancion"));
  }
  getNextCurrentSongObservable (){
    return this.afs.collection('Playlist', ref => ref.where("isPlaying", "==", false).orderBy('likesCount', 'desc').orderBy('createdAt').limit(1)).valueChanges();
  } 
}

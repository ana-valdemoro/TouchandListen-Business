import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private afs: AngularFirestore) { }


  activateCurrentSong(id: string, duration: number){
    this.afs.collection('Playlist').doc(id).update( {isPlaying: true, duration: duration} )
        .then(()=>{
            console.log("Hemos actualizado isPlaying a true y su duración");
        },
        ()=> console.log("No hemos actualizado isPlaying y su duracion"));
  }

  deleteCurrentSong(id:string){
    this.afs.collection('Playlist').doc(id).delete()
      .then(()=> console.log("Hemos eliminado la cancion"));
  }
  getNextCurrentSongObservable (){
    return this.afs.collection('Playlist', ref => ref.where("isPlaying", "==", false).orderBy('likesCount', 'desc').orderBy('createdAt').limit(1)).valueChanges();
  } 

  updateProgressTime(id:string, time: string){
    this.afs.collection('Playlist').doc(id).update( {currentTime: time} )
    .then(()=>{
      console.log("Hemos actualizado el tiempo");
  },
  ()=> console.log("No hemos actualizado el tiempo"));
  }

}

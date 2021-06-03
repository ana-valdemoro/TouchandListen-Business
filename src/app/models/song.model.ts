import firebase from 'firebase';

export class ISong {
    _id?: string;
    name: string;
    artists: string[];
    duration: string;
    year?: string;
    genre?:string[];
    album?:string;
    photoURL?: string;
    path?:string;
    timesPlaying?: number;
    likes?: string[];
    likesCount?: number;
    createdAt?: firebase.firestore.Timestamp;

    constructor(song: any ) {
        if (song) {
          const { name, artists, duration, genre, photoURL, path } = song;
    
          this.name = name;
          this.artists        = artists;
          this.duration       = duration;
          this.genre          = genre;
          this.photoURL       = photoURL;
          this.path           = path;
          if(song.likes  ){
            this.likes = song.likes;
          }
          if(song.createdAt) this.createdAt = song.createdAt;
          if(song.likesCount >= 0 ){
            this.likesCount = song.likesCount;
          }
          
        }
    
      }
}
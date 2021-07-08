import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { Observable } from 'rxjs';
import { Howl } from 'howler';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currentSongObservable: Observable<any>;
  actualSongFirebase:ISong;
  nextCurrentSongObservable: Observable<any>;
  nextSong:ISong;
  currentSong: ISong;
  player: Howl = null;

  ngOnInit(): void {
    this.currentSongObservable = this.playlistService.getCurrentSongObservable();
    this.currentSongObservable.subscribe (song => this.actualSongFirebase = song[0]);
    this.nextCurrentSongObservable = this.playlistService.getNextCurrentSongObservable();
    this.nextCurrentSongObservable.subscribe(song => {
      this.nextSong = song[0];
    } );
  }
  constructor(private playlistService: PlaylistService){}


  startPlaylist(){
    if(this.nextSong !== undefined && (this.actualSongFirebase == undefined || this.currentSong == undefined )){
      this.currentSong = this.nextSong;
      console.log(this.currentSong);
      this.player = new Howl({
        src:[this.currentSong.path],
        html5:true,
        onload:() =>{
          this.playlistService.activateCurrentSong(this.currentSong._id, this.player.duration())
        },
        onplay:()=>{
          console.log("Sonando");
          this.updateProgress();
        },
        onend:()=>{
          console.log("Termino");
          this.playlistService.deleteCurrentSong(this.actualSongFirebase._id);
          this.currentSong =undefined;
          this.startPlaylist();
        }
      });
      this.player.play();
    }
  
  }
  next(){
    if(this.actualSongFirebase != undefined){
      this.player.stop();
      this.playlistService.deleteCurrentSong(this.actualSongFirebase._id)
      .then( () =>{
        this.currentSong = undefined;
        this.startPlaylist();
      });
    } 
  }
  stop(){ 
    this.player.pause();
  }
  resume(){
    if(this.player != undefined) this.player.play();
  }
  private updateProgress(){
    let seek = this.player.seek(); //Obtenemos la posición actual
    this.playlistService.updateProgressTime(this.currentSong._id, seek)
    if(this.player.playing()){
      setTimeout(()=>{
        this.updateProgress();
      }, 800);
    } 
  }
  
}

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
  nextCurrentSongObservable: Observable<any>;
  nextSong:ISong;
  currentSong: ISong;
  player: Howl = null;

  ngOnInit(): void {
    this.nextCurrentSongObservable = this.playlistService.getNextCurrentSongObservable();
    this.nextCurrentSongObservable.subscribe(song => {
      this.nextSong = song[0];
    } );
  }
  constructor(private playlistService: PlaylistService){}


  start(){
    // if(this.player){
    //   this.player.stop();
    // }

    this.currentSong = this.nextSong;
    console.log(this.currentSong);
    this.player = new Howl({
      src:[this.currentSong.path],
      html5:true,
      onload:() =>{
        this.playlistService.activateCurrentSong(this.currentSong._id)
      },
      onplay:()=>{
        console.log("Sonando");
        // this.duration = this.formatTime(this.player.duration());

        // this.updateProgress();
      },
      onend:()=>{
        console.log("Termino");
        this.playlistService.deleteCurrentSong(this.currentSong._id);
        this.start();
      }
    });
    this.player.play();
  }
  stop(){
    this.player.pause();
  }
}

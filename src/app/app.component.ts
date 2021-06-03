import { Component, OnInit } from '@angular/core';
// import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'touchandlistenBusiness';
  // player: Howl = null;

  // start(song: ISong){
  //   if(this.player){
  //     this.player.stop();
  //   }
  //   console.log("Hellou");
  //   this.player = new Howl({
  //     src:[song.path],
  //     html5:true,
  //     onplay:()=>{
  //       console.log("Sonando");
  //       this.duration = this.formatTime(this.player.duration());
  //       this.isPlaying = true;
  //       this.currentSong = song;
  //       this.updateProgress();
  //     },
  //     onend:()=>{
  //       console.log("Termino");
  //     }
  //   });
  //   this.player.play();
  //   // this.player.mute(true);
  // }
}

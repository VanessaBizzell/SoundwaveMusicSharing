import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostcardComponent } from '../postcard/postcard.component';
import { MusicService } from '../musicServiceandData/music.service';
import { Music } from '../musicServiceandData/music';
import { PostcardDetailsComponent } from '../postcardDetails/postcardDetails.component';

@Component({
  selector: 'app-feed',
  imports: [RouterModule, CommonModule, PostcardComponent, PostcardDetailsComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  //music array from music interface which is where the music data properties are defined
  musicFeed: Music[] = [];
  selectedMusicId: string | null = null;
 

  //injects music service (this is where the API call is made to retrieve the music data from the DB)
  musicService: MusicService = inject(MusicService);

  //constructor to call the getMusic method from the music service
  constructor() {
    this.musicService
      .getAllMusic()
      .then((musicFeed) => {
        if (Array.isArray(musicFeed)) {
          this.musicFeed = musicFeed;
          
        } else {
          console.error('Data retrieved is not an array!', musicFeed);
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching music feed:', error);
      });
      
  }

  onShowDetails(musicId: string) {
    this.selectedMusicId = musicId;
    console.log('selectedMusicId is now:', this.selectedMusicId);
  }

 
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostcardComponent } from '../postcard/postcard.component';
import { MusicService } from '../musicServiceandData/music.service';
import { Music } from '../musicServiceandData/music';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterModule, CommonModule, PostcardComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  //music array from music interface which is where the music data properties are defined
  musicFeed: Music[] = [];
 

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

  // getcolumnNumber(): number {
  //   const columnNumbers = this.musicFeed.length;
  //   console.log("col no =", columnNumbers);
  //   return columnNumbers;
  // }

  // getPaddingValue(): number {
  //   const paddingValues = [150, 50, 200, 20,];
  //   const height= paddingValues[Math.floor(Math.random() * paddingValues.length)];
  //   console.log(height);
  //   return height;

  // }

 
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostcardComponent } from '../postcard/postcard.component';
import { MusicService } from '../musicServiceandData/music.service';

@Component({
  selector: 'app-feed',
  imports: [RouterModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  musicList: Music[] = [];
  musicService: MusicService = inject(MusicService);

  constructor(private musicService: MusicService) { 
  this.musicService.getAllMusic().then((musicList) => {
    this.homeLocationList = homeLocationList;
    this.filteredLocationList = homeLocationList; // Initialize filteredLocationList
  });

}

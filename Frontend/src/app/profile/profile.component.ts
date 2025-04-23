
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddMusicFormComponent } from './add-music-form/add-music-form.component';
import { PostcardComponent } from '../postcard/postcard.component';
import { PostcardDetailsComponent } from '../postcardDetails/postcardDetails.component';
import { MusicService } from '../musicServiceandData/music.service';
import { Music } from '../musicServiceandData/music';

import { client } from '../client/client';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, AddMusicFormComponent, PostcardComponent, PostcardDetailsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  //user's music array - do we need a seperate array for user's music? 
  //might need to add another endpoint to retrieve music by the userID (getUserMusic)
  userMusic: Music[] = [];
  selectedMusicId: string | null = null;
  MusicFormVisible: boolean = false;
  
  //inject music service
  musicService: MusicService = inject(MusicService);

  async ngOnInit() {
     //call the getUserMusic method from the music service

    const user = await client.fetchCurrentUser()

    this.musicService
    .getUserMusic(user?.id) // replace 'userId' with the actual user ID - how do we get the user ID?
    .then((userMusic) => {
      if (Array.isArray(userMusic)) {
        this.userMusic = userMusic;
        
      } else {
        console.error('Data retrieved is not an array!', userMusic);
      }
    })
    .catch((error) => {
      console.error('An error occurred while fetching music feed:', error);
    });
    
}
   
    //show music details from user's own posts
    onShowDetails(musicId: string) {
      this.selectedMusicId = musicId;
      console.log('selectedMusicId is now:', this.selectedMusicId);
    }

    //method for displaying add music form when button is clicked
    onShowAddMusicForm(): void {
      this.MusicFormVisible = !this.MusicFormVisible;
    }

    //method for displaying user's profile details/settings when button is clicked? Do we need this?


  }



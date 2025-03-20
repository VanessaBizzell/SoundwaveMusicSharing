import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicService } from '../../musicServiceandData/music.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-music-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-music-form.component.html',
  styleUrls: ['./add-music-form.component.css']
})
export class AddMusicFormComponent {
  musicService: MusicService = inject(MusicService);
  MusicPostForm: FormGroup = new FormGroup({
    trackName: new FormControl('', Validators.required),
    trackLink: new FormControl('', Validators.required),
    artist: new FormControl('', Validators.required),
    album: new FormControl('',),
    recordedDate: new FormControl('', ),
    coverArt: new FormControl('', Validators.required),
    sourcedFrom: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    availableForSale: new FormControl('', Validators.required), 
    price: new FormControl('',)
  });

  constructor(private formBuilder: FormBuilder) {
    this.MusicPostForm = this.formBuilder.group({
      trackName: ['', Validators.required],
      trackLink: ['', Validators.required],
      artist: ['', Validators.required],
      album: [''],
      recordedDate: [''],
      coverArt: ['', Validators.required],
      sourcedFrom: ['', Validators.required],
      genre: ['', Validators.required],
      availableForSale: [false, Validators.required], // Changed to boolean
      price: ['']
    });
  }

  async submitMusic(): Promise<void> {
    const musicData = this.MusicPostForm.value;
    console.log('Music data:', musicData);
    // await this.musicService.addMusic(musicData);
  }


};

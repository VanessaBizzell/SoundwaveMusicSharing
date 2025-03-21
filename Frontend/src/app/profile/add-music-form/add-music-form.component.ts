import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicService } from '../../musicServiceandData/music.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-music-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './add-music-form.component.html',
  styleUrls: ['../../../styles.scss'],
})
export class AddMusicFormComponent {
  musicService: MusicService = inject(MusicService);
  MusicPostForm: FormGroup;

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

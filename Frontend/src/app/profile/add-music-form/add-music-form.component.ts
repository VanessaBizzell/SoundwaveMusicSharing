import { Component, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicService } from '../../musicServiceandData/music.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FileUploadComponent } from '../file-upload/file-upload.component';
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
  imports: [CommonModule,
     RouterModule, 
     ReactiveFormsModule, 
     MatInputModule, MatButtonModule,
      MatFormFieldModule, 
      MatSelectModule,
      MatCheckboxModule, 
      FileUploadComponent  
    ],
  templateUrl: './add-music-form.component.html',
  styleUrls: ['../../../styles.scss'],
})
export class AddMusicFormComponent {
  musicService: MusicService = inject(MusicService);
  MusicPostForm: FormGroup;
  selectedTrack: File | null = null;
  @Output() formSubmitted = new EventEmitter<void>();


  constructor(private formBuilder: FormBuilder) {
    this.MusicPostForm = this.formBuilder.group({
      trackName: ['', Validators.required],
      artist: ['', Validators.required],
      album: [''],
      recordedDate: [''],
      coverArt: ['', Validators.required],
      sourcedFrom: ['', Validators.required],
      genre: ['', Validators.required],
      availableForSale: [false, Validators.required], 
      price: ['']
    });
  }

  onFileSelected(file: File): void {
    if (file) {
      this.selectedTrack = file; // Store the selected file
      console.log('Selected file:', file);
    } else {
      alert('Please select a valid file type (MP3)');
      this.selectedTrack = null;
    }
  }

  //submit music post form with file - has to handle file uploads with mulitpart/form-data
  async submitMusic(): Promise<void> {
    if (this.MusicPostForm.valid && this.selectedTrack) {
      const formData = new FormData();
  
      // Append form fields to FormData - iterate over the form fields and append them to the FormData object
      const musicData = this.MusicPostForm.value;
      Object.keys(musicData).forEach((key) => {
        formData.append(key, musicData[key]);
      });
  
      // Append the selected file to FormData
      formData.append('file', this.selectedTrack);
  
      // Log the FormData contents for debugging
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
      try {
        // Call the service to handle the submission
        await this.musicService.addMusic(formData);
        console.log('Music submitted successfully!');
      } catch (error) {
        console.error('Error submitting music:', error);
      }
    } else {
      alert('Please fill out all required fields and select a track file.');
    }
      this.formSubmitted.emit();
      this.MusicPostForm.reset();
      this.selectedTrack = null;

  }

//  async submitMusic(): Promise<void> {
//   const musicData = this.MusicPostForm.value;
//   console.log('Music data:', musicData);
//   const userId = 'someUserId'; // Replace with actual user ID
//   await this.musicService.addMusic(musicData);
//   this.formSubmitted.emit();
//   // this.MusicPostForm.reset();

};

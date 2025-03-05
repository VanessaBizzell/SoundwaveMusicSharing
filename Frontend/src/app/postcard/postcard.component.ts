import { Component, OnInit, inject, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MusicService } from '../musicServiceandData/music.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Music } from '../musicServiceandData/music';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-postcard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './postcard.component.html',
  styleUrl: './postcard.component.css',
})

//do we want to add username or are comments anonymous?
export class PostcardComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  musicService = inject(MusicService);
  music: Music | undefined;
  comments: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.comments = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const musicId = Number(params.get('id'));
      if (isNaN(musicId)) {
        console.error('Invalid music ID:', params.get('id'));
        return;
      }
      this.musicService.getMusicById(musicId).then((music) => {
        this.music = music;
      }).catch((error) => {
        console.error('An error occurred while fetching music:', error);
      });
    });
  }

  submitComment(): void {
    if (!this.comments.valid) {
      this.musicService.submitComment(this.comments.value.comment ?? '');
    }
  }
}

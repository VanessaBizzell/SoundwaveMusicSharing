import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
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
  styleUrls: ['./postcard.component.css'],
})

export class PostcardComponent{
  @Input() music!: Music;
  @Output() showDetails = new EventEmitter<string>();

  onShowDetails() {
    this.showDetails.emit(this.music._id);
  }
}



import { Component, OnInit, Input, inject, } from '@angular/core';
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
  selector: 'app-details-postcard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './postcardDetails.component.html',
  styleUrl: './postcardDetails.component.css',
})


// do we want to add username or are comments anonymous?
export class PostcardDetailsComponent implements OnInit {
  @Input() musicId!: string;
  // route: ActivatedRoute = inject(ActivatedRoute);
  musicService = inject(MusicService);
  music: Music | undefined;
  comments: FormGroup;
  

  

  //FormBuilder service is used to create a form group. The form group is used to create a form control for the comment field.
  //Comment field is required to validate for submission. 
  //Private = only accessible within the class.So stops unintended interfernce by other code external to the class.
  constructor(private formBuilder: FormBuilder) {
    this.comments = this.formBuilder.group({
      comment: ['', Validators.required],
    });
    

  }

  ngOnInit(): void {
    this.musicService.getMusicById(this.musicId).then((music) => {
      this.music = music;
    }).catch((error) => {
      console.error('An error occurred while fetching music:', error);
    });
  }

  //Method to get music by ID. Uses the musicService to get the music by ID.
  //
  
  //NgOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  // The ngOnInit() method is called when the component is initialized.
  //The route parameter is used to get the music ID from the URL.
  // This NgOnInit method is used to get the music by ID using the musicService.
  //This method ensures that the initialization logic runs at the appropriate time in the component's lifecycle
  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     // Use 'id' parameter name to match your route
  //     const musicId = params.get('id');
  //     console.log(params);
  //     console.log('Music ID:', musicId);
      
  //     if (!musicId) {
  //       console.error('Missing music ID');
  //       return;
  //     }
      
  //     this.musicService.getMusicById(musicId).then((music) => {
  //       if (music) {
  //         this.music = music
            
  //          const recordedDate = new Date(music.recordedDate);
  //           const createdAt = new Date(music.createdAt);
  //           const updatedAt = new Date(music.updatedAt);
  //         };
        
  //     }).catch((error) => {
  //       console.error('An error occurred while fetching music:', error);
  //     });
  //   });
  // }
   

  //Method to submit comment. This method is called when the user submits a comment.
  //?? = nullish coalescing operator. It returns the right-hand operand when the left-hand operand is null or undefined.
  //If the comment is valid, the submitComment() method calls the musicService.submitComment() method to submit the comment.
  //The comment is retrieved from the form control using the value property.
  //If there is no comment, the comment is set to an empty string.
  submitComment(): void {
    if (this.comments.valid) {
      //do we want to be able to stop comment submission if there is no comment?
      this.musicService.submitComment(this.comments.value.comment ?? '');
    }
  }
}

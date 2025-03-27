import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { throwError, catchError } from 'rxjs'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})

export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>(); // Emit the selected file to the parent component
  
  selectedFile: File | null = null
  uploadProgress = 0
  private allowedTypes = ['audio/mpeg']

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file && this.allowedTypes.includes(file.type)) {
      this.fileSelected.emit(file); // Emit the selected file to the parent component
    } else {
      alert('Please select a valid MP3 file');
      input.value = ''; // Reset the input
    }
  }
}
 
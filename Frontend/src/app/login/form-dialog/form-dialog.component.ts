import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  imports: [CommonModule],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent implements OnInit {

  @Input() errors: Array<string> = ['qq', 'Q_q']

  ngOnInit(): void {
  }

}

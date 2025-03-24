import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  imports: [CommonModule],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent {

  @Input() title: string = ''
  @Input() errors: Array<string> = ['qq', 'Q_q']
  @Input() successText: string = ''
  @Input() isVisible: boolean = false

  @Output() hide = new EventEmitter<boolean>();

  onHide(): void {
    this.hide.emit(false);
  }

}

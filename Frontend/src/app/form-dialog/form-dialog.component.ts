import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() redirect: string = ''
  @Input() isVisible: boolean = false

  @Output() hide = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  onHide(): void {
    //console.log("redirect to:", this.redirect)
    if(this.redirect.length > 0) {
      this.router.navigate([this.redirect])
      .then(() => {
        window.location.reload();
      })
    }
    this.hide.emit(false);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-logout',
  imports: [FormDialogComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent implements OnInit {

  async ngOnInit() {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .catch(error => console.error(error))
  }

}

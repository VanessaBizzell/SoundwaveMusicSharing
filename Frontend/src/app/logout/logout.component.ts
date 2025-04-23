import { Component, OnInit } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FormDialogComponent],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  // Dynamically set the base URL based on the environment
  private baseUrl: string =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001'
      : 'https://soundwave-lewe.onrender.com';

  async ngOnInit() {
    await fetch (`${this.baseUrl}/logout`,
    //('http://localhost:3001/logout', 
    {
      method: 'POST',
      credentials: 'include',
    }).catch((error) => console.error(error));
  }
}

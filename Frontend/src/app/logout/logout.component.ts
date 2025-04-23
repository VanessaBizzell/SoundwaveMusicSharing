import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

      constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    // Check if the app is running in the browser before making the fetch request
    // This is important because fetch is not available on the server side
    // and we want to avoid making unnecessary requests
    // to the server when rendering on the server side
    if (isPlatformBrowser(this.platformId)) {
      await fetch(`${this.baseUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      }).catch((error) => console.error(error));
    }
  }
}

//   async ngOnInit() {
//     await fetch (`${this.baseUrl}/logout`,
//     //('http://localhost:3001/logout', 
//     {
//       method: 'POST',
//       credentials: 'include',
//     }).catch((error) => console.error(error));
//   }
// }

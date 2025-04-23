import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { client } from './../client/client'

import '../app.routes'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  navbarHeight: number = 80

  isLoggedIn: boolean = false
  isShowDropMenu: boolean = true

  async ngOnInit() {
    try {
      const request = await client.fetchCurrentUser()
      this.isLoggedIn = request.id?.length > 0
    } catch (error) {
      this.isLoggedIn = false
    }
  }

  getItems(): String[] {
    return this.isLoggedIn ?  
      ['Feed', 'Library', 'Profile', 'Logout'] :
      ['Login', 'Signup']
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import '../app.routes'

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  navbarHeight: number = 80

  isLoggedIn: boolean = true
  isShowDropMenu: boolean = false

  getItems(): String[] {
    return this.isLoggedIn ? 
      ["Feed", "Library", "Profile"] :
      ["Login", "Signup"]
  }

}

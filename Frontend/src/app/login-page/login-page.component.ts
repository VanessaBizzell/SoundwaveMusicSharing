import { Component } from '@angular/core';

import Client from './../../client'

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  async login(): Promise<Response> {

    return await fetch('http://localhost:3001/api/login',
      {
        method: 'POST'
      }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      Client.token = data.token
      return data
  })
    .catch(error => console.error(error))

  }

  onSubmit(): void {
    this.login();
  }
}

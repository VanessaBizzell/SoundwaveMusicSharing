import { Component } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private token: string = ''

  async login(): Promise<Response> {

    return await fetch('http://localhost:3001/api/login',
      {
        method: 'POST'
      }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.token = data.token
      return data
  })
    .catch(error => console.error(error))

  }

  async getResource(): Promise<Response>  {
    
    return await fetch('http://localhost:3001/api/page', {
      headers: {
        "authorization": `Bearer ${this.token}`
      }
    })
    .then(response => {
      console.log(response)
      console.log(response.status, " ", response.statusText)
      return response.json()
  })
    .then(data => {
      console.log(data)
      return data
  })
    .catch(error => console.error(error));
  }

  onSubmit(): void {
    this.login();
  }
}

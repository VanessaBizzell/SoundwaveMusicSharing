import { Component } from '@angular/core';
import { LoginFormInputComponent } from '../components/form-input/login-form-input.component';
import { LoginFormButtonComponent } from '../components/form-button/login-form-button.component';
import { FormDialogComponent } from "../form-dialog/form-dialog.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginFormInputComponent, LoginFormButtonComponent, FormDialogComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';

  errors: Array<string> = []
  redirect: string = '';

  isDialogVisible: boolean = false

  setDialogVisibility($event: boolean) {
    this.isDialogVisible = $event
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }

  async login(event: Event): Promise<Response> {

    event.preventDefault();

    return await fetch('http://localhost:3001/login',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify({
          "username": this.username,
          "password": this.password
        })
      }
    )
    .then(response => response.json())
    .then(data => {
      
      if(data.token?.length > 0) localStorage.setItem('token', data.token)

      console.log(data)
      this.errors = data.errors
      if(this.errors.length == 0) this.redirect = '/'
      this.isDialogVisible = true

      //Client.token = data.token
      
      return data
  })
    .catch(error => console.error(error))
  }

}

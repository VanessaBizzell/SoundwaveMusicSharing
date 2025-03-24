import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormInputComponent } from '../components/form-input/login-form-input.component';
import { LoginFormButtonComponent } from '../components/form-button/login-form-button.component';

@Component({
  selector: 'app-signup-page',
  imports: [ LoginFormInputComponent, LoginFormButtonComponent ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {

  username: string = ''
  email: string = ''
  password: string = ''
  confirmPassword: string = ''

  setUsername($event: string): void {
    this.username = $event
  }

  setEmail($event: string): void {
    this.email = $event
  }

  setPassword($event: string): void {
    this.password = $event
  }

  setConfirmPassword($event: string): void {
    this.confirmPassword = $event
  }

  signup = async (): Promise<Response> => {
    console.log(this.username)
    console.log(this.password)
    return await fetch('')
  }

}

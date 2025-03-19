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

  username: string = 'qq'

  @Output() onValueChanged = new EventEmitter<string>();

  signup = async (): Promise<Response> => {
    console.log(this.username)
    return await fetch('')
  }

}

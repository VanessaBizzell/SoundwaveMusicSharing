import { Component } from '@angular/core';
import { LoginFormInputComponent } from '../components/form-input/login-form-input.component';
import { LoginFormButtonComponent } from '../components/form-button/login-form-button.component';

@Component({
  selector: 'app-signup-page',
  imports: [ LoginFormInputComponent, LoginFormButtonComponent ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {

}

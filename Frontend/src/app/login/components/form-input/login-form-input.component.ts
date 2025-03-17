import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-form-input',
  imports: [],
  templateUrl: './login-form-input.component.html',
  styleUrl: './loginin-form-input.component.css'
})
export class LoginFormInputComponent {

  @Input() name: string = '';

  type: string = 'text'

  ngOnInit() {
    if(this.name.toLowerCase().includes('password')) this.type = 'password'
    else if(this.name.toLowerCase().includes('email')) this.type = 'email'
  }
}

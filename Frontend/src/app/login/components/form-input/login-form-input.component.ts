import { Component, Input, model, ModelSignal, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-login-form-input',
  imports: [FormsModule],
  templateUrl: './login-form-input.component.html',
  styleUrl: './login-form-input.component.css'
})

export class LoginFormInputComponent {

  @Input() name: string = '';

  onValueChanged = output<string>();

  type: string = 'text'

  ngOnInit() {
    if(this.name.toLowerCase().includes('password')) this.type = 'password'
    else if(this.name.toLowerCase().includes('email')) this.type = 'email'
  }

}

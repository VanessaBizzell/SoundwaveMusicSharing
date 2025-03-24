import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form-input',
  imports: [FormsModule],
  templateUrl: './login-form-input.component.html',
  styleUrl: './login-form-input.component.css'
})

export class LoginFormInputComponent implements OnInit {

  @Input() name: string = '';
  @Output() outValue = new EventEmitter<string>()

  type: string = 'text'
  value: string = ''

  ngOnInit() {

    if(this.name.toLowerCase().includes('password')) this.type = 'password'
    else if(this.name.toLowerCase().includes('email')) this.type = 'email'

  }

  onValueChanged(): void {
    this.outValue.emit(this.value)
  }

}

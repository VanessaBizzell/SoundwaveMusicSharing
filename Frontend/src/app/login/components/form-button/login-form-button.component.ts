import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form-button',
  standalone: true,
  imports: [],
  templateUrl: './login-form-button.component.html',
  styleUrls: ['./login-form-button.component.css'],
})
export class LoginFormButtonComponent {

  @Input() name = ''
  @Input() type = 'button'
  @Input() btnClick = () => { console.log('button') }

}

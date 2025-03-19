import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormButtonComponent } from './login-form-button.component';

describe('LoginFormButtonComponent', () => {
  let component: LoginFormButtonComponent;
  let fixture: ComponentFixture<LoginFormButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

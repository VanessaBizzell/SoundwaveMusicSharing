import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicFormComponent } from './add-music-form.component';

describe('AddMusicFormComponent', () => {
  let component: AddMusicFormComponent;
  let fixture: ComponentFixture<AddMusicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMusicFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMusicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

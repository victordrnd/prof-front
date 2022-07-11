import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingValidationMailComponent } from './waiting-validation-mail.component';

describe('WaitingValidationMailComponent', () => {
  let component: WaitingValidationMailComponent;
  let fixture: ComponentFixture<WaitingValidationMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingValidationMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingValidationMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

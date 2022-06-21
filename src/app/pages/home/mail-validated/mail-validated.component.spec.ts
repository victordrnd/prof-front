import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailValidatedComponent } from './mail-validated.component';

describe('MailValidatedComponent', () => {
  let component: MailValidatedComponent;
  let fixture: ComponentFixture<MailValidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailValidatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

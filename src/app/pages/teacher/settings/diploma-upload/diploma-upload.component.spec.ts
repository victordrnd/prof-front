import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaUploadComponent } from './diploma-upload.component';

describe('DiplomaUploadComponent', () => {
  let component: DiplomaUploadComponent;
  let fixture: ComponentFixture<DiplomaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

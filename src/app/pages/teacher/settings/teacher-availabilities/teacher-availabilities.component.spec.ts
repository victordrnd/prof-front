import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAvailabilitiesComponent } from './teacher-availabilities.component';

describe('TeacherAvailabilitiesComponent', () => {
  let component: TeacherAvailabilitiesComponent;
  let fixture: ComponentFixture<TeacherAvailabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAvailabilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAvailabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

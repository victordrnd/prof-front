import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSettingsModalComponent } from './lesson-settings-modal.component';

describe('LessonSettingsModalComponent', () => {
  let component: LessonSettingsModalComponent;
  let fixture: ComponentFixture<LessonSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonSettingsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

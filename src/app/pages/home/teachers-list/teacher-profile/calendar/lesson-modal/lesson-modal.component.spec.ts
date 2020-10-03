import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonModalComponent } from './lesson-modal.component';

describe('LessonModalComponent', () => {
  let component: LessonModalComponent;
  let fixture: ComponentFixture<LessonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

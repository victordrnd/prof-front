import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabLessonDetailsComponent } from './collab-lesson-details.component';

describe('CollabLessonDetailsComponent', () => {
  let component: CollabLessonDetailsComponent;
  let fixture: ComponentFixture<CollabLessonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabLessonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabLessonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

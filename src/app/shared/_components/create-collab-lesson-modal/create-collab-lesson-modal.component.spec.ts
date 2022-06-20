import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollabLessonModalComponent } from './create-collab-lesson-modal.component';

describe('CreateCollabLessonModalComponent', () => {
  let component: CreateCollabLessonModalComponent;
  let fixture: ComponentFixture<CreateCollabLessonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCollabLessonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollabLessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

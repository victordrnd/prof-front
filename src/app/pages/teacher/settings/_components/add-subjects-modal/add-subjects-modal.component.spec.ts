import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectsModalComponent } from './add-subjects-modal.component';

describe('AddSubjectsModalComponent', () => {
  let component: AddSubjectsModalComponent;
  let fixture: ComponentFixture<AddSubjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubjectsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDashboardRedirectionComponent } from './default-dashboard-redirection.component';

describe('DefaultDashboardRedirectionComponent', () => {
  let component: DefaultDashboardRedirectionComponent;
  let fixture: ComponentFixture<DefaultDashboardRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultDashboardRedirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultDashboardRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

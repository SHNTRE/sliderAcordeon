import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSignInComponent } from './app-sign-in.component';

describe('AppSignInComponent', () => {
  let component: AppSignInComponent;
  let fixture: ComponentFixture<AppSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

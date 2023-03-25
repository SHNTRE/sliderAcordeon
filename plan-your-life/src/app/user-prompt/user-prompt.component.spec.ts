import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromptComponent } from './user-prompt.component';

describe('UserPromptComponent', () => {
  let component: UserPromptComponent;
  let fixture: ComponentFixture<UserPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

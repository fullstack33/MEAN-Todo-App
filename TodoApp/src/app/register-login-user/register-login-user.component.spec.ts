import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginUserComponent } from './register-login-user.component';

describe('RegisterLoginUserComponent', () => {
  let component: RegisterLoginUserComponent;
  let fixture: ComponentFixture<RegisterLoginUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLoginUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

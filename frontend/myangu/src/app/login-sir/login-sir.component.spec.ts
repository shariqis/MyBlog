import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSirComponent } from './login-sir.component';

describe('LoginSirComponent', () => {
  let component: LoginSirComponent;
  let fixture: ComponentFixture<LoginSirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSirComponent]
    });
    fixture = TestBed.createComponent(LoginSirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

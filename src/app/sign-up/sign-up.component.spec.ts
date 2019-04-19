import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpModal } from './sign-up.component';

describe('SignUpModal', () => {
  let component: SignUpModal;
  let fixture: ComponentFixture<SignUpModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

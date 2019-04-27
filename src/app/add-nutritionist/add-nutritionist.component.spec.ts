import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNutritionistModal } from './add-nutritionist.component';

describe('AddNutritionistModal', () => {
  let component: AddNutritionistModal;
  let fixture: ComponentFixture<AddNutritionistModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNutritionistModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNutritionistModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

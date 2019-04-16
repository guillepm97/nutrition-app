import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodModal } from './search-food.component';

describe('SearchFoodModal', () => {
  let component: SearchFoodModal;
  let fixture: ComponentFixture<SearchFoodModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFoodModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

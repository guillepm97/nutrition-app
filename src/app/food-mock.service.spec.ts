import { TestBed } from '@angular/core/testing';

import { FoodMockService } from './food-mock.service';

describe('FoodMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodMockService = TestBed.get(FoodMockService);
    expect(service).toBeTruthy();
  });
});

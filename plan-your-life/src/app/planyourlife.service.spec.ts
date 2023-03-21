import { TestBed } from '@angular/core/testing';

import { PlanyourlifeService } from './planyourlife.service';

describe('PlanyourlifeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanyourlifeService = TestBed.get(PlanyourlifeService);
    expect(service).toBeTruthy();
  });
});

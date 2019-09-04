import { TestBed } from '@angular/core/testing';

import { TwirlAndTipService } from './twirl-and-tip.service';

describe('TwirlAndTipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwirlAndTipService = TestBed.get(TwirlAndTipService);
    expect(service).toBeTruthy();
  });
});

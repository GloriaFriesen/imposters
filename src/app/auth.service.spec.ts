import { TestBed, inject } from '@angular/core/testing';

import { AfService } from './af.service';

describe('AfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfService]
    });
  });

  it('should ...', inject([AfService], (service: AfService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { PreventaService } from './preventa.service';

describe('PreventaService', () => {
  let service: PreventaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

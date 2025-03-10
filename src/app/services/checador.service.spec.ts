import { TestBed } from '@angular/core/testing';

import { ChecadorService } from './checador.service';

describe('ChecadorService', () => {
  let service: ChecadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

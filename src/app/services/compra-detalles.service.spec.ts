import { TestBed } from '@angular/core/testing';

import { CompraDetallesService } from './compra-detalles.service';

describe('CompraDetallesService', () => {
  let service: CompraDetallesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraDetallesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

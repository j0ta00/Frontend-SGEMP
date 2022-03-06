import { TestBed } from '@angular/core/testing';

import { LineasPedidosTemporalService } from './lineas-pedidos-temporal.service';

describe('LineasPedidosTemporalService', () => {
  let service: LineasPedidosTemporalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasPedidosTemporalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

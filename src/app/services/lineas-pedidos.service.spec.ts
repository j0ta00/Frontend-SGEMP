import { TestBed } from '@angular/core/testing';

import { LineasPedidosService } from './lineas-pedidos.service';

describe('LineasPedidosService', () => {
  let service: LineasPedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasPedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

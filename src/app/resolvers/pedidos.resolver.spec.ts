import { TestBed } from '@angular/core/testing';

import { PedidosResolver } from './pedidos.resolver';

describe('PedidosResolver', () => {
  let resolver: PedidosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PedidosResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

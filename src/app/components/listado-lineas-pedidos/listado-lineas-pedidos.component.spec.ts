import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLineasPedidosComponent } from './listado-lineas-pedidos.component';

describe('ListadoLineasPedidosComponent', () => {
  let component: ListadoLineasPedidosComponent;
  let fixture: ComponentFixture<ListadoLineasPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoLineasPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoLineasPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

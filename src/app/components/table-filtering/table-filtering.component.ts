import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { of } from 'rxjs'; 
import { map, startWith } from 'rxjs/operators';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
@Component({
  selector: 'ngbd-table-filtering',
  templateUrl: './table-filtering.component.html',
  providers: [DecimalPipe]
})
export class TableFilteringComponent implements OnInit {
  listadoPedidosCompleto: Pedido[];
  listadoPedidosOfrecido: Observable<Pedido[]>;
  filter = new FormControl('');

  constructor(private pedidosService: PedidosService , pipe: DecimalPipe) {
    this.pedidosService.listadoPedidos().subscribe(data => { this.listadoPedidosCompleto = data; })
    //console.log(this.COUNTRIES[0])
    this.listadoPedidosOfrecido = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }
  ngOnInit(): void {
    this.pedidosService.listadoPedidos().subscribe(data => { this.listadoPedidosCompleto = data; console.log(this.listadoPedidosCompleto); })
    //  console.log(this.COUNTRIES[0].id)
  }
  search(text: string, pipe: PipeTransform): Pedido[] {
    return this.listadoPedidosCompleto.filter(pedido => {
      const term = text.toLowerCase();
      return pedido.id.toLowerCase().includes(term)
      || pipe.transform(pedido.idProveedor).includes(term)
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listadoPedidos:Pedido[];
  sortedData: Pedido[];

  constructor(private personaservice: PedidosService) { 
  }

  ngOnInit(): void {
    this.personaservice.listadoPedidos().subscribe(data => { this.listadoPedidos = data as Pedido[]})

    for (let i = 1; i <= this.listadoPedidos.length; i++) {
      this.listadoPedidos.push({ id: this.listadoPedidos[i].id, fechaPedido: this.listadoPedidos[i].fechaPedido, fechaRecepcion: this.listadoPedidos[i].fechaRecepcion, idProveedor: this.listadoPedidos[i].idProveedor, importeTotal: this.listadoPedidos[i].importeTotal, esBorrado: this.listadoPedidos[i].esBorrado });
    }


    this.sortedData = this.listadoPedidos.slice();
    
  }

  


  sortData(sort: Sort) {
    const data = this.listadoPedidos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'fechaPedido':
          return compare(a.fechaPedido, b.fechaPedido, isAsc);
        case 'idProveedor':
          return compare(a.idProveedor, b.idProveedor, isAsc);
        case 'importeTotal':
          return compare(a.importeTotal, b.importeTotal, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: Number | String | Date, b: Number | String | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

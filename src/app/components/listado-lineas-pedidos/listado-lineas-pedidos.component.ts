import { Component, OnInit } from '@angular/core';
import { LineaPedidos } from 'src/app/interfaces/linea-pedidos'
import { LineasPedidosService } from 'src/app/services/lineas-pedidos.service';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-listado-lineas-pedidos',
  templateUrl: './listado-lineas-pedidos.component.html',
  styleUrls: ['./listado-lineas-pedidos.component.css']
})
export class ListadoLineasPedidosComponent implements OnInit {
  listadoLineasPedidos: LineaPedidos[];
  baseImponible: Number;
  iva: Number;
  total: Number;


  constructor(private LineasPedidosService: LineasPedidosService) {
    this.baseImponible = 0;
    this.iva = 0;
    this.total = 0;
  }

  ngOnInit(): void {

    this.LineasPedidosService.listadoLineaPedidos(1).subscribe(data => {
      this.listadoLineasPedidos = data
    });
    
  }

  click(): void {
    this.baseImponible = this.calcularBaseImponible();
    this.iva = this.calcularIva();
    this.total = this.calcularTotal();
    console.log(this.baseImponible);
  }

  calcularBaseImponible(): Number {
    var base = 0;
    for (let linea of this.listadoLineasPedidos) {
      base += Number(linea.subTotal);
    }
    return base;
  }

  calcularIva(): Number {
    
    return Number(this.baseImponible) * 0.21;
  }

  calcularTotal(): Number{
    return Number(this.baseImponible) + Number(this.iva);
  }
}


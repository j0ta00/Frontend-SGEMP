import { Component, OnInit } from '@angular/core';
import{LineaPedidos} from 'src/app/interfaces/linea-pedidos'
import {LineasPedidosService} from 'src/app/services/lineas-pedidos.service';

@Component({
  selector: 'app-listado-lineas-pedidos',
  templateUrl: './listado-lineas-pedidos.component.html',
  styleUrls: ['./listado-lineas-pedidos.component.css']
})
export class ListadoLineasPedidosComponent implements OnInit {
listadoLineasPedidos:LineaPedidos[];


  constructor(private LineasPedidosService: LineasPedidosService){ 

  }

  ngOnInit(): void {

this.LineasPedidosService.listadoLineaPedidos(1).subscribe(data=>{
  this.listadoLineasPedidos=data
});

  }

}

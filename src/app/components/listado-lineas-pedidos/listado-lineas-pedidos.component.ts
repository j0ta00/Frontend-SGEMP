import { Component, OnInit } from '@angular/core';
import { LineaPedidos } from 'src/app/interfaces/linea-pedidos'
import {Producto } from 'src/app/interfaces/producto'
import { LineasPedidosService } from 'src/app/services/lineas-pedidos.service';
import { LineaPedidosConNombreProducto } from '../../interfaces/linea-pedidos-con-nombre-producto';


@Component({
  selector: 'app-listado-lineas-pedidos',
  templateUrl: './listado-lineas-pedidos.component.html',
  styleUrls: ['./listado-lineas-pedidos.component.css']
})
export class ListadoLineasPedidosComponent implements OnInit {
  listadoLineasPedidos: LineaPedidos[];
  listadoProductos: Producto[];
  listadoLineasPedidosAnhiadidos: LineaPedidos[];

  constructor(private LineasPedidosService: LineasPedidosService) {
    this.anhiadiendoPedido=false
    this.visibilityTd = false;
    this.visibilityInputs = true;
  }
  public nuevaLineaPedido: LineaPedidos;
  public visibilityTd: boolean;
  public visibilityInputs: boolean;
  public anhiadiendoPedido: boolean;
  public listadoLineaDePedidosConNombreDeProducto:LineaPedidosConNombreProducto[];
  public cambiarVisibilidad() {
    this.visibilityTd = true;
    this.visibilityInputs = false;
  }
  public anhiadirPedido(){
    this.anhiadiendoPedido=true; 
    this.listadoLineasPedidosAnhiadidos=this.listadoLineasPedidosAnhiadidos==null?new Array():this.listadoLineasPedidosAnhiadidos;
    this.nuevaLineaPedido={
     cantidad:0,
     subTotal:0,
     idProducto:'1',
     idPedido:'1',
     precioUnitario:0
    };
    this.listadoLineasPedidosAnhiadidos.push(this.nuevaLineaPedido);
  }
  public borrarFila(fila: Number) { }
public cambiarProducto(index:Number){
  this.listadoLineasPedidosAnhiadidos[index.valueOf()];

}
  ngOnInit(): void {
    this.LineasPedidosService.listadoLineaPedidos(1).subscribe(data => {
      this.listadoLineasPedidos = data
    });
    this.LineasPedidosService.listadoProductosPorProveedor(1).subscribe(data => {
      this.listadoProductos = data
    });
  }
}

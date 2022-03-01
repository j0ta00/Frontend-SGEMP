import { Component, OnInit } from '@angular/core';
import { LineaPedidos } from 'src/app/interfaces/linea-pedidos'
import { LineasPedidosService } from 'src/app/services/lineas-pedidos.service';


@Component({
  selector: 'app-listado-lineas-pedidos',
  templateUrl: './listado-lineas-pedidos.component.html',
  styleUrls: ['./listado-lineas-pedidos.component.css']
})
export class ListadoLineasPedidosComponent implements OnInit {
  listadoLineasPedidos: LineaPedidos[];
  listadoLineasPedidosAnhiadidos: LineaPedidos[];

  constructor(private LineasPedidosService: LineasPedidosService) {
    this.anhiadiendoPedido=false
    this.visibilityTd = false;
    this.visibilityInputs = true;
  }
  private nuevoPedido: LineaPedidos;
  public visibilityTd: boolean;
  public visibilityInputs: boolean;
  public anhiadiendoPedido: boolean;
  public cambiarVisibilidad() {
    this.visibilityTd = true;
    this.visibilityInputs = false;
  }
  public anhiadirPedido(){
    this.anhiadiendoPedido=true; 
    this.listadoLineasPedidosAnhiadidos=this.listadoLineasPedidosAnhiadidos==null?new Array():this.listadoLineasPedidosAnhiadidos;
    this.listadoLineasPedidosAnhiadidos.push(this.nuevoPedido);
    this.nuevoPedido={
     cantidad:0,
     subTotal:0,
     idProducto:'',
     idPedido:'',
     precioUnitario:0
      

      
    };

  }
  public borrarFila(fila: number) { }

  ngOnInit(): void {
    this.LineasPedidosService.listadoLineaPedidos(1).subscribe(data => {
      this.listadoLineasPedidos = data
    });

  }

}

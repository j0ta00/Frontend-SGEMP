import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedidoID:number;
  pedidoSeleccionado: Pedido;
  pedidos:Pedido[];
  constructor(private pedidosService: PedidosService, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.pedidoID=Number(this.router.snapshot.paramMap.get('id'));
    // this.pedidosService.listadoPedidos().subscribe(data=>this.pedidoSeleccionado=data[0]);
    this.pedidosService.pedidoPorId(this.pedidoID).subscribe(data=>this.pedidoSeleccionado=data);
  }
  guardarCambios(): void {
    alert("cambios descartados");
  }
  mostrarId():void{
    var n= this.pedidoSeleccionado.id;
    alert(this.pedidoSeleccionado.id);
    alert("igual cagaste");
  }
  descartarCambios(): void {
  }

  crearPedido(): void {
    alert("Crear Pedido");
  }

}

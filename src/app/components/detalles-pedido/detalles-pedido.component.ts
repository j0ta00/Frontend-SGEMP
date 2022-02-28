import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedidoID:number;
  pedidoSeleccionado: Pedido;
  pedidos:Pedido[];
  constructor(private pedidosService: PedidosService, private activatedRoute: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.pedidoID=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.pedidosService.listadoPedidos().subscribe(data=>this.pedidoSeleccionado=data[0]);
    // this.pedidosService.pedidoPorId(this.pedidoID).subscribe(data=>this.pedidoSeleccionado=data);
    document.getElementById("clienteInput")?.setAttribute("placeholder", this.pedidoSeleccionado.name.toString());
  }
  guardarCambios(): void {
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/login");
  }
  crearPedido(): void {
    this.router.navigateByUrl("/create");
  }

}

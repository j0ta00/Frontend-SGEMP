import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {

  constructor(private pedidosService: PedidosService, private router: Router) { }
  pedidoCreado:Pedido;

  ngOnInit(): void {
  }
  guardarCambios(): void {
    this.pedidoCreado.idProveedor=1;
    this.pedidoCreado.fechaPedido;
    this.pedidoCreado.fechaRecepcion;
    //llamar a la API para insertar los datos ddel pedido
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/home");
  }
}

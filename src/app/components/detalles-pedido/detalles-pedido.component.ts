import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedidoID: number;
  pedidoSeleccionado: Pedido;

  constructor(private pedidosService: PedidosService, private activatedRoute: ActivatedRoute, private router: Router) { }
  // ngOnChanges(changes:SimpleChange):void {
  //   if(typeof changes['Pedido']!=="undefined")
  //   var change=changes['pedidoSeleccionado'];
  //   if(!change.isFisrtChange())
  //   this.cargarPedido();
  // }
  ngOnInit(): void {
    this.pedidoID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cargarPedido();
  }
  guardarCambios(): void {
    //llamar a la API para actualizar los datos del pedido
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/home");
  }
  crearPedido(): void {
    this.router.navigateByUrl("/create");
  }
  cargarPedido(): void {
    this.pedidosService.pedidoPorId(this.pedidoID).subscribe(data => this.pedidoSeleccionado = {
      id: data.id,
      fechaPedido: data.fechaPedido,
      fechaRecepcion: data.fechaRecepcion,
      importeTotal: data.importeTotal,
      esBorrado: data.esBorrado,
      idProveedor: data.idProveedor
    });
  }

}

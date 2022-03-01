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

  constructor(private pedidosService: PedidosService, private activatedRoute: ActivatedRoute, private router:Router) {}
  ngOnInit(): void {
    this.pedidoID=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cargarPedido();
  }
  ngAfterViewInit():void {
    console.log(this.pedidoSeleccionado.id)
  }
  guardarCambios(): void {
    alert(this.pedidoSeleccionado.id)
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/home");
  }
  crearPedido(): void {
    this.router.navigateByUrl("/create");
  }
  loadPedidosasync():void{

  }
  cargarPedido():void{
    this.pedidosService.pedidoPorId(this.pedidoID).subscribe(data=>this.pedidoSeleccionado={
      id:data.id,
      fechaPedido:data.fechaPedido,
      fechaRecepcion:data.fechaRecepcion,
      importeTotal:data.importeTotal,
      esBorrado:data.esBorrado,
      idProveedor:data.idProveedor 
    });
  }

}

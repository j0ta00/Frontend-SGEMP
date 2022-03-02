import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorServiceService } from 'src/app/services/proveedor-service.service';
import { PedidosResolver } from 'src/app/resolvers/pedidos.resolver';
@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedidoID: number;
  pedidoSeleccionado: Pedido;
  creandoPedido: boolean;
  listadoProveedores:Proveedor[];

  constructor(private resolver:PedidosResolver,private pedidosService: PedidosService,private proveedoresService:ProveedorServiceService ,private activatedRoute: ActivatedRoute, private router: Router) { }
  // ngOnChanges(changes:SimpleChange):void {
  //   if(typeof changes['Pedido']!=="undefined")
  //   var change=changes['pedidoSeleccionado'];
  //   if(!change.isFisrtChange())
  //   this.cargarPedido();
  // }
  ngOnInit(): void {
    this.pedidoID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.proveedoresService.listadoProveedores().subscribe(data=>this.listadoProveedores=data);
    this.creandoPedido = this.pedidoID !== 0;
    if (this.creandoPedido)
      this.cargarPedido();
  }
  guardarCambios(): void {
    if (this.creandoPedido)
      this.pedidosService.insertPedido(this.pedidoSeleccionado);
    else
    {
      this.pedidoSeleccionado
    }
      // this.pedidosService.updatePedido(this.pedidoSeleccionado);
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/home");
  }
  crearPedido(): void {
    this.router.navigateByUrl("/details/0");
  }

  insertarPedido():void{
    this.pedidoSeleccionado.idProveedor;
  }

  get():Pedido{
    return this.activatedRoute.snapshot.data.preFetchData.Pedido
  }
  cargarPedido(): void {
    // this.pedidosService.pedidoPorId(this.pedidoID).subscribe(data => this.pedidoSeleccionado = {
    //   id: data.id,
    //   fechaPedido: data.fechaPedido,
    //   fechaRecepcion: data.fechaRecepcion,
    //   importeTotal: data.importeTotal,
    //   esBorrado: data.esBorrado,
    //   idProveedor: data.idProveedor
    // });
    this.pedidoSeleccionado=this.get();
  }
}

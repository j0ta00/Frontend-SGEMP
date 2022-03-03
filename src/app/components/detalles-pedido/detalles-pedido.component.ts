import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorServiceService } from 'src/app/services/proveedor-service.service';
import { PedidosResolver } from 'src/app/resolvers/pedidos.resolver';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedidoID: number;
  spinnerVisibility:boolean;
  pedidoSeleccionado: Pedido;
  creandoPedido: boolean;
  listadoProveedores: Proveedor[];

  constructor(private resolver: PedidosResolver, private pedidosService: PedidosService, private proveedoresService: ProveedorServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }
  // ngOnChanges(changes:SimpleChange):void {
  //   if(typeof changes['Pedido']!=="undefined")
  //   var change=changes['pedidoSeleccionado'];
  //   if(!change.isFisrtChange())
  //   this.cargarPedido();
  // }
  ngOnInit(): void {
    this.spinnerVisibility=true;
    this.pedidoID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.proveedoresService.listadoProveedores().subscribe(data => this.listadoProveedores = data);
    this.creandoPedido = this.pedidoID == 0;
    // if (!this.creandoPedido)
      this.cargarPedido();
    // else {

      // this.pedidoSeleccionado = {
      //   id: 0,
      //   fechaPedido: new Date(),
      //   fechaRecepcion: new Date(),
      //   importeTotal: 0,
      //   esBorrado: false,
      //   idProveedor: 1
      // }
    // }
    console.log(this.pedidoSeleccionado);
    this.spinnerVisibility=true;
  }
  guardarCambios(): void {
    if (this.creandoPedido)
      this.pedidoSeleccionado
    // this.pedidosService.insertPedido(this.pedidoSeleccionado);
    else {
      this.pedidoSeleccionado
      // this.pedidosService.updatePedido(this.pedidoSeleccionado);
    }
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/home");
  }
  crearPedido(): void {
    this.router.navigate(['/details/0']).then(() => {
      window.location.reload();
    });
  }

  insertarPedido(): void {
    this.pedidoSeleccionado.idProveedor;
  }

  get(): any {
    return this.resolver.resolve(this.activatedRoute.snapshot, this.activatedRoute.snapshot.data.Pedido)
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
    var resolverResult=this.get() as Observable<Pedido>;
    //indicar que la pagina esta cargando
    resolverResult.subscribe(data => this.pedidoSeleccionado = {
      id: data.id,
      fechaPedido: data.fechaPedido,
      fechaRecepcion: data.fechaRecepcion,
      importeTotal: data.importeTotal,
      esBorrado: data.esBorrado,
      idProveedor: data.idProveedor
    }
    );
  }
}

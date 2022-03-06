import { LineaPedidos } from 'src/app/interfaces/linea-pedidos'
import { Producto } from 'src/app/interfaces/producto'
import { LineasPedidosService } from 'src/app/services/lineas-pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { LineaPedidosConNombreProducto } from '../../interfaces/linea-pedidos-con-nombre-producto';
import { Component, OnInit, Input, SimpleChange, ViewChild } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { PedidosResolver } from 'src/app/resolvers/pedidos.resolver';
import { debounceTime, delay, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LineasPedidosTemporalService } from 'src/app/services/lineas-pedidos-temporal.service';
import { Auth } from '@firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listado-lineas-pedidos',
  templateUrl: './listado-lineas-pedidos.component.html',
  styleUrls: ['./listado-lineas-pedidos.component.css']
})
export class ListadoLineasPedidosComponent implements OnInit {
  baseImponible: Number;
  iva: Number;
  total: Number;
  listadoLineasPedidos: LineaPedidos[];
  listadoProductos: Producto[];
  listadoLineasPedidosAnhiadidos: LineaPedidos[];
  public nuevaLineaPedido: LineaPedidos;
  public visibilityTd: boolean;
  public anhiadiendoPedido: boolean;
  pedidoID: number;
  spinnerVisibility: boolean;
  pedidoSeleccionado: Pedido;
  creandoPedido: boolean;
  listadoProveedores: Proveedor[];
  productoSeleccionado: Producto | undefined;
  public displayedColumns = ['idPedido', 'NombreProducto', 'Cantidad', 'PrecioUnitario', 'Subtotal', 'Borrar'];
  public dataSource = new MatTableDataSource<LineaPedidos>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  defaultRecords: any = 3;

  constructor(private ProductosService: ProductosService, private authServe: AuthService, private lineasPedidosService: LineasPedidosService, private lineasPedidosTmpService: LineasPedidosTemporalService, private modalService: NgbModal, private resolver: PedidosResolver, private pedidosService: PedidosService, private proveedoresService: ProveedorService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.anhiadiendoPedido = false
    this.visibilityTd = false;
    this.baseImponible = 0;
    this.iva = 0;
    this.total = 0;
  }

  public listadoLineaDePedidosConNombreDeProducto: LineaPedidosConNombreProducto[];
  public cambiarVisibilidad() {
    this.visibilityTd = true;
  }
  public anhiadirPedido() {
    this.anhiadiendoPedido = true;
    this.listadoLineasPedidosAnhiadidos = this.listadoLineasPedidosAnhiadidos == null ? new Array() : this.listadoLineasPedidosAnhiadidos;
    this.nuevaLineaPedido = {
      cantidad: 0,
      subTotal: 0,
      idProducto: 1,
      idPedido: 1,
      precioUnitario: 0
    };
    this.listadoLineasPedidosAnhiadidos.push(this.nuevaLineaPedido);
    this.cambiarProducto(new Option(this.listadoProductos[0].nombre, this.listadoProductos[0].id.toString()), (this.listadoLineasPedidosAnhiadidos.length - 1))
  }
  open(content: any, i: Number) {
    this.modalService.open(content, { ariaLabelledBy: 'delete-modal' }).result.then((result) => {
      if (result == "Delete click") {
        this.borrarFila(i)
      }
    });
  }
  public borrarFila(fila: Number): void {
    this.listadoLineasPedidosAnhiadidos = this.listadoLineasPedidosAnhiadidos.filter(obj => { return obj !== this.listadoLineasPedidosAnhiadidos[+fila] });
  }

  public cambiarProducto(option: any, indexListado: Number): void {
    const element = option as HTMLOptionElement;
    this.productoSeleccionado = this.listadoProductos.find(producto => producto.id == option.value);
    if (this.productoSeleccionado !== undefined) {
      this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].precioUnitario = this.productoSeleccionado.precioUnitario.valueOf()
      this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].subTotal = this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].cantidad.valueOf() * this.productoSeleccionado.precioUnitario.valueOf()
      this.baseImponible = this.calcularBaseImponible();
      this.iva = this.calcularIva();
      this.total = this.calcularTotal();
    }
  }

  public cambiarCantidad(cantidad: string, indexListado: Number) {
    if (cantidad.length > 0) {
      this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].cantidad = Number.parseInt(cantidad).valueOf()
      if (this.productoSeleccionado != null && this.productoSeleccionado != undefined) {
        this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].subTotal = this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].cantidad.valueOf() * this.productoSeleccionado.precioUnitario.valueOf()
      }
    } else {
      this.listadoLineasPedidosAnhiadidos[indexListado.valueOf()].cantidad = 0
    }
    this.baseImponible = this.calcularBaseImponible();
    this.iva = this.calcularIva();
    this.total = this.calcularTotal();
  }

  guardarCambios(): void {
    var userID = "1";
    // this.authServe.getUserLogged().subscribe(data=>{userId=data?.getIdToken})
    this.listadoLineasPedidosAnhiadidos.forEach(item => { var aux = { idProveedor: this.pedidoSeleccionado.idProveedor, idUsuario: userID, idProducto: item.idProducto, cantidad: item.cantidad, precioUnitario: item.precioUnitario }; this.lineasPedidosTmpService.insertLineaPedidoTMP(aux); });
    if (this.creandoPedido) {
      this.pedidosService.insertPedido(userID, this.pedidoSeleccionado.idProveedor);
    } else {
      this.listadoLineasPedidosAnhiadidos.forEach(item => { var aux = { idProveedor: this.pedidoSeleccionado.idProveedor, idUsuario: userID, idProducto: item.idProducto, cantidad: item.cantidad, precioUnitario: item.precioUnitario }; this.lineasPedidosTmpService.updateLineaPedidoTMP(aux); });
    }
  }
  descartarCambios(): void {
    this.router.navigateByUrl("/home");
  }
  crearPedido(): void {
    this.router.navigate(['/detallesPedidos/0']).then(() => {
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
    var resolverResult = this.get() as Observable<Pedido>;
    resolverResult.subscribe(data => this.pedidoSeleccionado = {
      id: data.id,
      fechaPedido: data.fechaPedido,
      fechaRecepcion: data.fechaRecepcion,
      importeTotal: data.importeTotal,
      esBorrado: data.esBorrado,
      idProveedor: data.idProveedor,
      nombreProveedor: data.nombreProveedor
    }
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cambiarDeProveedor(this.listadoProveedores[0].id);
    this.baseImponible = this.calcularBaseImponible();
    this.iva = this.calcularIva();
    this.total = this.calcularTotal();
  }

  public cambiarDeProveedor(idProveedor: Number): void {
    this.ProductosService.listadoProductosPorProveedor(idProveedor).pipe(debounceTime(500)).subscribe(data => {
      this.listadoProductos = data
      this.cambiarProducto(new Option(data[0].nombre, data[0].id.toString()), (this.listadoLineasPedidosAnhiadidos.length - 1));//Esto lo hacemos aquí ya que si lo hacíamos debajo por alguna razón que desconocemos 
    });                                                                                                                       //la lista nos llegaba con datos erróneos.

  }
  ngOnInit(): void {
    this.pedidoID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.spinnerVisibility = true;
    this.lineasPedidosService.listadoLineaPedidos(this.pedidoID).subscribe(data => {
      this.dataSource.data = data as LineaPedidos[];
    });
    this.proveedoresService.listadoProveedores().subscribe(data => this.listadoProveedores = data);
    this.creandoPedido = this.pedidoID == 0;
    this.cargarPedido();
  }

  onPaginateChange(data: any) {
    this.listadoLineasPedidos = this.listadoLineasPedidos.slice(0, data.pageSize);
  }
  calcularBaseImponible(): Number {
    var base = 0;
    for (let linea of this.dataSource.data) {
      base += Number(linea.subTotal);
    }
    if (this.listadoLineasPedidosAnhiadidos != null && this.listadoLineasPedidosAnhiadidos) {
      for (let linea of this.listadoLineasPedidosAnhiadidos) base += Number(linea.subTotal);
    }
    return base;
  }

  calcularIva(): Number {

    return Number(this.baseImponible) * 0.21;
  }

  calcularTotal(): Number {
    return Number(this.baseImponible) + Number(this.iva);
  }

}

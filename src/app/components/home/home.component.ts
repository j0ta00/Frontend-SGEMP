import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['id', 'fechaPedido', 'nombreProveedor','fechaEntrega','importeTotal', 'details', 'delete'];
  public dataSource = new MatTableDataSource<Pedido>();



  constructor(private personaservice: PedidosService, private activatedRoute: ActivatedRoute, private router: Router, private dialog:MatDialog) { 
  }


  ngOnInit(): void {
    try{
      this.personaservice.listadoPedidos().subscribe(data => { this.dataSource.data = data as Pedido[]})
    }catch{
      this.router.navigate(['/error']).then(() => {window.location.reload();});
    }   
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  /**
    <summary>
       <cabecera>public redirectToDetails</cabecera>
       <descricion>Este método navega hacia la vista de detalles del pedido según el id del pedido recibido</descricion>
       <precondicion>El id ha de ser válido</precondicion>
       <postcondicion>Redirecciona a la vista de detalles</postcondicion>
    </summary>
    @param id
   */
  public redirectToDetails = (id: string) => {this.router.navigate(['/detallesPedidos/'+id]).then(() => {
    window.location.reload();
  });}



  /**
    <summary>
       <cabecera>public redirectToDetails</cabecera>
       <descricion>Este método muestra una alerta para borrar el pedido o no</descricion>
       <precondicion>El id ha de ser válido</precondicion>
       <postcondicion>Se borra o no el pedido según la elección del usuario</postcondicion>
    </summary>
    @param idPedido 
   */
  public redirectToDelete(idPedido: Number):void{
    
      const dialogRef = this.dialog.open(DialogBoxComponent);
  
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          try {
            this.personaservice.borrarPedido(idPedido).subscribe(()=>console.log("Pedido borrado"));      
          } catch (error) {
            this.router.navigate(['/error']).then(() => {window.location.reload();});
          }
        }      
      } 
      ); 
  }


  

  /**
    <summary>
       <cabecera>public redirectToCreate = ()</cabecera>
       <descricion>Este método navega hacia la vista de creae pedido</descricion>
       <precondicion>Ninguna</precondicion>
       <postcondicion>Navega haacia la vista crear pedido</postcondicion>
    </summary>
   */
  public redirectToCreate = () => {this.router.navigate(['/detallesPedidos/0']).then(() => {
    window.location.reload();
  });}
  


  /**
    <summary>
       <cabecera>public doFilter = (value: string)</cabecera>
       <descricion>Este método muestra filtra por los atributos de los elementos del DataSource</descricion>
       <precondicion>Ninguna</precondicion>
       <postcondicion>Se filtran los pedidos según lo que se haya buscado.</postcondicion>
    </summary>
    @param value 
   */
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
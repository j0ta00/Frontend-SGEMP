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

  public redirectToDetails = (id: string) => {this.router.navigate(['/detallesPedidos/'+id]).then(() => {
    window.location.reload();
  });}

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


  


  public redirectToCreate = () => {this.router.navigate(['/detallesPedidos/0']).then(() => {
    window.location.reload();
  });}
  


  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
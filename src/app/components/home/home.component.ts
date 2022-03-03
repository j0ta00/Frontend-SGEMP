import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['id', 'fechaPedido', 'idProveedor', 'importeTotal', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Pedido>();


  constructor(private personaservice: PedidosService) { 
  }
  ngOnInit(): void {
    this.personaservice.listadoPedidos().subscribe(data => { this.dataSource.data = data as Pedido[]})
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public redirectToDetails = (id: string) => {console.log(id)}
  public redirectToUpdate = (id: string) => {}
  public redirectToDelete = (id: string) => {}
  public redirectToCreate = () => {}
  
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
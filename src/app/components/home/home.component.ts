import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private personaservice: PedidosService, private activatedRoute: ActivatedRoute, private router: Router) { 
  }
  ngOnInit(): void {
    this.personaservice.listadoPedidos().subscribe(data => { this.dataSource.data = data as Pedido[]})   
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public redirectToDetails = (id: string) => {this.router.navigate(['/detallesPedidos/'+id]).then(() => {
    window.location.reload();
  });}

  public redirectToDelete = (id: string) => {}
  public redirectToCreate = () => {this.router.navigate(['/detallesPedidos/0']).then(() => {
    window.location.reload();
  });}
  
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
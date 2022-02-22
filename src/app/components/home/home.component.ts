import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Router } from '@angular/router';
import { DetallesPedidoComponent } from '../detalles-pedido/detalles-pedido.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listadoPedidos: Pedido[];
  constructor(private personaservice: PedidosService) { }

  ngOnInit(): void {

    this.personaservice.listadoPedidos().subscribe(
      {
        next: (data: Pedido[]) => {
          this.listadoPedidos = data
        },
        error: () => {
          console.log("ERROR")
        }
      })
  }
  //     data =>{ { this.listadoPedidos = data; }}, 
  //     error=>{ console.log("ERROR") })

  // }

}

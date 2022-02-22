import { ConsoleLogger } from '@angular/compiler-cli/private/localize';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listadoPedidos:Pedido[];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {

    this.pedidosService.listadoPedidos().subscribe(data => { this.listadoPedidos = data; }, error => { console.log("ERROR") })

  }

}

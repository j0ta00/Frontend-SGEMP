import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() listadoPedidos:Pedido[];
  @Input() headElements = ['ID', 'FechaPedido', 'IdProveedor', 'ImporteTotal'];

  constructor(private personaservice: PedidosService) { }

  ngOnInit(): void {

    this.personaservice.listadoPedidos().subscribe(data => { this.listadoPedidos = data; }, error => { console.log("ERROR") })

    for (let i = 1; i <= this.listadoPedidos.length; i++) {
      this.listadoPedidos.push({ id: this.listadoPedidos[i].id, fechaPedido: this.listadoPedidos[i].fechaPedido, fechaRecepcion: this.listadoPedidos[i].fechaRecepcion, idProveedor: this.listadoPedidos[i].idProveedor, importeTotal: this.listadoPedidos[i].importeTotal, esBorrado: this.listadoPedidos[i].esBorrado });
    }

  }

}

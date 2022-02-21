import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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

  constructor(private personaservice: PedidosService) { }

  ngOnInit(): void {

    this.personaservice.listadoPedidos().subscribe(data => { this.listadoPedidos = data; }, error => { console.log("ERROR") })

  }

    mostrar(variable:String):void {
    console.log(variable)
  }

}

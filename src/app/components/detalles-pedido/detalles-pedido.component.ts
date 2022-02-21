import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  constructor(private pedidosService:PedidosService) { }

  ngOnInit(): void {
    const guardarBtn = document.getElementById("btnGuardar");
    guardarBtn?.addEventListener("click", this.guardarCambios)
    const crearBtn = document.getElementById("btnCrear");
    crearBtn?.addEventListener("click", this.guardarCambios)
    const descartarBtn = document.getElementById("btnDiscard");
    descartarBtn?.addEventListener("click", this.guardarCambios)
  }
  guardarCambios(): void {
    alert("cambios guardados")
  }
  
  descartarCambios(): void {
    alert("cambios descartados")
  }
  
  crearPedido(): void {
    alert("Crear Pedido")
  }

}

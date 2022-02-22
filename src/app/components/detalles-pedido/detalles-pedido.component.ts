import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedidoSeleccionadoId: number;
  constructor(private pedidosService: PedidosService,private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.pedidoSeleccionadoId =Number(this.router.snapshot.paramMap.get('id'));
    this.pedidosService.pedidoPorId(this.pedidoSeleccionadoId);
    // this.pedidosService.pedidoPorId(1).subscribe({
    //   next: (data: Pedido) => {
    //     this.pedidoSeleccionado = data
    //   },
    //   error:()=>{
    //     console.log("Error")
    //   }
    // })
    // this.pedidoSeleccionado;
    const guardarBtn = document.getElementById("btnGuardar");
    guardarBtn?.addEventListener("click", this.guardarCambios);
    const crearBtn = document.getElementById("btnCrear");
    crearBtn?.addEventListener("click", this.guardarCambios);
    const descartarBtn = document.getElementById("btnDiscard");
    descartarBtn?.addEventListener("click", this.guardarCambios);
  }
  guardarCambios(): void {
    alert(this.pedidoSeleccionadoId);
  }

  descartarCambios(): void {
    alert("cambios descartados");
  }

  crearPedido(): void {
    alert("Crear Pedido");
  }

}

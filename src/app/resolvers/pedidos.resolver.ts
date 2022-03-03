import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { PedidosService } from '../services/pedidos.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosResolver implements Resolve<Pedido> {
  constructor(private pedidosService:PedidosService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pedido> {
    return this.pedidosService.pedidoPorId(Number(route.paramMap.get("id"))).pipe(delay(1000))
  }
}

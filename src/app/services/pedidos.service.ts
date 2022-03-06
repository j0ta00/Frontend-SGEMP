import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { Pedido } from '../interfaces/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  urlWebApi = "https://apierpkiosko.azurewebsites.net/api/Pedidos";

  constructor(private http: HttpClient) {  }

  listadoPedidos(): Observable<Pedido[]> { return this.http.get<Pedido[]>(this.urlWebApi); }
    
  pedidoPorId(id: number): Observable<Pedido> {
    var url = this.urlWebApi + "/" + id.toString();
    var pedidoPorId = this.http.get<Pedido>(url).pipe();
    return pedidoPorId;
  }
  insertPedido(pedido: Pedido): void {
    this.http.post<Pedido>(this.urlWebApi, pedido);
  }
  updatePedido(pedido: Pedido){
    this.http.put<Pedido>(this.urlWebApi, pedido);//TODO PUT EN LA API
  }
}

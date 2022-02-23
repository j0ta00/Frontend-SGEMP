import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Pedido } from '../interfaces/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  urlWebApi = "https://crudpersonasasp.azurewebsites.net/api/Persona";

  constructor(private http: HttpClient) { }

  listadoPedidos(): Observable<Pedido[]> { return this.http.get<Pedido[]>(this.urlWebApi); }
  pedidoPorId(id: number): Observable<Pedido> { return this.http.get<Pedido>(this.urlWebApi + "/" + id) }
  //Esto va en otro service o es en este mismo?
  insertPedido(pedido: Pedido): void {
    this.http.post<Pedido>(this.urlWebApi, pedido);
  }
}

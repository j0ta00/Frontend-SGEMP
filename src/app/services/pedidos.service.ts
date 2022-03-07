import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { Pedido } from '../interfaces/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  borrarPedido(id: Number):Observable<number>{
    return this.http.delete<number>("https://apierpkiosko.azurewebsites.net/api/Pedidos/"+id);
  }

  urlWebApi = "https://apierpkiosko.azurewebsites.net/api/Pedidos";

  constructor(private http: HttpClient) {  }

  listadoPedidos(): Observable<Pedido[]> { return this.http.get<Pedido[]>(this.urlWebApi); }
    
  pedidoPorId(id: number): Observable<Pedido> {
    var url = this.urlWebApi + "/" + id.toString();
    var pedidoPorId = this.http.get<Pedido>(url).pipe();
    return pedidoPorId;
  }
  insertPedido(idUsuario: String, idProveedor:Number): void {
    this.http.post<any>("https://apierpkiosko.azurewebsites.net/api/Pedidos",{idUsuario, idProveedor});
  }
}

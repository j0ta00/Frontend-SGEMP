import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { debounceTime, delay, Observable } from 'rxjs'
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
  insertPedido(idUsuario: String, idProveedor:Number): void {
    this.http.post<any>("https://apierpkiosko.azurewebsites.net/api/Pedidos/Usuario/"+idUsuario+"/Proveedor/"+idProveedor,{idUsuario, idProveedor}).subscribe(
      (data) => {

      },
      (error) => {
         console.log(error);
         // get the status as error.status
      });
  }
}

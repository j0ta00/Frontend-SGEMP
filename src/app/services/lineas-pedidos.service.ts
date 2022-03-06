import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { LineaPedidos } from '../interfaces/linea-pedidos';

import { Producto } from '../interfaces/producto';
@Injectable({
  providedIn: 'root'
})
export class LineasPedidosService {


  urlWebApi = "https://apierpkiosko.azurewebsites.net/api/";

  constructor(private http: HttpClient){ 
    
  }
  listadoLineaPedidos(idPedido:Number): Observable<LineaPedidos[]> {
    return this.http.get<LineaPedidos[]>(this.urlWebApi+"LineasPedido/"+idPedido)
  }

}

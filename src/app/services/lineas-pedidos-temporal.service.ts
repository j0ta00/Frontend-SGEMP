import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LineaPedidos } from '../interfaces/linea-pedidos';

@Injectable({
  providedIn: 'root'
})
export class LineasPedidosTemporalService {

  rlWebApi = "http://localhost:22486//api/LineaPedidoTMP";

  constructor(private http: HttpClient) {  }
  insertLineaPedidoTMP(lineaPedidoTmp:any){
    return this.http.post<any>(this.rlWebApi, lineaPedidoTmp);
  }
  updateLineaPedidoTMP(lineaPedido:any){
    return this.http.put<any>(this.rlWebApi, lineaPedido);
  }
}

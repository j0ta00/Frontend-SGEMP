import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LineaPedidos } from '../interfaces/linea-pedidos';

@Injectable({
  providedIn: 'root'
})
export class LineasPedidosTemporalService {

  rlWebApi = "https://apierpkiosko.azurewebsites.net/api/LineaPedidoTMP";

  constructor(private http: HttpClient) {  }
  insertLineaPedidoTMP(lineaPedidoTmp:LineaPedidos){
    return this.http.post(this.rlWebApi, lineaPedidoTmp);
  }
  updateLineaPedidoTMP(lineaPedido:LineaPedidos){
    return this.http.put(this.rlWebApi, lineaPedido);
  }
}

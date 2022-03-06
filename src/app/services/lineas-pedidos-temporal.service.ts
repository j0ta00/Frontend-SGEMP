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
    var dataid;
    return this.http.post<LineaPedidos>(this.rlWebApi, lineaPedidoTmp).subscribe(data=>{dataid=data.idPedido});
  }
  updateLineaPedidoTMP(lineaPedido:LineaPedidos){
    return this.http.put<LineaPedidos>(this.rlWebApi, lineaPedido);
  }
}

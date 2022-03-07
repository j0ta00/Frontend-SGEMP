import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { LineaPedidos } from '../interfaces/linea-pedidos';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineasPedidosTemporalService {

  rlWebApi = "https://apierpkiosko.azurewebsites.net/api/LineaPedidoTMP";

  constructor(private http: HttpClient) {  }
  insertLineaPedidoTMP(lineaPedidoTmp:any){
    console.log(JSON.stringify(lineaPedidoTmp));
    return this.http.post<any>(this.rlWebApi, lineaPedidoTmp);
  }
  updateLineaPedidoTMP(lineaPedido:any){
    return this.http.put<any>(this.rlWebApi, lineaPedido);
  }
}

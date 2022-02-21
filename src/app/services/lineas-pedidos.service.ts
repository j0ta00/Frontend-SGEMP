import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { LineaPedidos } from '../interfaces/linea-pedidos';

@Injectable({
  providedIn: 'root'
})
export class LineasPedidosService {


  urlWebApi = "https://apierpkiosko.azurewebsites.net/LineasPedidos";

  constructor(private http: HttpClient){ 

  }
  listadoLineaPedidos(): Observable<LineaPedidos[]> {
    return this.http.get<LineaPedidos[]>(this.urlWebApi)
  }
}

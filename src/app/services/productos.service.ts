import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { Producto} from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlWebApi = "https://apierpkiosko.azurewebsites.net/api/";

  constructor(private http: HttpClient) { }

  listadoProductosPorProveedor(idProveedor:Number): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlWebApi+"Productos/Proveedores/"+idProveedor);
}
}

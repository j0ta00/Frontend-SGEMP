import { Injectable } from '@angular/core';
import { Proveedor } from '../interfaces/proveedor';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  urlWebApi = "https://apierpkiosko.azurewebsites.net/api/proveedores";
  constructor(private http: HttpClient) { }
  
  listadoProveedores(): Observable<Proveedor[]> { return this.http.get<Proveedor[]>(this.urlWebApi); }
}

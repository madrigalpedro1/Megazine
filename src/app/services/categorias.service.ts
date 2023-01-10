import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  public url = global.url;
  constructor(private http: HttpClient) {}

  obtenerCategoriasNavBar(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'Application/x-www-form-urlencoded'
    );
    return this.http.get(this.url + 'categoria/obtenerCategoriaPublicacion', {
      headers: headers,
    });
  }
}

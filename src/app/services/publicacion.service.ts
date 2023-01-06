import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  public url = global.url;
  constructor(
    private http: HttpClient
  ) { }

  publicarPublicacion(form: any): Observable<any> {

    let json = JSON.stringify(form);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'Application/x-www-form-urlencoded');

    return this.http.post(this.url + 'publicacion/crearPublicacion', params, { headers: headers });
  }
  upload(file: FormData): Observable<any> {
    return this.http.post(this.url + 'publicacion/cargarImagenTarjeta', file);
  }

  obtenetPublicacionesPortada(): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'Application/x-www-form-urlencoded');

    return this.http.get(this.url + 'publicacion/obtenerPublicacionesPortada', { headers: headers });
  }

  obtenetPublicacionePorId(id_publicacion:any): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'Application/x-www-form-urlencoded');

    return this.http.get(this.url + 'publicacion/obtenerPublicacionPorId/'+id_publicacion, { headers: headers });
  }

}

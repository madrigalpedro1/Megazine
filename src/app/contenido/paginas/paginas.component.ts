import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { global } from 'src/app/services/global';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css'],
})
export class PaginasComponent implements OnInit, DoCheck {
  id_publicacion: any;
  titulo: any;
  contenido: any;
  resumen: any;
  imagen: any;
  url = global.url;

  constructor(
    private publicacionService: PublicacionService,
    private rutaActiva: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.id_publicacion = this.rutaActiva.snapshot.paramMap.get('id_publicacion');
    this.obtenerPublicacion(this.id_publicacion);
  }
  ngDoCheck(): void {

    if(this.id_publicacion !=this.rutaActiva.snapshot.paramMap.get('id_publicacion')){
      window.location.reload();
    }

  }

  obtenerPublicacion(id_publicacion: any) {
    this.publicacionService.obtenetPublicacionePorId(id_publicacion).subscribe(
      (response) => {
        this.titulo = response.publicacion[0].titulo_publicacion;
        this.contenido = response.publicacion[0].contenido_publicacion.replace("'",'"');
        this.resumen = response.publicacion[0].resumen_publicacion;
        this.imagen =
          this.url +
          'publicacion/obtenerImagenTarjeta/' +
          response.publicacion[0].img_header_publicacion;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}

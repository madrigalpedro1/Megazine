import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Params  } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit{

  id_publicacion:any;
  titulo:any;
  contenido:any;
  resumen:any;
  imagen:any;

  constructor(
    private publicacionService:PublicacionService,
    private rutaActiva: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.id_publicacion = this.rutaActiva.snapshot.params['id_publicacion'];
    this.obtenerPublicacion(this.id_publicacion)
  }

  obtenerPublicacion(id_publicacion:any){
    this.publicacionService.obtenetPublicacionePorId(id_publicacion).subscribe(
      response => {
        this.titulo = response.publicacion[0].titulo_publicacion;
        this.contenido = response.publicacion[0].contenido_publicacion;
        this.resumen = response.publicacion[0].resumen_publicacion;
        this.imagen =response.publicacion[0].img_header_publicacion;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


}

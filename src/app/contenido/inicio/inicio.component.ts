import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  publicaciones: any;
  url = global.url+'publicacion/obtenerImagenTarjeta/';

  constructor(
    private publicacionService: PublicacionService,
  ) {
  }

  ngOnInit(): void {
    this.obtenerPublicacionPortada();
  }


  obtenerPublicacionPortada() {
    this.publicacionService.obtenetPublicacionesPortada().subscribe(
      response => {
        this.publicaciones = response.publicaciones;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}

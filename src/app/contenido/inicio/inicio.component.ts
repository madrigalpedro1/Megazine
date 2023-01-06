import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  publicaciones: any;

  constructor(
    private publicacionService: PublicacionService
  ) {
  }

  ngOnInit(): void {

    this.obtenerPublicacionPortada();
  }

  obtenerPublicacionPortada() {
    this.publicacionService.obtenetPublicacionesPortada().subscribe(
      response => {
        console.log(response);
        this.publicaciones = response.publicaciones;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../services/categorias.service';
import { global } from '../services/global';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
})
export class ContenidoComponent implements OnInit {
  categorias: any[] = [];
  publicacionesNavBar: any[] = [];
  url = global.url;
  constructor(
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerCategoriasNavBar();
  }

  obtenerCategoriasNavBar() {
    this.categoriasService.obtenerCategoriasNavBar().subscribe(
      (response) => {
        this.categorias = response.categorias;
        this.publicacionesNavBar = response.publicaciones;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido.component';
import { PaginasComponent } from './paginas/paginas.component';
import { InicioComponent } from './inicio/inicio.component';

const contenidoRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'portada',
        component: InicioComponent
      },
      {
        path: 'paginas/:id_publicacion',
        component: PaginasComponent
      }, {
        path: '**',
        redirectTo: 'portada'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'portada'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(contenidoRouting)
  ]
})
export class ContenidoroutingModule { }

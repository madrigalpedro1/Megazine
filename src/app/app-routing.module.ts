import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { AppComponent } from './app.component';
import { ContenidoComponent } from './contenido/contenido.component';

const routes: Routes = [
  {
    path: 'inicio',
    component:ContenidoComponent,
    loadChildren: () => import('./contenido/contenido.module').then(m => m.ContenidoModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
  }, {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

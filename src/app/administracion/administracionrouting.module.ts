import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { ListarPublicacionesComponent } from './listar-publicaciones/listar-publicaciones.component';

const administracionRoutes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    children: [
      {
        path: 'CrearPublicacion',
        component: PublicacionesComponent
      },
      {
        path: 'CrearSlider',
        component: SliderComponent
      },
      {
        path: 'CrearFooter',
        component: FooterComponent
      },
      {
        path: 'ListarPublicaciones',
        component: ListarPublicacionesComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(administracionRoutes)
  ]
})
export class AdministracionroutingModule { }

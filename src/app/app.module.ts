/**
 * Imports Basicos
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
/**
 * Imports Depentencias
 *
 */
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTablesModule } from 'angular-datatables';
/**
 * Imports  Modulos
 */
import { AdministracionModule } from './administracion/administracion.module';
import { AppRoutingModule } from './app-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
/**
 * Imports Componentes
 */
import { AppComponent } from './app.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { PaginasComponent } from './contenido/paginas/paginas.component';
import { InicioComponent } from './contenido/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministracionComponent,
    ContenidoComponent,
    PaginasComponent,
    InicioComponent,
  ],
  imports: [
    NgxEditorModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AdministracionModule,
    FileUploadModule,
    DataTablesModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

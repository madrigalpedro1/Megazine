import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracionroutingModule } from './administracionrouting.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTablesModule } from 'angular-datatables';
import { ListarPublicacionesComponent } from './listar-publicaciones/listar-publicaciones.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [PublicacionesComponent, ListarPublicacionesComponent],
  imports: [
    NgxEditorModule,
    CommonModule,
    RouterModule,
    AdministracionroutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    DataTablesModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [PublicacionesComponent],
})
export class AdministracionModule {}

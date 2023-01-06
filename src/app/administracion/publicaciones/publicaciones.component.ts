import { Component, OnInit, OnDestroy, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { FileUploader } from 'ng2-file-upload';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit, OnDestroy {

  /**CARGAR IMAGENES */
  private fileTmp: any;

  /*** FORMULARIO */
  publicacionForm: FormGroup;

  /** EDITOR ENRIQUECIDO NGX */
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private formBuilder: FormBuilder,
    private publicacionService: PublicacionService
  ) {

    /**
     * Validacion de formulario
     */
    this.publicacionForm = this.formBuilder.group({
      titulo_publicacion: ['', Validators.required],
      resumen_publicacion: ['', Validators.required],
      contenido_publicacion: ['', Validators.required],
      img_car_publicacion: ['', Validators.required],
      img_header_publicacion: ['', Validators.required],
      inicio_publicacion: ['', Validators.required],
      fin_publicacion: ['', Validators.required],
      prioridad_publicacion: ['', Validators.required]
    });
    this.editor = new Editor();
  }

  ngOnInit() {
    this.editor;
  }

  /**
   * Terminan los procesos de editor
   */
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  /**
   * Envio de formulario
   * @param form
   */
  onSubmit(form: any) {

    console.log(form.value);
    this.publicacionService.publicarPublicacion(form.value).subscribe(
      response => {
        console.log(response)
      },
      errors => {
        console.log(<any>errors);
      }
    );

  }

  /**
   * Captura del archivo
   * @param $event
   */
  getFileCARD($event: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name
    }
  }

  getFileSLIDE($event: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name
    }
  }

  /**
   * ENVIO DE IMAGEN
   */
  sendFileCARD(): void {

    const body = new FormData();

    body.append('file0', this.fileTmp.fileRaw, this.fileTmp.fileName);
    this.publicacionService.upload(body).subscribe(
      res => {
        this.publicacionForm.patchValue({
          img_car_publicacion: res.imagen
        });
      }
    )
  }
  sendFileSLIDE(): void {

    const body = new FormData();

    body.append('file0', this.fileTmp.fileRaw, this.fileTmp.fileName);
    this.publicacionService.upload(body).subscribe(
      res => {
        console.log(res);
        console.log(res.imagen);
        this.publicacionForm.patchValue({
          img_header_publicacion: res.imagen
        });
      }
    )
  }

}

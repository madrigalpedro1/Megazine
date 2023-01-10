import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { FileUploader } from 'ng2-file-upload';
import { PublicacionService } from 'src/app/services/publicacion.service';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements OnInit, OnDestroy {
  /**CARGAR IMAGENES */
  private fileTmp: any;

  /*** FORMULARIO */
  publicacionForm: FormGroup;

  /** EDITOR ENRIQUECIDO NGX */
  name = 'Angular';
  // Opciones del editor WYSIWYG
  public froalaOptions: Object = {
    placeholderText: '',
    charCounterCount: false,
    useClasses: true,
    htmlRemoveTags: [],
    events: {
      'image.beforeUpload': (val1: any, val2: any, val3: any) =>
        console.log(val1), // Para que las imÃ¡genes las inserte como base64 en el HTML
      contentChanged: () => {
        console.log('dirty');
      },
      'commands.after': (cmd: any, parm1: any, parm2: any) => {
        if (cmd === 'html') console.log('afterCodeView');
      },
    },
    // events : {
    //   'froalaEditor.image.beforeUpload' : (val1, val2, val3) => this.imgToBase64(val1, val2, val3), // Para que las imágenes las inserte como base64 en el HTML
    //   'froalaEditor.contentChanged' : () => this.form.markAsDirty(),
    //    // aqui deshabilitamos el botón aceptar cuando estamoen modo Código
    //   'froalaEditor.commands.after' : () => this.isActive(),

    // },
    attribution: false,
    heightMin: 300,
    toolbarButtons: {
      moreParagraph: {
        buttons: [
          'alignLeft',
          'alignJustify',
          'formatOLSimple',
          'alignRight',
          'alignJustify',
          'formatOL',
          'formatUL',
          'paragraphFormat',
          'paragraphStyle',
          'lineHeight',
          'outdent',
          'indent',
          'quote',
        ],
        align: 'left',
        buttonsVisible: 3,
      },
      moreText: {
        buttons: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          'fontSize',
          'textColor',
          'backgroundColor',
          'inlineClass',
          'inlineStyle',
          'clearFormatting',
        ],
        align: 'left',
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          'insertLink',
          'insertImage',
          /* 'insertVideo', */ 'insertTable' /* 'emoticons' */,
          ,
          'fontAwesome',
          /*'specialCharacters',   'embedly' , 'insertFile',*/ 'insertHR',
        ],
        align: 'left',
        buttonsVisible: 3,
      },
      moreMisc: {
        buttons: [
          'varinsert',
          'plantillaSearch',
          'undo',
          'redo',
          'fullscreen',
          'print',
          /*'getPDF',   'spellChecker',*/ 'selectAll',
          'html',
          'help',
        ],
        align: 'right',
        buttonsVisible: 5,
      },
    },
    // toolbarButtons:
    //     [
    //       ['bold', 'italic', 'subscript', 'superscript'],
    //       ['fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'lineHeight', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote'],
    //       ['insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable','fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting'],
    //       ['varinsert', 'plantillaSearch', 'print', 'getPDF', 'spellChecker', 'help', 'html', 'undo', 'redo']
    //     ],
    // toolbarButtonsMD:
    //     ['fullscreen', '|', 'bold', 'italic', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', '|', 'varinsert', 'plantillaSearch'] ,
    // toolbarButtonsSM:
    //     ['fullscreen', '|', 'bold', 'italic', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', '|', 'varinsert', 'plantillaSearch'] ,
    // toolbarButtonsXS:
    //     ['fullscreen', '|', 'bold', 'italic', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', '|', 'varinsert', 'plantillaSearch'] ,
  };
  htmlTemplate = '';
  initControls: any;
  editor: any;

  // Función para inicializar le froala
  initFroala(initControls: any) {
    initControls.initialize();
    this.initControls = initControls;
    this.editor = initControls.getEditor();
  }

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
      prioridad_publicacion: ['', Validators.required],
    });
  }

  ngOnInit() {}

  /**
   * Terminan los procesos de editor
   */
  ngOnDestroy(): void {}

  /**
   * Envio de formulario
   * @param form
   */
  onSubmit(form: any) {
    Swal.fire({
      title: 'Desea Registrar esta Publicación?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.publicacionService.publicarPublicacion(form.value).subscribe(
          (response) => {
            if (response.estatus == 'correcto') {
              Swal.fire(
                'Bravo!',
                'Publicacion Registrada Correctamente',
                'success'
              );
            } else {
              Swal.fire('No se pudo registrar la Publicación', '', 'error');
            }
          },
          (errors) => {
            console.log(<any>errors);
            Swal.fire('No se pudo registrar la Publicación', '', 'error');
          }
        );
      } else if (result.isDenied) {
        Swal.fire('No se pudo registrar la Publicación', '', 'error');
      }
    });
  }

  /**
   * Captura del archivo
   * @param $event
   */
  getFileCARD($event: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    };
  }

  getFileSLIDE($event: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    };
  }

  /**
   * ENVIO DE IMAGEN
   */
  sendFileCARD(): void {
    const body = new FormData();

    body.append('file0', this.fileTmp.fileRaw, this.fileTmp.fileName);
    this.publicacionService.upload(body).subscribe((res) => {
      this.publicacionForm.patchValue({
        img_car_publicacion: res.imagen,
      });
    });
  }
  sendFileSLIDE(): void {
    const body = new FormData();

    body.append('file0', this.fileTmp.fileRaw, this.fileTmp.fileName);
    this.publicacionService.upload(body).subscribe((res) => {
      console.log(res);
      console.log(res.imagen);
      this.publicacionForm.patchValue({
        img_header_publicacion: res.imagen,
      });
    });
  }
}

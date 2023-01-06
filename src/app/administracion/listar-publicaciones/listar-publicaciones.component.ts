import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-listar-publicaciones',
  templateUrl: './listar-publicaciones.component.html',
  styleUrls: ['./listar-publicaciones.component.css']
})
export class ListarPublicacionesComponent implements OnInit, OnDestroy {

  public global = global.url;
  dtOptions: DataTables.Settings = {};
  publicaciones: any[] = [];

  // We use this trigger because fetching the list of anys can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      lengthMenu:[15,30,60,120],
      language:{
        url:'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-MX.json'
      }
    };
    this.httpClient.get<any[]>(this.global + 'publicacion/obtenerPublicaciones')
      .subscribe(data => {
        console.log(data);
        this.publicaciones = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(this.dtOptions);
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

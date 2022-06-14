import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Card_ } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  constructor(public cardService: CardService) {}

  public data: Card_[] = [];
  public cardArray: Card_[] = [];
  public allCardArray: Card_[] = [];
  public inputSearch = '';

  private filterValue: string;

  ngOnInit() {
    const parameters = this.checkUrlParameters();
    if (parameters.length == 0) {
      this.refreshDataSource('');
    } else if (parameters.length == 1 && parameters[0].key == 'search') {
      console.log('Searching for: ' + parameters[0].value);
      this.refreshDataSource(parameters[0].value);
    }
  }

  // Función que carga un array de objetos Card_ extraida del JSON generado y que filtra por id y texto
  public refreshDataSource(filterValue: string) {
    this.cardService
      .getCards(filterValue)
      .pipe(take(1))
      .subscribe((response) => {
        this.cardArray = response;
      });
  }

  // Función que extrae el valor del texto introducido, lo procesa y lo pasa a la función para que carge las tarjetas filtradas
  public applyFilter(filter: KeyboardEvent) {
    this.cardArray = [];
    this.filterValue = (<HTMLTextAreaElement>filter.target).value
      .trim()
      .toLowerCase();
    this.refreshDataSource(this.filterValue);
  }

  // Funcion trackBy para optimizar la carga del ngFor
  public trackById(index: number, item: Card_): number {
    return parseInt(item.id);
  }

  // Vamos a capturar los parametros de la url con un sencillo codigo
  private checkUrlParameters() {
    let url = window.location.href;
    const has_params = url.indexOf('?') > -1;
    const key_values = [];
    if (has_params) {
      url = url.replace(/&amp;/g, '&');
      const params_part = url.split('?')[1];
      const params = params_part.split('&');
      for (let i = 0; i < params.length; i++) {
        const k_v = params[i].split('=');
        const param = { key: k_v[0], value: k_v[1] };
        key_values.push(param);
      }
    }
    return key_values;
  }
}

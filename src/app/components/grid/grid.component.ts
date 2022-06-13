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
    this.refreshDataSource('');
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
}

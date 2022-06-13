import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Card_ } from '../models/card';

@Injectable()
export class CardService {
  private cardArray: Observable<Card_[]>;
  private cardsUrl = 'http://localhost:3333/graphic-cards';
  noData = false;
  constructor(private http: HttpClient) {}

  // Función que carga el array de imágenes cuando se inicia la app
  init() {
    this.cardArray = new Observable((observer) => {
      this.getJSON()
        .pipe(take(1))
        .subscribe((response: Card_[]) => {
          observer.next(response);
        });
    });
  }

  // Servicio que devuelve el resultado del JSON de tipo Card_[] generado via api rest
  private getJSON(): Observable<Card_[]> {
    const obsCardArray = this.http.get<Card_[]>(this.cardsUrl).pipe(
      tap((data) => this.buildCardArray(JSON.stringify(data))),
      catchError(this.handleError)
    );
    return obsCardArray;
  }

  // Se genera el array de objetos Card_ extraida del JSON generado
  private buildCardArray(data: string): Card_[] {
    const json = JSON.parse(data);
    const cards: Card_[] = [];
    for (let i = 0; i < json.length; i++) {
      const json_card = json[i];
      const card = new Card_(
        json_card.id,
        json_card.image,
        json_card.name,
        json_card.manufacturer,
        json_card.model,
        json_card.assembler,
        json_card.price
      );
      cards.push(card);
    }
    return cards;
  }

  // Manejador de errores rest
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Función que devuelve un array de objetos Card_ extraida del JSON generado y que puede filtrar por id y nombre
  public getCards(filter: string): Observable<Card_[]> {
    return this.cardArray.pipe(
      map((res) => {
        if (filter === '') {
          this.noData = false;
          return res;
        } else {
          const resFiltered = res.filter(
            (x: Card_) =>
              x.name.toLocaleLowerCase().includes(filter) ||
              x.id.toString().includes(filter)
          );
          resFiltered.length === 0
            ? (this.noData = true)
            : (this.noData = false);
          return resFiltered;
        }
      })
    );
  }

  // Funcion que devuelve si esxisten o no datos tras realizar una búsqueda
  noDataReturned(): boolean {
    return this.noData;
  }
}

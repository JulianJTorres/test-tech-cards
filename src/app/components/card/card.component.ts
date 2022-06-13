import { Component, Input, OnInit } from '@angular/core';
import { Card_ } from 'src/app/models/card';

@Component({
  selector: 'app-image',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() grafcard: Card_;
  // showCard: boolean; Abría que añadirlo como ngIf en la <mat-card>
  constructor() {}
  ngOnInit(): void {
    console.log('CardComponent ngOnInit called', this.grafcard);
  }
  cardError(id: number): string {
    return ' La tarjeta ' + id + ' no ha sido encontrada.';
  }
}

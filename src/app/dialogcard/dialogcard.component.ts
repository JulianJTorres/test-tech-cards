import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Card_ } from '../models/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-dialogcard',
  templateUrl: './dialogcard.component.html',
  styleUrls: ['./dialogcard.component.css']
})
export class DialogcardComponent implements OnInit {
  dcard: Card_;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Card_,
    public cardService: CardService
  ) {}

  ngOnInit(): void {
    console.log('DialogcardComponent ngOnInit called', this.data);
    this.cardService
      .getJSONbyId(this.data.id)
      .pipe(take(1))
      .subscribe((response) => {
        this.dcard = response[0];
      });
  }
}

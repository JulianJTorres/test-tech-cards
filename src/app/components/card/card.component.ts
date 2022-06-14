import { Component, Input, OnInit } from '@angular/core';
import { DialogcardComponent } from 'src/app/dialogcard/dialogcard.component';
import { Card_ } from 'src/app/models/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() grafcard: Card_;
  // showCard: boolean; Abría que añadirlo como ngIf en la <mat-card>
  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  cardError(id: string): string {
    return ' La tarjeta ' + id + ' no ha sido encontrada.';
  }

  myMouseClicked(event: MouseEvent): void {
    console.log('Mouse Clicked ', (event.target as Element).id);
    console.log('Mouse Clicked ', this.grafcard);
    this.openDialog();
  }

  openDialog(): void {
    console.log('Open Modal');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.grafcard;
    this.matDialog.open(DialogcardComponent, dialogConfig); //Abre el componente Modal/Dialog con la configuracion indicada, incluido el objeto Card_
  }
}

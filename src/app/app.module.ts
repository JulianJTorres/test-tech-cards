import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CardService } from './services/card.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DialogcardComponent } from './dialogcard/dialogcard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GridComponent,
    DialogcardComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    //Material
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    MatToolbarModule,
    ScrollingModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    //HTML Layout
    FlexLayoutModule,
    //Infinite scroll
    InfiniteScrollModule,
    // Lazy loading for images
    LazyLoadImageModule,
    RouterModule
  ],
  exports: [GridComponent],
  providers: [
    // Card service
    CardService,
    // Provider encargado de llamar al servicio de tarjetas cuando se carga el m??dulo.
    {
      provide: APP_INITIALIZER,
      useFactory: initFunction,
      deps: [CardService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

// Funci??n que se ejecuta cuendo se carga el m??dulo. Llama a la funci??n del servicio para que cargue JSON desde la API
export function initFunction(config: CardService) {
  return () => config.init();
}

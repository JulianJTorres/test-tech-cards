import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { CardService } from 'src/app/services/card.service';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [HttpClientModule, AppModule],
      providers: [CardService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.grafcard = {
      id: 1,
      image: 'https://i.picsum.photos/id/9/500/500.jpg',
      name: 'Prueba',
      manufacturer: 'Prueba',
      model: 'Prueba',
      assembler: 'Prueba'
    };
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Renderiza el @Input Card_', async () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('https://i.picsum.photos/id/9/5');
    expect(compiled.querySelector('img').id).toContain('1');
    expect(compiled.textContent.trim()).toBe('Prueba');
  });
});

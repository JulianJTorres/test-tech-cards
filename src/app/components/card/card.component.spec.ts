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
      id: '1',
      image:
        'https://thumb.pccomponentes.com/w-300-300/articles/35/357848/1157-msi-geforce-rtx-3060-ventus-2x-oc-12gb-gddr6.jpg',
      name: 'MSI GeForce RTX 3060 VENTUS 2X OC LHR 12GB GDDR6',
      manufacturer: 'MSI',
      model: 'GeForce RTX 3060',
      assembler: 'Assembled by Nvidia',
      price: '460,99'
    };
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Renderiza el @Input Card_', async () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain(
      'https://thumb.pccomponentes.com/w-300-300/articles/35/357848/1157-msi-geforce-rtx-3060-ventus-2x-oc-12gb-gddr6.jpg'
    );
    expect(compiled.querySelector('img').id).toContain('1');
    expect(compiled.textContent.trim()).toContain('MSI');
    expect(compiled.textContent.trim()).toContain('GeForce RTX 3060');
  });
});

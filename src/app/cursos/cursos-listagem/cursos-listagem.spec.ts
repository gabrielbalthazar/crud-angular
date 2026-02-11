import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosListagemComponent } from './cursos-listagem';

describe('Cursos', () => {
  let component: CursosListagemComponent;
  let fixture: ComponentFixture<CursosListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursosListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosListagemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

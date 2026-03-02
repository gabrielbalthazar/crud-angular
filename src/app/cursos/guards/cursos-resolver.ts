import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

import { Curso } from './../model/curso';
import { CursosService } from '../services/cursos.service';

export const cursosResolver: ResolveFn<Curso> = (route, state) => {
  const service = inject(CursosService);

  const id = route.params['id'];

  if (id) {
    return service.getById(id);
  }

  return of({ id: 0, nome: '', categoria: '', aula: [] } as Curso);
};

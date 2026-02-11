import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../model/curso';
import { catchError, delay, first, pipe, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private readonly API = 'api/cursos';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getListCursos() {
    return this.httpClient.get<Curso[]>(this.API)
      .pipe(
        first(),
      );
  }

  save(body: { nome: any; categoria: any; }) {
    return this.httpClient.post<Curso>(this.API, body)
      .pipe(
        first(),
      );

  }

}

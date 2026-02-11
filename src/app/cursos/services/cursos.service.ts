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

  getById(id: number) {
    return this.httpClient.get<Curso>(`${this.API}/${id}`)
      .pipe(
        first(),
      );
  }

  save(body: Partial<Curso>) {
    return this.httpClient.post<Curso>(this.API, body).pipe(
      first()
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(
      first()
    );
  }

}

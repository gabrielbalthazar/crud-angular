import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../model/curso';
import { delay, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private readonly API = 'http://localhost:3000/cursos';

  constructor(
    private httpClient: HttpClient
  ) { }

  getListCursos() {
    return this.httpClient.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(cursos => console.log(cursos))
      );
  }

}

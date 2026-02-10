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
    console.log('1. Service: getListCursos chamado');
    return this.httpClient.get<Curso[]>(this.API)
      .pipe(
        tap(() => console.log('2. Service: Resposta recebida do servidor')),
      );
  }

}

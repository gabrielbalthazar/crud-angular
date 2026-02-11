import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cursosResolver } from './cursos-resolver';

describe('cursosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cursosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

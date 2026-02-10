import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos/cursos';
import { CursoFormComponent } from './curso-form/curso-form';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent
  },
  {
    path: 'cadastro',
    component: CursoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

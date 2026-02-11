import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosListagemComponent } from './cursos-listagem/cursos-listagem';
import { CursosFormComponent } from './cursos-form/cursos-form';

const routes: Routes = [
  {
    path: '',
    component: CursosListagemComponent
  },
  {
    path: 'cadastro',
    component: CursosFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

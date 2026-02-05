import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cursos } from './cursos/cursos';

const routes: Routes = [
  {
    path: '',
    component: Cursos
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

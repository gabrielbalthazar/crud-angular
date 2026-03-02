import { AlertService } from '../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { Location } from '@angular/common';
import { Curso } from '../model/curso';
import { Aula } from '../model/aula';

@Component({
  selector: 'app-cursos-form',
  standalone: false,
  templateUrl: './cursos-form.html',
  styleUrl: './cursos-form.scss',
  providers: [CursosService],
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;

  get aulas(): FormArray {
    return this.form.get('aulas') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CursosService,
    private alertService: AlertService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const curso: Curso = this.activatedRoute.snapshot.data['curso'];
    this.getDadosEdit();
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(100)]],
      categoria: [null, [Validators.required]],
      aulas: this.formBuilder.array(this.getAulas(curso), [Validators.required]),
    });
  }

  private getAulas(curso: Curso) {
    if (!curso.aulas || curso.aulas.length === 0) {
      return [this.criarAula()];
    }
    return curso.aulas.map(aula => this.criarAula(aula));
  }

  private criarAula(aula: Aula = { id: 0, titulo: '', url: '' }) {
    return this.formBuilder.group({
      id: [aula.id],
      titulo: [aula.titulo, Validators.required],
      url: [aula.url, Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)],
    });
  }

  // Funções de aulas
  addAula() {
    this.aulas.push(this.criarAula());
  }

  removeAula(index: number) {
    this.aulas.removeAt(index);
  }

  // Get informações
  getDadosEdit() {
    this.service.getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (curso) => {
          this.form.patchValue(
            {
              ...curso,
            }
          );
        }
      })
  }

  // Salvar e Atualizar
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.save(this.form.value)
      .subscribe({
        next: () => {
          this.alertService.showAlert('Curso salvo com sucesso!', 'success');
          this.returnButton();
        },
        error: () => {
          this.alertService.showAlert('Erro ao salvar curso', 'error')
        }
      });
  }

  returnButton() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const control = this.form.get(fieldName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }

    return 'Campo Inválido';
  }

  isFormArrayRequired(){
    const aulas = this.form.get('aulas') as FormArray;
    return !aulas.valid && aulas.hasError('required') && aulas.touched;
  }


}

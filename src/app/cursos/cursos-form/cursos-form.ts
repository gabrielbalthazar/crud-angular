import { AlertService } from '../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { Location } from '@angular/common';
import { Curso } from '../model/curso';

@Component({
  selector: 'app-cursos-form',
  standalone: false,
  templateUrl: './cursos-form.html',
  styleUrl: './cursos-form.scss',
  providers: [CursosService],
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CursosService,
    private alertService: AlertService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const curso: Curso = this.activatedRoute.snapshot.data['curso'];
    this.getDadosEdit();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      categoria: [null, Validators.required],
    });
  }

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

  onSubmit() {
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


}

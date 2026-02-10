import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { AlertMessageComponent } from '../../shared/components/alert-message/alert-message';
import { Location } from '@angular/common';

@Component({
  selector: 'app-curso-form',
  standalone: false,
  templateUrl: './curso-form.html',
  styleUrl: './curso-form.scss',
})
export class CursoFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CursosService,
    private AlertService: AlertService,
    private location: Location,
  ) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    this.form = this.formBuilder.group({
      nome: [null],
      categoria: [null]
    });
  }

  onSubmit() {
    const body = {
      nome: this.form.value.nome,
      categoria: this.form.value.categoria
    }
    this.service.save(body)
      .subscribe({
        next: () => {
          this.AlertService.showAlert('Curso salvo com sucesso!', 'success');
          this.returnButton();
        },
        error: () => {
          this.AlertService.showAlert('Erro ao salvar curso', 'error')
        }
      });
  }

  returnButton() {
    this.location.back();
  }


}

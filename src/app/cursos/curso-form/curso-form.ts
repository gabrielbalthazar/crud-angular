import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      nome: [null],
      categoria: [null]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  returnButton() {
    this.router.navigate(['cursos']);
  }

  ngOnInit(): void {

  }
}

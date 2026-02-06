import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Curso } from '../model/curso';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CursosService } from '../services/cursos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
  providers: [CursosService]
})
export class CursosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'categoria'];

  dataSource = new MatTableDataSource<Curso>([]);

  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CursosService
  ) {}

 ngOnInit(): void {
    this.service.getListCursos().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        console.error("Erro ao carregar cursos");
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

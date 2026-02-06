import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Curso } from '../model/curso';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class CursosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'categoria'];

  dataSource: MatTableDataSource<Curso>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cursos: Curso[] = [
    { id: 1, nome: 'Angular', categoria: 'Front-end' }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.cursos);
  }

  ngOnInit(): void {
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

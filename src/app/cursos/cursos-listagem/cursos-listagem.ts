import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Curso } from '../model/curso';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CursosService } from '../services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from '../../shared/components/table/table';

@Component({
  selector: 'app-cursos-listagem',
  standalone: false,
  templateUrl: './cursos-listagem.html',
  styleUrl: './cursos-listagem.scss',
  providers: [CursosService]
})
export class CursosListagemComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Curso>([]);
  meusDados: Curso[] = [];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  readonly columns: TableColumn[] = [
    { columnDef: 'id', header: 'ID', cell: (row) => `${row.id}` },
    { columnDef: 'nome', header: 'Nome', cell: (row) => `${row.nome}` },
    { columnDef: 'categoria', header: 'Categoria', cell: (row) => `${row.categoria}` },
  ];

  ngOnInit() {
    this.getListaPaginado();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListaPaginado() {
    this.service.getListCursos().subscribe({
      next: (dados) => {
        this.meusDados = dados;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.alertError('Erro ao carregar cursos.');
      }
    });
  }


  onAddCurso() {
    this.router.navigate(['cadastro'], { relativeTo: this.route });
  }

  onEditCurso(id: number) {

  }

  deleteCurso(id: number) {

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  alertError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}

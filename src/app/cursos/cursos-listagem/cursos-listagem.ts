import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Curso } from '../model/curso';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CursosService } from '../services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from '../../shared/components/table/table';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog';
import { AlertService } from '../../shared/services/alert.service';

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
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
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
    this.isLoading = true;
    this.service.getListCursos()
      .subscribe({
        next: (dados) => {
          this.meusDados = [...dados];
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
  }

  onAddCurso() {
    this.router.navigate(['cadastro'], { relativeTo: this.route });
  }

  onEditCurso(curso: Curso) {
    this.router.navigate(['editar', curso.id], { relativeTo: this.route });
  }

  openModalDelete(curso: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Curso',
        message: `Tem certeza que deseja excluir o curso "${curso.nome}"?`,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDelete(curso.id);
      }
    });
  }

  confirmDelete(id: number) {
    setTimeout(() => this.isLoading = true, 0);
    this.service.delete(id).subscribe({
      next: () => {
        this.alertService.showAlert('Curso deletado com sucesso!', 'success');
        this.getListaPaginado();
        setTimeout(() => this.isLoading = false, 0);
      },
      error: () => {
        this.alertService.showAlert('Erro ao salvar curso', 'error')
        setTimeout(() => this.isLoading = false, 0);
      }
    });
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

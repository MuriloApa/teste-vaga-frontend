import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, merge, of, startWith, Subject, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Tipo } from '../../models/tipo.model';
import { TiposInativosService } from './tipos-inativos.service';
import { TiposAtivarComponent } from '../tipos/tipos-ativar/tipos-ativar.component';

@Component({
  selector: 'app-tipos-inativos',
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule, MatPaginator, MatButtonModule],
  templateUrl: './tipos-inativos.component.html',
  styleUrl: './tipos-inativos.component.scss'
})
export class TiposInativosComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  dataSource = new MatTableDataSource<Tipo>(); // Substitui o array `data`
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'status', 'descricao', 'actions'];
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly tiposInativosService: TiposInativosService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Conecta o paginador à tabela

    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tiposInativosService
            .list()
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data) {
            this.resultsLength = data.length;
            this.dataSource.data = data; // Atualiza os dados da tabela
            return data;
          }
          return [];
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ativar(tipo: Tipo): void {
    const dialogRef = this.dialog.open(TiposAtivarComponent, {
      data: tipo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tiposInativosService.ativar(tipo.id).subscribe(() => {
          this.paginator.firstPage(); // Volta para a primeira página
          this.refresh.next(true); // Recarrega os dados
          this.tiposInativosService.showMessage('Tipo ativado com sucesso!');
        });
      }
    });
  }
}


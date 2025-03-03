import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, merge, of, startWith, Subject, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { TiposService } from '../tipos.service';
import { TiposDesativarComponent } from '../tipos-desativar/tipos-desativar.component';
import { Tipo } from '../../../models/tipo.model';

@Component({
  selector: 'app-tipos-list',
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule, MatPaginator, MatButtonModule],
  templateUrl: './tipos-list.component.html',
  styleUrl: './tipos-list.component.scss'
})
export class TiposListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  dataSource = new MatTableDataSource<Tipo>(); // Substitui o array `data`
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'actions'];
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly tiposService: TiposService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Conecta o paginador à tabela

    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tiposService
            .list()
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data) {
            this.resultsLength = data.length;
            this.dataSource.data = data;
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

  desativar(user: User): void {
    const dialogRef = this.dialog.open(TiposDesativarComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tiposService.desativar(user.id).subscribe(() => {
          this.paginator.firstPage(); // Volta para a primeira página
          this.refresh.next(true); // Recarrega os dados
          this.tiposService.showMessage('Tipo desativado com sucesso!');
        });
      }
    });
  }

  navigateToTiposCreate(): void {
    this.router.navigate(['/tipos/create']);
  }
}

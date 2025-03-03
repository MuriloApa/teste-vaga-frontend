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
import { Contato } from '../../../models/contato.model';
import { ContatosService } from '../contatos.service';
import { ContatosDesativarComponent } from '../contatos-desativar/contatos-desativar.component';

@Component({
  selector: 'app-contatos-list',
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule, MatPaginator, MatButtonModule],
  templateUrl: './contatos-list.component.html',
  styleUrl: './contatos-list.component.scss'
})
export class ContatosListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  dataSource = new MatTableDataSource<Contato>();
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'nome','id_usuario', 'id_tipo', 'valor', 'actions'];
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly contatosService: ContatosService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.contatosService
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

  desativar(contato: Contato): void {
    const dialogRef = this.dialog.open(ContatosDesativarComponent, {
      data: contato,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contatosService.desativar(contato.id).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.contatosService.showMessage('Contato desativado com sucesso!');
        });
      }
    });
  }

  navigateToTiposCreate(): void {
    this.router.navigate(['/contatos/create']);
  }
}

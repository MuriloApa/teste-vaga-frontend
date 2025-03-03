import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, merge, of, startWith, Subject, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Contato } from '../../models/contato.model';
import { ContatosInativosService } from './contatos-inativos.service';
import { ContatosAtivarComponent } from '../contatos/contatos-ativar/contatos-ativar.component';

@Component({
  selector: 'app-contatos-inativos',
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule, MatPaginator, RouterLink, MatButtonModule],
  templateUrl: './contatos-inativos.component.html',
  styleUrl: './contatos-inativos.component.scss'
})
export class ContatosInativosComponent  implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  dataSource = new MatTableDataSource<Contato>(); // Substitui o array `data`
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'status', 'nome','id_usuario', 'id_tipo', 'valor', 'actions'];
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly contatosInativosService: ContatosInativosService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Conecta o paginador à tabela

    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.contatosInativosService
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

  ativar(tipo: Contato): void {
    const dialogRef = this.dialog.open(ContatosAtivarComponent, {
      data: tipo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contatosInativosService.ativar(tipo.id).subscribe(() => {
          this.paginator.firstPage(); // Volta para a primeira página
          this.refresh.next(true); // Recarrega os dados
          this.contatosInativosService.showMessage('Contato ativado com sucesso!');
        });
      }
    });
  }

}


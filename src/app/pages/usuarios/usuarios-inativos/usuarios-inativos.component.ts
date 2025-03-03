import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  merge,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosInativosService } from './usuarios-inativos.service';
import { User } from '../../../models/user.model';
import { UsuariosAtivarComponent } from '../usuarios-ativar/usuarios-ativar.component';

@Component({
  selector: 'app-usuarios-inativos',
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatButtonModule,
  ],
  templateUrl: './usuarios-inativos.component.html',
  styleUrl: './usuarios-inativos.component.scss',
})
export class UsuariosInativosComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  dataSource = new MatTableDataSource<User>();
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'senha', 'actions'];
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly usuariosInativosService: UsuariosInativosService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.usuariosInativosService
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

  ativar(user: User): void {
    const dialogRef = this.dialog.open(UsuariosAtivarComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuariosInativosService.ativar(user.id).subscribe(() => {
          this.paginator.firstPage(); // Volta para a primeira página
          this.refresh.next(true); // Recarrega os dados
          this.usuariosInativosService.showMessage(
            'Usuário ativado com sucesso!'
          );
        });
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, merge, of, startWith, Subject, Subscription, switchMap } from 'rxjs';
import { UsuariosService } from '../usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosDesativarComponent } from '../usuarios-desativar/usuarios-desativar.component';

@Component({
  selector: 'app-usuarios-list',
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule, MatPaginator, MatButtonModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss',
})
export class UsuariosListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  dataSource = new MatTableDataSource<User>(); // Substitui o array `data`
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'senha', 'actions'];
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly usuariosService: UsuariosService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Conecta o paginador à tabela

    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.usuariosService
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

  desativar(user: User): void {
    const dialogRef = this.dialog.open(UsuariosDesativarComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuariosService.desativar(user.id).subscribe(() => {
          this.paginator.firstPage(); // Volta para a primeira página
          this.refresh.next(true); // Recarrega os dados
          this.usuariosService.showMessage('Usuário desativado com sucesso!');
        });
      }
    });
  }

  navigateToUsuariosCreate(): void {
    this.router.navigate(['/usuarios/create']);
  }
}

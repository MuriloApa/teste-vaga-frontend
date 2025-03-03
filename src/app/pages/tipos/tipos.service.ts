import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { Tipo } from '../../models/tipo.model';

@Injectable({
  providedIn: 'root',
})
export class TiposService {
  baseApi: string = '/tipo';

  constructor(
    protected readonly snackBar: MatSnackBar,
    protected readonly http: HttpClient
  ) {}

  create(objeto: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(environment.URL_BASE + this.baseApi, objeto);
  }

  list(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(
      environment.URL_BASE + this.baseApi + 's/ativos'
    );
  }

  desativar(id?: number): Observable<void> {
    return this.http.put<void>(
      environment.URL_BASE + this.baseApi + `/${id}` + '/status/',
      null
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 50000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
}

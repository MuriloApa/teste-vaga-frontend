import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  baseApi: string = '/';

  constructor(
    protected readonly snackBar: MatSnackBar,
    protected readonly http: HttpClient
  ) {}

  create(objeto: T): Observable<T> {
    return this.http.post<T>(environment.URL_BASE + this.baseApi, objeto);
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(environment.URL_BASE + this.baseApi + 's/ativos');
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

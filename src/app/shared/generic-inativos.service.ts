import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericInativosService<T> {
  baseApi: string = '/';

  constructor(
    protected readonly snackBar: MatSnackBar,
    protected readonly http: HttpClient
  ) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(
      environment.URL_BASE + this.baseApi + 's/inativos'
    );
  }

  ativar(id?: number): Observable<void> {
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

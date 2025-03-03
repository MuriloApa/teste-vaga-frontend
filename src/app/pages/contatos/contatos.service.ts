import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { Contato } from '../../models/contato.model';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  baseApi: string = '/contato';

  constructor(
    protected readonly snackBar: MatSnackBar,
    protected readonly http: HttpClient
  ) {}

  create(objeto: Contato): Observable<Contato> {
    return this.http.post<Contato>(environment.URL_BASE + this.baseApi, objeto);
  }

  list(): Observable<Contato[]> {
    return this.http.get<Contato[]>(
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

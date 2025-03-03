import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroments';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { GenericService } from '../../../shared/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UsuariosInativosService {
  baseApi: string = '/usuario';

  constructor(
    protected readonly snackBar: MatSnackBar,
    protected readonly http: HttpClient
  ) {}

  list(): Observable<User[]> {
    return this.http.get<User[]>(
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

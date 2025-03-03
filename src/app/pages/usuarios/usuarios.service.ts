import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/generic.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{

  baseApi: string = '/usuario';

  constructor(
      protected readonly snackBar: MatSnackBar,
      protected readonly http: HttpClient
    ) {}

    create(objeto: User): Observable<User> {
      return this.http.post<User>(environment.URL_BASE + this.baseApi, objeto);
    }


    list(): Observable<User[]> {
      return this.http.get<User[]>(
        environment.URL_BASE + this.baseApi + 's/ativos'
      );
    }

    desativar(id?: number): Observable<void>{
      return this.http.put<void>(environment.URL_BASE + this.baseApi + `/${id}` + '/status/', null);
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

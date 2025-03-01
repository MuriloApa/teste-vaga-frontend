import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { ResponseDataList } from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  baseApi: string = '/';

  constructor(
    protected readonly snackBar: MatSnackBar,
    protected readonly http: HttpClient
  ) {}

  create(objeto: T): Observable<T> {
    return this.http.post<T>(
      environment.URL_BASE + this.baseApi,
      objeto
    );
  }

  update(id: number, objeto: T): Observable<T> {
    return this.http.patch<T>(
      environment.URL_BASE + this.baseApi + `/${id}`,
      objeto
    );
  }


  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<T>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<T>>(
      environment.URL_BASE + this.baseApi,
      { params }
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contato } from '../../../models/contato.model';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { GenericInativosService } from '../../../shared/generic-inativos.service';

@Injectable({
  providedIn: 'root',
})
export class ContatosInativosService extends GenericInativosService<Contato>{
  override baseApi: string = '/contato';

  override list(): Observable<Contato[]> {
    return this.http.get<Contato[]>(
      environment.URL_BASE + this.baseApi + 's/inaltivos'
    );
  }
}

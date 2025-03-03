import { GenericInativosService } from './../../../shared/generic-inativos.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tipo } from '../../../models/tipo.model';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiposInativosService extends GenericInativosService<Tipo>{
  override baseApi: string = '/tipo';
}

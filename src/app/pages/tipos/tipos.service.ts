import { Injectable } from '@angular/core';
import { Tipo } from '../../models/tipo.model';
import { GenericService } from '../../shared/generic-ativos.service';

@Injectable({
  providedIn: 'root',
})
export class TiposService extends GenericService<Tipo>{
  override baseApi: string = '/tipo';
}

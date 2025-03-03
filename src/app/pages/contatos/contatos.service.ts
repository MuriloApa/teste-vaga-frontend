import { Injectable } from '@angular/core';
import { Contato } from '../../models/contato.model';
import { GenericService } from '../../shared/generic-ativos.service';

@Injectable({
  providedIn: 'root',
})
export class ContatosService extends GenericService<Contato>{
  override baseApi: string = '/contato';

}

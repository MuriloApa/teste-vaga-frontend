import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/generic-ativos.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService extends GenericService<User>{
  override baseApi: string = '/usuario';

}

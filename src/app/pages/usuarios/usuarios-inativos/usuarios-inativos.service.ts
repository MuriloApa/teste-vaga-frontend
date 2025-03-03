import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroments';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { GenericService } from '../../../shared/generic-ativos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericInativosService } from '../../../shared/generic-inativos.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosInativosService extends GenericInativosService<User>{
  override baseApi: string = '/usuario';
}

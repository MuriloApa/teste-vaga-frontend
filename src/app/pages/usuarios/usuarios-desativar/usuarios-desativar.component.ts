import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-usuarios-desativar',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './usuarios-desativar.component.html',
  styleUrl: './usuarios-desativar.component.scss'
})
export class UsuariosDesativarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}

  ngOnInit(): void {

  }

}

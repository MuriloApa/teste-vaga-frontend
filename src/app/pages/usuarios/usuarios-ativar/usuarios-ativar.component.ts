import { Component, Inject } from '@angular/core';
import { User } from '../../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios-ativar',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './usuarios-ativar.component.html',
  styleUrl: './usuarios-ativar.component.scss',
})
export class UsuariosAtivarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}

  ngOnInit(): void {}
}

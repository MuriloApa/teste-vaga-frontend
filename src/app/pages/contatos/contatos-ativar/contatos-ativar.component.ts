import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Contato } from '../../../models/contato.model';


@Component({
  selector: 'app-contatos-ativar',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './contatos-ativar.component.html',
  styleUrl: './contatos-ativar.component.scss',
})
export class ContatosAtivarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Contato) {}

  ngOnInit(): void {}
}

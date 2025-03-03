import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Contato } from '../../../models/contato.model';

@Component({
  selector: 'app-contatos-desativar',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './contatos-desativar.component.html',
  styleUrl: './contatos-desativar.component.scss'
})
export class ContatosDesativarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Contato) {}

  ngOnInit(): void {}
}

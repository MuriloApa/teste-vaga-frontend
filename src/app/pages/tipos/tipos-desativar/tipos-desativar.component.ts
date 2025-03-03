import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Tipo } from '../../../models/tipo.model';

@Component({
  selector: 'app-tipos-desativar',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './tipos-desativar.component.html',
  styleUrl: './tipos-desativar.component.scss',
})
export class TiposDesativarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Tipo) {}

  ngOnInit(): void {}
}

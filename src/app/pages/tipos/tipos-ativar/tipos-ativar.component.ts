import { Component, Inject } from '@angular/core';
import { Tipo } from '../../../models/tipo.model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tipos-ativar',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './tipos-ativar.component.html',
  styleUrl: './tipos-ativar.component.scss',
})
export class TiposAtivarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Tipo) {}

  ngOnInit(): void {}
}

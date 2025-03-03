import { TiposService } from './../tipos.service';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { catchError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Tipo } from '../../../models/tipo.model';

@Component({
  selector: 'app-tipos-create',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatInputModule],
  templateUrl: './tipos-create.component.html',
  styleUrl: './tipos-create.component.scss'
})
export class TiposCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly tiposService: TiposService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]]
    })

  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const tipo: Tipo = this.form.value;
      this.tiposService
        .create(tipo)
        .pipe(
          catchError((err) => {
            this.tiposService.showMessage(
              'O tipo não pôde ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.tiposService.showMessage(
            'Tipo cadastrado com sucesso!'
          );
          this.router.navigate(['/tipos']);
        });
    } else {
      this.tiposService.showMessage(
        'O campo "descrição" está inválido',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/paises']);
  }
}

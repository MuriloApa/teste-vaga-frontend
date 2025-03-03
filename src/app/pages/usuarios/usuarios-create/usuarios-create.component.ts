import { UsuariosService } from './../usuarios.service';
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

@Component({
  selector: 'app-usuarios-create',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatInputModule],
  templateUrl: './usuarios-create.component.html',
  styleUrl: './usuarios-create.component.scss'
})
export class UsuariosCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    })

  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const user: User = this.form.value;
      this.usuariosService
        .create(user)
        .pipe(
          catchError((err) => {
            this.usuariosService.showMessage(
              'Usuário não pode ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.usuariosService.showMessage(
            'Usuário cadastrado com sucesso!'
          );
          this.router.navigate(['/usuarios']);
        });
    } else {
      this.usuariosService.showMessage(
        'Existem campos inválidos no formulário!',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/paises']);
  }
}

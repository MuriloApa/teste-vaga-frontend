import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ContatosService } from '../contatos.service';
import { Contato } from '../../../models/contato.model';
import { TiposService } from '../../tipos/tipos.service';
import { Tipo } from '../../../models/tipo.model';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/user.model';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Component({
  selector: 'app-contatos-create',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './contatos-create.component.html',
  styleUrl: './contatos-create.component.scss',
})
export class ContatosCreateComponent implements OnInit {
  tipos: Tipo[] = [];
  usuarios: User[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly contatosService: ContatosService,
    private readonly tiposService: TiposService,
    private readonly userService: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.tiposService.list().subscribe((resp) => {
      this.tipos = resp;
      this.tipos.sort((a: Tipo, b: Tipo) =>
        a.descricao.localeCompare(b.descricao)
      );
    });

    this.userService.list().subscribe((resp) => {
      this.usuarios = resp;
      this.usuarios.sort((a: User, b: User) =>
        a.nome.localeCompare(b.nome)
      );
    });

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      idtipo: [null, [Validators.required]],
      idusuario: [null, [Validators.required]],
      valor: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const contato: Contato = this.form.value;
      this.contatosService
        .create(contato)
        .pipe(
          catchError((err) => {
            this.contatosService.showMessage(
              'O contato não pôde ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.contatosService.showMessage('Contato cadastrado com sucesso!');
          this.router.navigate(['/contatos']);
        });
    } else {
      this.contatosService.showMessage(
        'Existem campos inválidos no formulário!',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/contatos']);
  }
}

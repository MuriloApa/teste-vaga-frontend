import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MensagensService } from '../../shared/messages.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly messagesService: MensagensService,
    private readonly authenticationService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [],
      password: [],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authenticationService
        .login(username, password)
        .pipe(
          catchError((error) => {
            this.messagesService.error(error.error.detail);
            return throwError(() => error);
          })
        )
        .subscribe((resp) => {
          if (resp) {
            this.router.navigate(['']);
          } else {
            this.messagesService.error('E-mail ou senha inválidos!');
          }
        });
    } else {
      this.messagesService.error('Há campos inválidos no formulário!');
    }
  }
}

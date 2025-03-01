import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroments';
import { JwtToken } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseAPI = environment.URL_BASE;
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  // BehaviorSubject para armazenar o Token
  private currentTokenSubject!: BehaviorSubject<JwtToken | null>;
  public currentToken!: Observable<JwtToken | null>;

  constructor() {
    this.currentTokenSubject = new BehaviorSubject<JwtToken | null>(
      this.getTokenStorage(false)
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }


  login(username: string, password: string): Observable<JwtToken | null> {
    // Configura os cabeçalhos para x-www-form-urlencoded
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);


    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.http
      .post<JwtToken>(this.baseAPI + '/token', body.toString(), { headers })
      .pipe(
        switchMap((token) => {
          if (token.access_token) {
            // Armazena o Token no localStorage e no BehaviorSubject
            this.storageService.set('token', token);
            this.currentTokenSubject.next(token);
            return of(token);
          } else {
            return of(null);
          }
        })
      );
  }

  // Método de logout
  logout(): void {
    this.storageService.remove('token'); // Remove o Token do localStorage
    this.currentTokenSubject.next(null); // Define o Token como null no BehaviorSubject
    this.router.navigate(['/user/login']); // Redireciona para a página de login
  }

  // Retorna o valor atual do Token
  getCurrentTokenValue(): JwtToken | null {
    return this.currentTokenSubject.value;
  }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
    const token = this.getTokenStorage(false);
    return !!token; // Retorna true se o Token existir
  }

  // Obtém o Token do localStorage
  getTokenStorage(isRedirect: boolean = true): JwtToken | null {
    let token: JwtToken | null = null;

    try {
      token = this.storageService.get('token'); // Tenta obter o Token
    } catch (error) {
      this.logout(); // Faz logout em caso de erro
      if (isRedirect) {
        this.router.navigate(['/login']); // Redireciona para a página de login
      }
    }

    return token;
  }
}

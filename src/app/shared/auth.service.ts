import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroments';
import { JwtToken } from '../models/login.model';
import { jwtDecode } from 'jwt-decode';

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

            console.log(jwtDecode(token.access_token));
            return of(token);
          } else {
            return of(null);
          }
        })
      );
  }


  logout(): void {
    this.storageService.remove('token');
    this.currentTokenSubject.next(null);
    this.router.navigate(['/login']);
  }


  getCurrentTokenValue(): JwtToken | null {
    return this.currentTokenSubject.value;
  }


  isLoggedIn(): boolean {
    const token = this.getTokenStorage(false);
    return !!token; // Retorna true se o Token existir
  }

  // Obtém o Token do localStorage
  getTokenStorage(isRedirect: boolean = true): JwtToken | null {
    let token: JwtToken | null = null;

    try {
      token = this.storageService.get('token');
    } catch (error) {
      this.logout();
      if (isRedirect) {
        this.router.navigate(['/login']);
      }
    }

    return token;
  }
}

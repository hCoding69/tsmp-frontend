import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'tsmp_token';
  private readonly ROLE_KEY = 'tsmp_role';

    constructor(private http: HttpClient) {}
    isAuthenticated = signal<boolean>(this.hasToken());


    private hasToken():boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    getRole(): string | null {
        return localStorage.getItem(this.ROLE_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
        tap((response) => {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.ROLE_KEY, response.role);
            this.isAuthenticated.set(true);
        })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.ROLE_KEY);
        this.isAuthenticated.set(false);
    }



}
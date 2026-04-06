import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  isAuthenticated = signal<boolean>(false);
  csrfToken = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth`, credentials, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          const csrf = response.headers.get('X-Csrf-Token');
          if (csrf) this.csrfToken.set(csrf);
          this.isAuthenticated.set(true);
        }),
      );
  }

  /**
   * Vérifie si la session est encore valide côté serveur.
   * Utilisé par le guard après un refresh de page : le signal est perdu,
   * mais le cookie HTTP-only peut encore être valide.
   */
  checkSession(): Observable<unknown> {
    return this.http
      .get(`${this.apiUrl}/me`, { withCredentials: true })
      .pipe(tap(() => this.isAuthenticated.set(true)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .pipe(tap(() => {
        this.isAuthenticated.set(false);
        this.csrfToken.set(null);
      }));
  }
}

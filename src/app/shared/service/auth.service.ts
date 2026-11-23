import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Account {
  email: string;
  passwordHash: string;
  createdAt: string;
}

/**
 * Simple auth backed by Firebase Realtime Database (no API key needed).
 * Accounts are stored at /accounts/{emailKey}.json.
 * NOTE: suitable for practice/test projects only — not real security.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const key = this.emailKey(email);
    return this.http.get<Account | null>(`${this.baseURL}/accounts/${key}.json`).pipe(
      switchMap(account =>
        from(this.hash(password)).pipe(
          switchMap(hash => {
            if (!account || account.passwordHash !== hash) {
              return throwError(() => this.authError('INVALID_LOGIN_CREDENTIALS'));
            }
            return [{ idToken: this.createToken(), localId: key, email: account.email }];
          })
        )
      )
    );
  }

  signup(email: string, password: string): Observable<any> {
    const key = this.emailKey(email);
    const url = `${this.baseURL}/accounts/${key}.json`;
    return this.http.get<Account | null>(url).pipe(
      switchMap(existing => {
        if (existing) {
          return throwError(() => this.authError('EMAIL_EXISTS'));
        }
        return from(this.hash(password)).pipe(
          switchMap(passwordHash => {
            const account: Account = {
              email: email.trim().toLowerCase(),
              passwordHash,
              createdAt: new Date().toISOString()
            };
            return this.http.put(url, account);
          }),
          map(() => ({ localId: key, email }))
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  // Realtime DB keys cannot contain . # $ [ ]
  private emailKey(email: string): string {
    return email.trim().toLowerCase().replace(/[.#$\[\]]/g, ',');
  }

  private async hash(text: string): Promise<string> {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private createToken(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Same shape as Firebase errors, so components can read err.error.error.message
  private authError(message: string) {
    return { error: { error: { message } } };
  }
}

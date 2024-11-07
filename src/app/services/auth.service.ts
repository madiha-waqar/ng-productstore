import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  login(username: string, password: string) {
    this.http.post(`${this.apiUrl}/auth/login`, { username, password })
      .subscribe((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      }, error => {
        alert('Invalid credentials');
      });
  }

  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products`, product)
      .pipe(
        catchError(error => {
          let errorMessage = 'An unknown error occurred!';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          alert(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedInUserData, User } from '../Models/user.model';
import { BehaviorSubject, ReplaySubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser: LoggedInUserData | null = null;
  appStart: boolean = true;
  $loggedInUser = new ReplaySubject<LoggedInUserData | null>(1);

  constructor(private http: HttpClient) {
    if (!this.isTokenExpired()) {
      this.userSignedIn$.next(true);
      this.$loggedInUser.next(this.loggedInUser);
    }
  }

  userSignedIn$ = new BehaviorSubject<boolean>(false);
  apiBaseUrl: string = environment.apiBaseUrl;

  signUp(data: User) {
    if (this.appStart) {
      alert(
        'If its your first request, it may take upto a minute. Please hold.'
      );
      this.updateStartApp();
    }
    return this.http.post<{ message: string; error: string }>(
      `${this.apiBaseUrl}/auth/signup`,
      data
    );
  }

  login(data: User) {
    if (this.appStart) {
      alert(
        'If its your first request, it may take upto a minute. Please hold.'
      );
      this.updateStartApp();
    }
    return this.http
      .post<{ message: string; error?: string; token?: string }>(
        `${this.apiBaseUrl}/auth/login`,
        data
      )
      .pipe(
        tap((x) => {
          localStorage.setItem('token', x.token!);
          this.userSignedIn$.next(true);
          this.isTokenExpired();
          this.$loggedInUser.next(this.loggedInUser);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.userSignedIn$.next(false);
    this.$loggedInUser.next(null);
  }

  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return true;
      }
      const payload: any = jwtDecode(token);

      this.loggedInUser = {
        loggedInUserName: payload.userName,
        loggedInUserEmail: payload.email,
      };

      if (!payload.exp) {
        this.logout();
        return true;
      }
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTime) {
        this.logout();
        return true;
      }
      return false;
    } catch (err) {
      this.logout();
      console.log(err);
      return true;
    }
  }

  updateStartApp() {
    this.appStart = false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { distinctUntilChanged, map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { withCache } from '@ngneat/cashew';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private router : Router) { }

  get currentUserValue(){
    return this.currentUserSubject.value
  }


  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<any>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public permissions: Array<any>;

  async populate() {
    if (this.getToken()) {
      try {
        const res: any = await this.http
          .get(`${environment.apiUrl}/auth/current`, {context: withCache()})
          .toPromise();
        this.setAuth(res);
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(res);
        return true;
      } catch (error) {
        this.purgeAuth();
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.purgeAuth();
      // this.router.navigate(['/login']);
      return false;
    }
  }

  async setAuth({ user, token }: any) {
    if (token) {
      this.saveToken(token);
    }
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(credentials): any {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials).pipe(
      map((res: any) => {
        this.setAuth(res);
        return res;
      }),
      catchError(this.formatErrors)
    );
  }

  sendMailForgotPassword(email) : any{
    return this.http.put(`${environment.apiUrl}/auth/password/ask-for-reset`, email)
  }

  changePassword(passwords, token) : any{
    return this.http.put(`${environment.apiUrl}/auth/password/reset?token=`+token, passwords)
  }

  addUser(user: any): any {
    return this.http.post(`${environment.apiUrl}/auth/signup`, user);
  }

  purgeAuth() {
    this.destroyToken();
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  setCurrentUser(user){
    this.currentUserSubject.next(user);
  }
  getToken(): string {
    return localStorage.getItem("token");
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  destroyToken() {
    localStorage.removeItem("token");
  }
}

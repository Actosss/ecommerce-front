import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TokenStorageService } from 'src/app/core/tokenStorage/tokenStorageService';

const AUTH_API = 'http://localhost:8080/api/auth/';
const USER_API = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient,private tokenStorage:TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(email: any, password: any, firstname: any, lastname: any, username: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email, password, firstname, lastname, username
    }, httpOptions);
  }
  getUserBoard(): Observable<any> {
    return this.http.get(USER_API + 'getCartByUserId', { responseType: 'text' });
  }
  getRole(id: any) {
    throw new Error('Method not implemented.');
  }
  public logout():void{
   return this.tokenStorage.signOut();
  }

}

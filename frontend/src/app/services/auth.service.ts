import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../models/user.class';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatus = new Subject<boolean>();
  private isUserAuthenticated = false;
  private tokenTimer : any;
  private userId: string;


  private readonly API_User = environment.api_url + '/users'

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getToken(){
    return this.token;
  }

  getAuthStatus(){
    return this.authStatus.asObservable();
  }

  getIsAuth(){
    return this.isUserAuthenticated;
  }

  createUser(email: string, password: string){
    const User : User = {
      email: email,
      password: password
    }
    this.httpClient.post(this.API_User + '/signup', User)
    .subscribe(result =>{
      console.log(result)
    })
  }

  logIn(email: string, password: string){
    const User : User = {email: email, password: password}
    this.httpClient.post<{token: string, expiresIn: number, userId: string}>(this.API_User + '/login', User)
    .subscribe(result =>{
      const token = result.token;
      this.token = token;
      if(token){
        const expiresInDuration = result.expiresIn;
        this.tokenTimer = setTimeout(() =>{
          this.logOut();
        }, expiresInDuration * 1000);
        this.userId = result.userId;
        this.isUserAuthenticated = true
        this.authStatus.next(true);
        const now = new Date();
        const expiration = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expiration,this.userId)
      }
      this.router.navigate(['/'])
    })
  }


  getUserId(){
    return this.userId;
  }


  logOut(){
    this.token = null;
    this.isUserAuthenticated = false;
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }


  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');

  }


  // private getAuthData(){
  //   const token = localStorage.getItem('token');
  //   const expirationDate = localStorage.getItem('expiration');
  //   if(!token || !expirationDate){
  //     return;
  //   }
  //   return {
  //     token: token,
  //     expirationDate: new Date(expirationDate)
  //   }
  // }



}


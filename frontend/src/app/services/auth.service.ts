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
  isUserAuthenticated = false;


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
    this.httpClient.post<{token: string}>(this.API_User + '/login', User)
    .subscribe(result =>{
      const token = result.token;
      this.token = token;
      if(token){
        this.isUserAuthenticated = true
        this.authStatus.next(true);
      }
      this.router.navigate(['/'])
    })
  }

  logOut(){
    this.token = null;
    this.isUserAuthenticated = false;
    this.authStatus.next(false);
    this.router.navigate(['/'])
  }
}

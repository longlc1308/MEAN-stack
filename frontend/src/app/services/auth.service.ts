import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './../models/user.class';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_User = environment.api_url + '/users'

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

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
    this.httpClient.post(this.API_User + '/login', User)
    .subscribe(result =>{
      console.log(result)
    })
  }
}

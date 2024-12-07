import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../models/user.interface';
import {LoginResponse} from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'http://localhost:3001/api';
  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(){
    return this.httpClient.get<User[]>(this.API_URL+'/user/usuarios')
  }

  getUser(id: number){
    return this.httpClient.get<UserResponse>(this.API_URL+'/user/usuarios/'+id)
  }
  
  login(username:string,password:string){
    const body = { username, password };
    return this.httpClient.post<LoginResponse>(this.API_URL+'/auth/login',body)
  }
}

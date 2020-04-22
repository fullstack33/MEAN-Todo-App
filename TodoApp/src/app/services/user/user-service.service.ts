import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _signUpUrl = "http://localhost:3000/user/api/";
  private _signInUrl = "http://localhost:3000/user/api/login/";

  constructor(private http: HttpClient, private _router: Router) { }

  signUpUser(user){
    return this.http.post<any>(this._signUpUrl, user)
  }

  signInUser(user){
    return this.http.post<any>(this._signInUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/signIn'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserProfile(){
    let token = localStorage.getItem('token');
    // console.log(token)
    return this.http.get<any>(`http://localhost:3000/user/api/${token}`)
  }

  updateUser(id, data){
    return this.http.put<any>(`http://localhost:3000/user/api/${id}`, data)
  }

  uploadPic(id, data){
    return this.http.put<any>(`http://localhost:3000/user/api/profilePic/${id}`, data)
  }

}

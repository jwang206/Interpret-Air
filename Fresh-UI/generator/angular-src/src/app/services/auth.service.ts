import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  webserverip = environment.webserverip;

  constructor(private https:Http) { }

  registerUser(user){

    console.log("auth.service:registerUser(user) " + user );

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.https.post('https://'+ this.webserverip +':3000/users/register', user,{headers: headers})
      .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.https.post('https://'+ this.webserverip +':3000/users/authenticate', user,{headers: headers})
      .map(res=>res.json());
  }

  googleAuth(googleUser){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.https.post('https://'+ this.webserverip + ':3000/socialusers/auth/google/callback', googleUser,{headers: headers})
      .map(res=>res.json());
  }


  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user=user;
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.https.get('https://' + this.webserverip + ':3000/users/profile',{headers: headers})
      .map(res=>res.json());
  }


  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }

  loggedIn(){
    // console.log(tokenNotExpired());
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
}

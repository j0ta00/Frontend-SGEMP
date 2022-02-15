import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged = false;

  constructor(private afauth: AngularFireAuth) { }

  async login(email:string, password:string) {
    try {
          await this.afauth.signInWithEmailAndPassword(email, password)
          this.isLogged = true;
          return this.afauth.currentUser;

    } catch(err) {
        console.log("error en login", err);
        return null;
    }
  }

  getUserLogged() {

    return this.afauth.authState;

  }

  logout()  {

    this.isLogged = false;
    this.afauth.signOut();


  }

  isUsserLogged() { 
    return this.isLogged;
  }

}

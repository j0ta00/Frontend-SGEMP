import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

userLogged = this.authService.getUserLogged();

  constructor(private authService:AuthService, public myapp: LoginComponent, private _router: Router) {}

  ngOnInit(): void {
  }

  logout() {
    this._router.navigate(['/login'])
    this.myapp.logout();
  }

}

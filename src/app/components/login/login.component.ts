import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    email: '',
    password: ''
  }

  formulario:   FormGroup;

  constructor(private authService: AuthService, private _router: Router, private fb: FormBuilder) {

  }

  Ingresar() {
    console.log(this.usuario.email);
    const { email, password} = this.usuario;
    this.authService.login(email, password).then(res => {
      this._router.navigate(['/home'])
      console.log("Se logeo "+this.usuario.email)
    })
  }

  obtenerUsuarioLogeado() {
    this.authService.getUserLogged().subscribe(res => {
      console.log(res?.email)
    });
  }

  logout() {
    console.log("Usuario "+this.usuario.email+" deslogeado");
    this.authService.logout();
    this._router.navigate(['/login'])
  }

  title = 'firebase';

  ngOnInit(): void {

      this.formulario = this.fb.group(

        {

            email: new FormControl('', [Validators.email]),
            contrasena: new FormControl('', [Validators.required])

        }

      );

  }

}

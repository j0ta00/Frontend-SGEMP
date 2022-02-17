import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { DetallesPedidoComponent } from './components/detalles-pedido/detalles-pedido.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    DetallesPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [LoginComponent, AuthService,  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

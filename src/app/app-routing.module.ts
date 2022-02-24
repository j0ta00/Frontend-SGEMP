import { Component, NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { DetallesPedidoComponent } from './components/detalles-pedido/detalles-pedido.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { XomponenteComponent } from './components/xomponente/xomponente.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [

  {
    path: "login",
    component: LoginComponent
  },

  {
    pathMatch: 'full',
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"details",
    component: DetallesPedidoComponent,
    // canActivate: [AuthGuard]
  },

  {
    path: "**",
    component: PageNotFoundComponent
  }
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

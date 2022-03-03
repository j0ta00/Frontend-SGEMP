import { Component, NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { CrearPedidoComponent } from './components/crear-pedido/crear-pedido.component';
import { DetallesPedidoComponent } from './components/detalles-pedido/detalles-pedido.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { XomponenteComponent } from './components/xomponente/xomponente.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PedidosResolver } from './resolvers/pedidos.resolver';


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
    path:"details/:id",
    component: DetallesPedidoComponent,
    // canActivate: [AuthGuard]
    resolve:{
      pedido:PedidosResolver
    }
  },

  {
    path: "**",
    component: PageNotFoundComponent
  }
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload'}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

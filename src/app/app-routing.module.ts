import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import {ListadoLineasPedidosComponent} from './components/listado-lineas-pedidos/listado-lineas-pedidos.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "DetallesPedidos",
    component: ListadoLineasPedidosComponent
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
    path: "**",
    component: PageNotFoundComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

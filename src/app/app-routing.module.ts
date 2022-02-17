import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
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
    path: "menu",
    component: MenuComponent,
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

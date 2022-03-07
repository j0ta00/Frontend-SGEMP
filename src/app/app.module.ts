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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoLineasPedidosComponent } from './components/listado-lineas-pedidos/listado-lineas-pedidos.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './components/error/error.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'owner', loadChildren: () => import('./modules/owner.module').then(m => m.OwnerRoutingModule) }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListadoLineasPedidosComponent,
    MenuComponent,
    DialogBoxComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MaterialModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule
  ],
  providers: [LoginComponent, AuthService,  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

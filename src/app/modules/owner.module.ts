import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MaterialModule } from 'src/app/modules/material.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [
    RouterModule,
    MaterialModule
  ],
  declarations: []
})
export class OwnerRoutingModule { }

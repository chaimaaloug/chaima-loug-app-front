import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuteurComponent} from './auteur.component';
import {AuteurListComponent} from './pages/auteur-list/auteur-list.component';
import {AuteurDetailsComponent} from './pages/auteur-details/auteur-details.component';

const routes: Routes = [
    {
      path:"",
      component: AuteurComponent,
      children: [
        {
          path:"",
          component: AuteurListComponent,
        },
        {
          path:":id",
          component : AuteurDetailsComponent,
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuteurRoutingModule { }

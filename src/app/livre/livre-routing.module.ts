import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LivreComponent} from '../livre/livre.component'
import {LivreListComponent} from '../livre/pages/livre-list/livre-list.component'
import {LivreDetailsComponent} from '../livre/pages/livre-details/livre-details.component'

const routes: Routes = [
  {
    path:"",
    component: LivreComponent,
    children: [
      {
        path:"",
        component: LivreListComponent,
      },
      {
        path:":id",
        component : LivreDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreRoutingModule { }

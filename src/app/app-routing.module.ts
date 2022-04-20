import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component'
const routes: Routes = [
  {
    path:"",
    redirectTo:"auteurs",
    //the path must match correctly
    pathMatch:"full"
  },
  {
    path:"auteurs",
    // lazy loading
    loadChildren: () => import('./auteur/auteur.module')
    .then(m => m.AuteurModule),
  },
  //If the path is wrong ‘the-not-found’ component will be displayed
  {
    path:"**",
    component : NotFoundComponent,
  },
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

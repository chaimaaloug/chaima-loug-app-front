import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuteurRoutingModule } from './auteur-routing.module';
import { AuteurComponent } from './auteur.component';
import { AuteurListComponent } from './pages/auteur-list/auteur-list.component';
import { AuteurDetailsComponent } from './pages/auteur-details/auteur-details.component';
import { AuteurFormComponent } from './pages/auteur-form/auteur-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AuteurService } from './services/auteur.service';

@NgModule({
  declarations: [
    AuteurComponent,
    AuteurListComponent,
    AuteurDetailsComponent,
    AuteurFormComponent
  ],
  imports: [
    CommonModule,
    AuteurRoutingModule,
    SharedModule,
    HttpClientModule,
   
  ],
  providers: [AuteurService],
})
export class AuteurModule { }

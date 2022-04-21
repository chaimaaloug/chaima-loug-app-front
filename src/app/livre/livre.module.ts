import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LivreRoutingModule } from './livre-routing.module';
import { LivreComponent } from './livre.component';
import { LivreListComponent } from './pages/livre-list/livre-list.component';
import { LivreDetailsComponent } from './pages/livre-details/livre-details.component';
import { LivreFormComponent } from './components/livre-form/livre-form.component';

import { LivreService } from './services/livre.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LivreComponent,
    LivreListComponent,
    LivreDetailsComponent,
    LivreFormComponent
  ],
  imports: [
    CommonModule,
    LivreRoutingModule,
    SharedModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [LivreService, MatDatepickerModule, MatNativeDateModule]

})
export class LivreModule { }

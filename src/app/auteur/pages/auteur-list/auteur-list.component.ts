import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuteurService } from '../../services/auteur.service';
import { Auteur } from './../../../core/Models/auteur'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuteurFormComponent } from '../auteur-form/auteur-form.component';
import { AuteurFormData } from 'src/app/core/Models/auteurFormData';




@Component({
  selector: 'app-auteur-list',
  templateUrl: './auteur-list.component.html',
  styleUrls: ['./auteur-list.component.scss']
})

export class AuteurListComponent implements OnInit {
  auteurs$: Observable<Auteur[]>;
  columnsToDisplay = ['id', 'firstName', 'lastName', 'sexe', 'email', 'dateOfBirth', 'livre'];

  //Bidouille
  ids: number[] = [];

  constructor(
    private _auteurService: AuteurService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.auteurs$ = this._auteurService.getAuteurs();
  }

  showAuteurDetails(auteur: Auteur) {
    this._router.navigateByUrl('/auteurs/' + auteur.id);
  }

  createAuteur() {
    const auteurFormData: AuteurFormData = {
      isUpdateMode: false,
      idToCreate: Math.max(...this.ids) + 1,
    };

    const dialogRef = this._dialog.open(AuteurFormComponent, {
      data: auteurFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

    deleteAuteur(id: number) {
    this._auteurService.deleteAuteur(id).subscribe(() => {
      this.auteurs$ = this._auteurService.getAuteurs();
    });
  }

  setId(id: number) {
    //Bidouille
    this.ids.push(id);
  }
}

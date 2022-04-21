import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auteur } from 'src/app/core/Models/auteur';
import { AuteurService } from '../../services/auteur.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { AuteurFormData } from './../../../core/Models/auteurFormData';
import { AuteurFormComponent } from './../auteur-form/auteur-form.component';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-auteur-details',
  templateUrl: './auteur-details.component.html',
  styleUrls: ['./auteur-details.component.scss']
})

export class AuteurDetailsComponent implements OnInit {
  auteur$: Observable<Auteur>;
  constructor(
    private _auteurService: AuteurService,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.fetchData(params['id']);
    });
  }

  fetchData(id: number) {
    this.auteur$ = this._auteurService.getAuteur(id);
  }

  updateAuteur(auteur: Auteur) {
    const auteurFormData: AuteurFormData = {
      isUpdateMode: true,
      auteurToUpdate: auteur,
    };

    const dialogRef = this._dialog.open(AuteurFormComponent, {
      data: auteurFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(result);
      }
    });
  }

  deleteAuteur(id: number) {
    this._auteurService.deleteAuteur(id).subscribe((response) => {
      this._snackBar.open(response, '', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent'],
      });

      this._router.navigateByUrl('/auteurs');
    });
  }

  goBack() {
    this._location.back();
  }
}

import { Livre } from './../../../core/Models/livre';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LivreService } from '../../services/livre.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { LivreFormData } from './../../../core/Models/livreFormData';
import { LivreFormComponent } from './../../components/livre-form/livre-form.component';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livre-details',
  templateUrl: './livre-details.component.html',
  styleUrls: ['./livre-details.component.scss']
})


export class LivreDetailsComponent implements OnInit {
  livre$: Observable<Livre>;
  constructor(
    private _livreService: LivreService,
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
    this.livre$ = this._livreService.getLivre(id);
  }

  updateLivre(livre: Livre) {
    const livreFormData: LivreFormData = {
      isUpdateMode: true,
      livreToUpdate: livre,
    };

    const dialogRef = this._dialog.open(LivreFormComponent, {
      data: livreFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(result);
      }
    });
  }

  deleteLivre(id: number) {
    this._livreService.deleteLivre(id).subscribe((response) => {
      this._snackBar.open(response, '', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent'],
      });

      this._router.navigateByUrl('/livres');
    });
  }

  goBack() {
    this._location.back();
  }
}


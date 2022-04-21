import { AuteurService } from './../../services/auteur.service';
import { AuteurFormData } from 'src/app/core/Models/auteurFormData';
import { Auteur } from './../../../core/Models/auteur';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-auteur-form',
  templateUrl: './auteur-form.component.html',
  styleUrls: ['./auteur-form.component.scss']
})


export class AuteurFormComponent implements OnInit {
  isUpdateMode: boolean;
  auteurForm: FormGroup;

  sexes: string[] = ['Female', 'Male'];
  constructor(
    private _formBuilder: FormBuilder,
    private _auteurService: AuteurService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AuteurFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuteurFormData
  ) {
    this.isUpdateMode = this.data.isUpdateMode;
  }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.auteurForm = this._formBuilder.group({
      id: [
        this.data.isUpdateMode
          ? this.data.auteurToUpdate.id
          : this.data.idToCreate,
        Validators.required,
      ],
      firstName: [
        this.data.isUpdateMode ? this.data.auteurToUpdate.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.data.isUpdateMode ? this.data.auteurToUpdate.lastName : '',
        Validators.required,
      ],
      sexe: [
        this.data.isUpdateMode ? this.data.auteurToUpdate.sexe : '',
        Validators.required,
      ],
      dateOfBirth: [
        this.data.isUpdateMode ? this.data.auteurToUpdate.dateOfBirth : '',
        Validators.required,
      ],
      email: [
        this.data.isUpdateMode ? this.data.auteurToUpdate.email : '',
        [Validators.required, Validators.email],
      ],
    });
  }

  closeForm(id?: number) {
    this.auteurForm.reset();
    this.dialogRef.close(id);
  }

  onSubmit(auteur: Auteur) {
    if (this.auteurForm.valid) {
      if (this.data.isUpdateMode) {
        // update
        this._auteurService.updateAuteur(auteur).subscribe((response) => {
          this.closeForm(auteur.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      } else {
        // create
        this._auteurService.createAuteur(auteur).subscribe((response) => {
          this.closeForm(auteur.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      }
    }
  }
}

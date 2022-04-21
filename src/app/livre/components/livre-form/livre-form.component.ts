import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LivreService } from './../../services/livre.service';
import { LivreFormData } from 'src/app/core/Models/livreFormData';
import { Livre } from './../../../core/Models/livre';




@Component({
  selector: 'app-livre-form',
  templateUrl: './livre-form.component.html',
  styleUrls: ['./livre-form.component.scss']
})


export class LivreFormComponent implements OnInit {
  isUpdateMode: boolean;
  livreForm: FormGroup;

  types: string[] = ["Manga", "Biography", "Science Fiction", "Personal Development", "Self Help", "Education", "Novel"];

  constructor(
    private _formBuilder: FormBuilder,
    private _livreService: LivreService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LivreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LivreFormData
  ) {
    this.isUpdateMode = this.data.isUpdateMode;
  }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.livreForm = this._formBuilder.group({
      id: [
        this.data.isUpdateMode
          ? this.data.livreToUpdate.id
          : this.data.idToCreate,
        Validators.required,
      ],
      bookTitle: [
        this.data.isUpdateMode ? this.data.livreToUpdate.bookTitle : '',
        Validators.required,
      ],
      bookPublisher: [
        this.data.isUpdateMode ? this.data.livreToUpdate.bookPublisher : '',
        Validators.required,
      ],
      bookType: [
        this.data.isUpdateMode ? this.data.livreToUpdate.bookType : '',
        Validators.required,
      ],
      releaseDate: [
        this.data.isUpdateMode ? this.data.livreToUpdate.releaseDate : '',
        Validators.required,
      ],
     
    });
  }

  closeForm(id?: number) {
    this.livreForm.reset();
    this.dialogRef.close(id);
  }

  onSubmit(livre: Livre) {
    if (this.livreForm.valid) {
      if (this.data.isUpdateMode) {
        // update
        this._livreService.updateLivre(livre).subscribe((response) => {
          this.closeForm(livre.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      } else {
        // create
        this._livreService.createLivre(livre).subscribe((response) => {
          this.closeForm(livre.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      }
    }
  }
}



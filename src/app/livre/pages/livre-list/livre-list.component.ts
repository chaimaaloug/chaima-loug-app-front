import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LivreService } from '../../services/livre.service';
import { Livre } from './../../../core/Models/livre';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LivreFormComponent } from '../../components/livre-form/livre-form.component';
import { LivreFormData } from 'src/app/core/Models/livreFormData';

@Component({
  selector: 'app-livre-list',
  templateUrl: './livre-list.component.html',
  styleUrls: ['./livre-list.component.scss']
})

export class LivreListComponent implements OnInit {
  livres$: Observable<Livre[]>;
  columnsToDisplay = ['id', 'bookTitle', 'bookPublisher', 'bookType', 'releaseDate'];

  //Bidouille
  ids: number[] = [];

  constructor(
    private _livreService: LivreService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.livres$ = this._livreService.getLivres();
  }

  showLivreDetails(livre: Livre) {
    this._router.navigateByUrl('/livres/' + livre.id);
  }

  createLivre() {
    const livreFormData: LivreFormData = {
      isUpdateMode: false,
      idToCreate: Math.max(...this.ids) + 1,
    };

    const dialogRef = this._dialog.open(LivreFormComponent, {
      data: livreFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

    deleteLivre(id: number) {
    this._livreService.deleteLivre(id).subscribe(() => {
      this.livres$ = this._livreService.getLivres();
    });
  }

  setId(id: number) {
    //Bidouille
    this.ids.push(id);
  }
}


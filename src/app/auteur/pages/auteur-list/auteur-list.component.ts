import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuteurService } from '../../services/auteur.service';
import { Auteur } from './../../../core/Models/auteur'


@Component({
  selector: 'app-auteur-list',
  templateUrl: './auteur-list.component.html',
  styleUrls: ['./auteur-list.component.scss']
})

export class AuteurListComponent implements OnInit {

  auteurs$ : Observable <Auteur[]>;
  columnsToDisplay = ['id', 'firstName', 'lastName', 'actions'];

  constructor(private _auteurService: AuteurService) {}

  ngOnInit(): void {
    this.auteurs$ = this._auteurService.getAuteurs();
  }

  deleteStudent(id: number) {
    this._auteurService.deleteAuteur(id).subscribe(() => {
      this.auteurs$ = this._auteurService.getAuteurs();
    });
  }

}
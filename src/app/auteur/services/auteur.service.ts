import { environment } from './../../../environments/environment';
import { Auteur } from './../../core/Models/auteur';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuteurService {
  private readonly auteurPath: string = '/auteurs';

  constructor(private _http: HttpClient) {}

  getAuteurs(): Observable<Auteur[]> {
    return this._http.get<Auteur[]>(
      `${environment.apiBaseUrl}${this.auteurPath}`
    );
  }

  getAuteur(id: number): Observable<Auteur> {
    return this._http.get<Auteur>(
      `${environment.apiBaseUrl}${this.auteurPath}/${id}`
    );
  }

  createAuteur(auteur: Auteur): Observable<Auteur> {
    return this._http.post<Auteur>(
      `${environment.apiBaseUrl}${this.auteurPath}`,
      auteur
    );
  }

  updateAuteur(auteur: Auteur): Observable<Auteur> {
    return this._http.put<Auteur>(
      `${environment.apiBaseUrl}${this.auteurPath}/${auteur.id}`,
      auteur
    );
  }

  deleteAuteur(id: number): Observable<any> {
    return this._http.delete<string>(
      `${environment.apiBaseUrl}${this.auteurPath}/${id}`
    );
  }
}
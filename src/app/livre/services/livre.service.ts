import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Livre } from './../../core/Models/livre';

@Injectable()
export class LivreService {
  private readonly livrePath: string = '/livres';

  constructor(private _http: HttpClient) {}

  getLivres(): Observable<Livre[]> {
    return this._http.get<Livre[]>(
      `${environment.apiBaseUrl}${this.livrePath}`
    );
  }

  getLivre(id: number): Observable<Livre> {
    return this._http.get<Livre>(
      `${environment.apiBaseUrl}${this.livrePath}/${id}`
    );
  }

  createLivre(livre: Livre): Observable<string> {
    return this._http.post<string>(
      `${environment.apiBaseUrl}${this.livrePath}`,
      livre
    );
  }

  updateLivre(livre: Livre): Observable<string> {
    return this._http.put<string>(
      `${environment.apiBaseUrl}${this.livrePath}/${livre.id}`,
      livre
    );
  }

  deleteLivre(id: number): Observable<string> {
    return this._http.delete<string>(
      `${environment.apiBaseUrl}${this.livrePath}/${id}`
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private url = environments.baseUrl
;
  constructor(private http: HttpClient) { }

  public getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`);
  }

  public getHeroById(id:string):Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.url}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  public getSuggestions(query:string):Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes/?q=${query}&_limit=6`);
  }

}

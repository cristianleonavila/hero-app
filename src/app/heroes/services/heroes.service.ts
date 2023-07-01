import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
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

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.url}/heroes`, hero);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    if ( !hero.id ) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.url}/heroes/${hero.id}`, hero);
  }

  public deleteHero(hero: Hero): Observable<boolean> {
    if ( hero.id ) throw Error('Hero id is required');
    return this.http.delete(`${this.url}/heroes/${hero.id}`).pipe(
      catchError( err => of(false)),
      map( resp => true)
    );
  }

  public deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.url}/heroes/${id}`).pipe(
      catchError( err => of(false)),
      map( resp => true)
    );
  }
}

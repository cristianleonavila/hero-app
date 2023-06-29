import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-hero-page',
  templateUrl: './search-hero-page.component.html',
  styleUrls: ['./search-hero-page.component.css']
})
export class SearchHeroPageComponent implements OnInit {

  public searchInp = new FormControl('');

  public heroes:Hero[] = [];

  public selectedHero?: Hero;

  constructor(
    private heroService:HeroesService
  ) {

  }

  public searchHeroes() {
    const value: string = this.searchInp.value || '';
    if ( value ) {
      this.heroService.getSuggestions(value).subscribe( heroes => this.heroes = heroes);
    }
  }

  public onSelectedHero( event: MatAutocompleteSelectedEvent) {
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInp.setValue(hero.superhero);
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    //this.heroService.getSuggestions('parker').subscribe( res => console.log(res));
  }
}

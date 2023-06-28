import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-list-page',
  templateUrl: './hero-list-page.component.html',
  styleUrls: ['./hero-list-page.component.css']
})
export class HeroListPageComponent implements OnInit{

  public heroes:Hero[] = [];

  constructor( private heroService: HeroesService) {

  }

  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe( heroes => this.heroes = heroes);
  }
}

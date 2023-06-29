import { Component } from '@angular/core';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css']
})
export class NewHeroPageComponent {

  public publishers = [
    {id: 'DC Comics', name: 'DC - Comics'},
    {id: 'Marvel Comics', name: 'Marvel - Comics'}
  ];
}

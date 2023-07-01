import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HeroDialogComponent } from '../../components/dialogs/hero-dialog/hero-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css']
})
export class NewHeroPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });

  public publishers = [
    {id: 'DC Comics', name: 'DC - Comics'},
    {id: 'Marvel Comics', name: 'Marvel - Comics'}
  ];

  get createOrUpdate():string {
    return this.isEditMode ? 'Editar' : 'Crear';
  }

  get isEditMode():boolean {
    return this.router.url.includes('edit');
  }

  constructor(
    private heroService: HeroesService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.actRoute.params.pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id))
    ).subscribe( hero => {
      if ( !hero ) return this.router.navigateByUrl('/');
      this.heroForm.reset(hero);
      return;
    });
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  public onSubmit():void {

    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.heroService.updateHero( this.currentHero ).
        subscribe( hero => {
          this.showSnackBar(`${hero.superhero} actualizado correctamente`);
        });
      return;
    }

    this.heroService.addHero( this.currentHero ).
      subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} creado correctamente`);
      });
  }

  public confirmDeleteHero() {
    if ( !this.currentHero.id ) throw Error('El id del héroe es requerido');
    const dialogRef = this.dialog.open(HeroDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroService.deleteHeroById( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
  }

  private showSnackBar(msg:string):void {
    this.snackBar.open( msg, 'Ok', {
      duration: 2000
    });
  }
}

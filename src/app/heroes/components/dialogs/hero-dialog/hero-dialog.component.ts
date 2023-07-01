import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from 'src/app/heroes/interfaces/hero.interface';

@Component({
  selector: 'app-hero-dialog',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.component.css']
})
export class HeroDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {
    console.log(data);

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true);
  }
}

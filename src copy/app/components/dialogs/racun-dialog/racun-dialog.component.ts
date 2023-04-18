import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import {KlijentService } from 'src/app/services/klijent.service';
import { RacunService } from 'src/app/services/racun.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit, OnDestroy {

  public flag!: number;
  klijenti!: Klijent[];
  subscription!: Subscription;
  
  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    private racunService: RacunService,
    private klijentService: KlijentService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.klijentService.getAllKlijents().subscribe(data => {
      this.klijenti = data;
    });
  }

  compareTo(a:any, b: any) {
    return a.id == b.id;
  }

  public add() {
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat racun!', 'OK', {duration:2500});
  }, (error:Error) => {
    this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
  });
  }

  public update() {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen racun!', 'OK', {duration:2500});
  }, (error:Error) => {
    this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
  });
  }

  public delete() {
    this.racunService.deleteRacun(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan racun!', 'OK', {duration:2500});
  }, (error:Error) => {
    this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
  });
  }

  public cancel() {
    this.dialogRef.close(); 
    this.snackBar.open('Odustali ste', 'Zatvori', {duration:1000});
  }

}
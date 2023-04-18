import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag!: number;
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: TipRacuna,
    public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.subscription = this.tipRacunaService.addTipRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat tip racuna: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog tipa racuna!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public update(): void {
    this.subscription = this.tipRacunaService.updateTipRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen tip racuna: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene postojećeg tipa racuna!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public delete(): void {
    this.subscription = this.tipRacunaService.deleteTipRacuna(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan tip racuna: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojećeg tipa racuna!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene.', 'Zatvori', {duration: 1000});
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {
  public flag!: number;
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KreditDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Kredit,
    public kreditService: KreditService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.subscription = this.kreditService.addKredit(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat kredit: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog kredita!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public update(): void {
    this.subscription = this.kreditService.updateKredit(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen kredit: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene postojećeg kredita!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public delete(): void {
    this.subscription = this.kreditService.deleteKredit(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan kredit: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojećeg kredita!', 'Zatvori', {
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
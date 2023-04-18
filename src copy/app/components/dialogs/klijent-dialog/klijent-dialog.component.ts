import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';
import { KlijentService } from 'src/app/services/klijent.service';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit, OnDestroy {

  flag!:number;
  subscription!: Subscription;
  krediti!: Kredit[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KlijentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Klijent,
    public kreditService: KreditService,
    public klijentService: KlijentService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.kreditService.getAllKredits().subscribe(data => {
      this.krediti = data;
    });
  }
  compareTo(a:any, b:any) {
    return a.id == b.id;
  }

  public add(): void {
    this.subscription = this.klijentService.addKlijent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat klijent: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog klijenta!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public update(): void {
    this.subscription = this.klijentService.updateKlijent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen klijent: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene postojećeg klijenta!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public delete(): void {
    this.subscription = this.klijentService.deleteKlijent(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan klijent: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojećeg klijenta!', 'Zatvori', {
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
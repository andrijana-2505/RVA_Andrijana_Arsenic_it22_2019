import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Kredit } from 'src/app/models/kredit';
import { Klijent } from 'src/app/models/klijent';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'brojLk', 'ime', 'prezime', 'kredit', 'actions'];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<Klijent>;
  selektovaniKlijent!: Klijent;

  constructor(private klijentService: KlijentService, 
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  selectRow(row: any) {
    this.selektovaniKlijent = row;
  }

  public loadData(): void {
    this.subscription = this.klijentService.getAllKlijents().subscribe(data =>
      {
        this.dataSource = new MatTableDataSource(data);
      }, (error:Error) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  public openDialog(flag:number, id?:number, brojLk?:number, ime?:string, prezime?:string, kredit?:Kredit) {
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data:{id,brojLk, ime, prezime, kredit}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    })
  }


}
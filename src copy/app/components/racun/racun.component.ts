import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { Klijent } from 'src/app/models/klijent';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';


@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns= ['id', 'naziv', 'opis', 'oznaka',
   'klijent', 'tipRacuna', 'actions'];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<RacunComponent>;
  @Input() selektovaniKlijent!: Klijent;

  constructor(private racunService: RacunService,
    private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selektovaniKlijent.id) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscription = this.racunService.getRacunZaKlijentID(this.selektovaniKlijent.id)
      .subscribe(data => 
        {
          this.dataSource = new MatTableDataSource(data);
        }, (error: Error) => {
          console.log(error.name + ' '+ error.message);
        });
  }

  openDialog(flag:number, id?:number, naziv?: string, opis?:string,
      oznaka?:string, klijent?:Klijent, tipRacuna?: TipRacuna) {

        const dialogRef = this.dialog.open(RacunDialogComponent, 
          {data: {id,naziv, opis, oznaka, klijent, tipRacuna}});
        
        dialogRef.componentInstance.flag = flag;
        if(flag === 1) {
          dialogRef.componentInstance.data.klijent = this.selektovaniKlijent;
        }

        dialogRef.afterClosed().subscribe(res => {
          if (res === 1)
          this.loadData();
        });
  }

}
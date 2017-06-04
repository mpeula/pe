import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { AemetService } from '../../../../services/aemet.service';
import { ComparatorService } from '../../../../services/comparator.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  public summary: any = {};

  constructor(
    private aemet: AemetService,
    public comparatorService: ComparatorService,
    public dialogRef: MdDialogRef<DetailsDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.aemet.getStations(this.data.indicativo).subscribe(
      response => {
        this.summary = response.datos_json;
      }
    );
    console.log();
  }

}

import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ComparatorService } from '../../../../services/comparator.service';

@Component({
  selector: 'app-comparator-list-dialog',
  templateUrl: './comparator-list-dialog.component.html',
  styleUrls: ['./comparator-list-dialog.component.css']
})
export class ComparatorListDialogComponent implements OnInit {

  constructor(
    public comparatorService: ComparatorService,
    public dialogRef: MdDialogRef<ComparatorListDialogComponent>,
  ) { }

  ngOnInit() {
  }

}

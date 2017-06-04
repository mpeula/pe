import { Component } from '@angular/core';
import { ComparatorService } from './services/comparator.service';
import { MdDialog } from '@angular/material';

import { ComparatorListDialogComponent } from './views/map/components/comparator-list-dialog/comparator-list-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public comparatorService: ComparatorService,
    private dialog: MdDialog
  ) { }

  openComparatorList() {
    let dialogRef = this.dialog.open(ComparatorListDialogComponent);
  }

}

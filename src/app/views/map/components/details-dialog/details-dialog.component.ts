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
  public chart: any = {};

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
        this.chart = {
          chart: {
            type: 'line'
          },
          title : { text : 'Monthly Temperature' },
          series: response.datos_json.seriesMensuales,
          tooltip: {
            formatter: function() {
              return 'Year '+this.point.year + ': <b>'+this.point.y+'°C</b>';
            }
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: [{
            title: {
              text: 'Temperature'
            },
          }]
        };
      }
    );
  }

}

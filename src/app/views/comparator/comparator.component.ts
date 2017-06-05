import { Component, OnInit } from '@angular/core';

import { AemetService } from '../../services/aemet.service';
import { ComparatorService } from '../../services/comparator.service';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {
  public rainChart: any = false;
  public tempChart: any = false;
  public stationsData = [];
  public state = 'loaded';

  constructor(
    private aemet: AemetService,
    public comparatorService: ComparatorService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    if(!this.comparatorService.stations.length) {
      return;
    }
    this.stationsData = [];
    this.state = 'loading';
    this.getStations(0).then(() => {
      this.buildCharts();
      this.state = 'loaded';
    });
  }

  getStations(index) {
    return new Promise((resolve, reject) => {
      this.aemet.getByDate(
        this.comparatorService.stations[index].indicativo, 
        this.comparatorService.dates.startDate, 
        this.comparatorService.dates.endDate
      ).subscribe(
        response => {
          this.stationsData.push(response);
          if(index < this.comparatorService.stations.length - 1) {
            this.getStations(index + 1).then(() => resolve());
          }else{
            resolve();
          }
        }
      );
    });
  }

  buildCharts() {
    this.buildRainChart();
    this.buildTempChart();
  }

  buildRainChart() {
    let categories = [];
    let series = [];
    this.stationsData.map((station, stationIndex) => {
      let tempSeries = [{
        name: this.comparatorService.stations[stationIndex].nombre + ' Pressure',
        data: [],
        yAxis: 1,
        type: 'arearange'
      }, {
        name: this.comparatorService.stations[stationIndex].nombre + ' Rain',
        data: []
      }]
      station.map(day => {
        if(stationIndex === 0){
          categories.push(day.fecha);
        }
        tempSeries[0].data.push([parseFloat(day.presMin), parseFloat(day.presMax)]);
        tempSeries[1].data.push(parseFloat(day.prec));
      });
      series = series.concat(tempSeries);
    });

    this.rainChart = {
      chart: {
        type: 'column'
      },
      title : { text : 'Pressure vs Rainfall' },
      series: series,
      tooltip: {
        shared: true
      },
      xAxis: {
        categories: categories
      },
      yAxis: [{
        title: {
          text: 'Rainfall mm'
        },
      }, {
        title: {
          text: 'Pressure'
        },
        opposite: true
      }]
    };
  }

  buildTempChart() {
    let categories = [];
    let series = [];
    this.stationsData.map((station, stationIndex) => {
      let tempSeries = [{
        name: this.comparatorService.stations[stationIndex].nombre,
        data: []
      }]
      station.map(day => {
        if(stationIndex === 0){
          categories.push(day.fecha);
        }
        tempSeries[0].data.push([parseFloat(day.tmin), parseFloat(day.tmax)]);
      });
      series = series.concat(tempSeries);
    });

    this.tempChart = {
      chart: {
        type: 'arearange',
      },
      title : { text : 'Temperature Variation' },
      series: series,
      tooltip: {
        shared: true,
        valueSuffix: '°C'
      },
      plotOptions: {
        arearange: {
          fillOpacity: 0.3
        }
      },
      xAxis: {
        categories: categories
      },
      yAxis: [{
        title: {
          text: 'Temperature'
        }
      }]
    };
  }


}

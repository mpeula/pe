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
  public dates: any = {
    startDate: new Date(2017, 4, 1),
    endDate: new Date()
  };
  public stationsData = [];

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
    this.getStations(0).then(() => {
      this.buildCharts();
      console.log('Downloaded all stations data');
    });
  }

  getStations(index) {
    return new Promise((resolve, reject) => {
      this.aemet.getByDate(
        this.comparatorService.stations[index].indicativo, 
        this.dates.startDate, 
        this.dates.endDate
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
        name: this.comparatorService.stations[stationIndex].nombre + ' Average Temperature',
        data: [],
        yAxis: 1,
        type: 'spline'
      }, {
        name: this.comparatorService.stations[stationIndex].nombre + ' Rain',
        data: []
      }]
      station.map(day => {
        if(stationIndex === 0){
          categories.push(day.fecha);
        }
        tempSeries[0].data.push(parseFloat(day.tmed));
        tempSeries[1].data.push(parseFloat(day.prec));
      });
      series = series.concat(tempSeries);
    });

    this.rainChart = {
      chart: {
        type: 'column'
      },
      title : { text : 'Temperature vs Rainfall' },
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
          text: 'Temperature'
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
        name: this.comparatorService.stations[stationIndex].nombre + ' Temperature Max',
        data: [],
        type: 'spline'
      }, {
        name: this.comparatorService.stations[stationIndex].nombre + ' Temperature Min',
        data: [],
        type: 'spline'
      }]
      station.map(day => {
        if(stationIndex === 0){
          categories.push(day.fecha);
        }
        tempSeries[0].data.push(parseFloat(day.tmax));
        tempSeries[1].data.push(parseFloat(day.tmin));
      });
      series = series.concat(tempSeries);
    });

    this.tempChart = {
      chart: {
        type: 'column'
      },
      title : { text : 'Temperature Max vs Temperature Min' },
      series: series,
      tooltip: {
        shared: true
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

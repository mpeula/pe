import { Injectable } from '@angular/core';

@Injectable()
export class ComparatorService {
  public stations: any[] = [];
  public dates: any = {
    startDate: new Date(2017, 4, 1),
    endDate: new Date()
  };

  constructor(){ }

  compare(station) {
    if(this.isComparing(station)) {
      this.stations.splice(this.stations.findIndex(value => value.indicativo === station.indicativo), 1);
    }else{
      this.stations.push(station);
    }
  }

  isComparing(station): Boolean {
    return this.stations.some(value => value.indicativo === station.indicativo);
  }

}

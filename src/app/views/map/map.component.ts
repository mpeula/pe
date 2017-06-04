import { Component, OnInit, NgZone } from '@angular/core';

import { MdDialog } from '@angular/material';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
declare var google: any;
declare var MarkerClusterer: any;

import { AemetService } from '../../services/aemet.service';
import { ComparatorService } from '../../services/comparator.service';

import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public stations: any[] = [];
  public map: any = {
    wrapper: undefined,
    markers: [],
    cluster: {},
    openMarker: {},
    infoWindowOpen: false
  };

  constructor(
    private aemet: AemetService,
    private zone: NgZone,
    public dialog: MdDialog,
    public comparatorService: ComparatorService
  ) { }

  ngOnInit() {
    this.aemet.getStations().subscribe(
      response => {
        this.stations = response.datos_json;
        this.onChangeMapWrapper();
      }
    );
  }

  onChangeMapWrapper( mapWrapper: GoogleMapsAPIWrapper = this.map.wrapper ) {
    if (!mapWrapper) {
      return;
    }
    this.map.wrapper = mapWrapper;
    this.map.wrapper.getNativeMap().then(map => {
      // map is the native google map object and the wrapper is the same instance as the one on the map
      this.map.markers = this.stations.map((marker, i) => {
        const markerMap = new google.maps.Marker({
          position: new google.maps.LatLng(marker.latitud, marker.longitud),
          title: marker.indicativo + ''
        });
        markerMap.addListener('click', () => {
          this.map.openMarker = marker;
          this.zone.run(() => this.map.infoWindowOpen = true);
        });
        return markerMap;
      });

      this.map.cluster = new MarkerClusterer(map, this.map.markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
    });
  }

  openDetails(station) {
    let dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: station,
    });
  }

}

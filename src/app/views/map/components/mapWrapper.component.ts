import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

@Component({
  selector: 'app-map-wrapper',
  template: ''
})
export class MapWrapperComponent {
  // @Input() public riMapWrapper: any;
  @Output() mapWrapperChange: EventEmitter<any> = new EventEmitter<any>();

  constructor (
    private gmapsApi: GoogleMapsAPIWrapper
  ) {
    setTimeout(() => this.mapWrapperChange.emit(this.gmapsApi), 0);
    // this.mapWrapperChange.emit(this.gmapsApi);
    // console.log('emit', this.gmapsApi);
  }
}

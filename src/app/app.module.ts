import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module.import';
import { AppRoutingModule } from './app-routing.module';

import { AemetService } from './services/aemet.service';
import { ComparatorService } from './services/comparator.service';

import { AppComponent } from './app.component';
import { MapComponent } from './views/map/map.component';
import { MapWrapperComponent } from './views/map/components/mapWrapper.component';
import { DetailsDialogComponent } from './views/map/components/details-dialog/details-dialog.component';
import { ComparatorComponent } from './views/comparator/comparator.component';
import { ComparatorListDialogComponent } from './views/map/components/comparator-list-dialog/comparator-list-dialog.component';

declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');
  const hcm = require('highcharts/highcharts-more');

  hcm(hc);
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapWrapperComponent,
    DetailsDialogComponent,
    ComparatorComponent,
    ComparatorListDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartModule,

    MaterialModule,
    BrowserAnimationsModule,

    AgmCoreModule.forRoot()
  ],
  providers: [
    AemetService,
    ComparatorService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  entryComponents: [
    DetailsDialogComponent,
    ComparatorListDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

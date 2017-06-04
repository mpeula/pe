import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './views/map/map.component';
import { ComparatorComponent } from './views/comparator/comparator.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'comparator',      component: ComparatorComponent },
  { path: '**',
    redirectTo: '/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
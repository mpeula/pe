import { NgModule } from '@angular/core';

import { 
  MdToolbarModule,
  MdSidenavModule,
  MdIconModule,
  MdIconRegistry,
  MdButtonModule,
  MdDialogModule,
  MdProgressSpinnerModule,
  MdListModule,
  MdDatepickerModule,
  MdInputModule,
  MdNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    MdListModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule
  ],
  exports: [
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    MdListModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule
  ],
})
export class MaterialModule {
  constructor(
    private iconRegistry: MdIconRegistry
  ) {
    iconRegistry.registerFontClassAlias('material-icons');
  }
}

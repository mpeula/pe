import { NgModule } from '@angular/core';

import { 
  MdToolbarModule,
  MdSidenavModule,
  MdIconModule,
  MdIconRegistry,
  MdButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule
  ],
  exports: [
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule
  ],
})
export class MaterialModule {
  constructor(
    private iconRegistry: MdIconRegistry
  ) {
    iconRegistry.registerFontClassAlias('material-icons');
  }
}

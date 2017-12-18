import { PlayerOverlay } from './player-overlay.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { ZefDropdown } from './zef-dropdown/zef-dropdown.component';
import { DropdownOverlay } from './zef-dropdown/dropdown-overlay/dropdown-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    ZefDropdown,
    DropdownOverlay
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    OverlayModule
  ],
  providers: [
    PlayerOverlay
  ],
  entryComponents: [
    DropdownOverlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

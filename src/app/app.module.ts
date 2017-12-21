import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { ZefDropdown } from './zef-dropdown/zef-dropdown.component';
import { DropdownMenu } from './zef-dropdown/dropdown-menu/dropdown-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ZefDropdown,
    DropdownMenu
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    OverlayModule,
    PerfectScrollbarModule,
    FormsModule
  ],
  providers: [
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

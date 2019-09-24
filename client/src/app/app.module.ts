import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './auth/login/login.module';
import { AppRoutingModule } from './/app-routing.module';
import {hrmService} from './service/hrm.service';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import {MaterialModule } from './material.module';
import { pageRoutingModule } from './pages/page.routing.module';
import { MatSidenavModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PageModule } from './pages/page.module';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    pageRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    PageModule,
    FlexLayoutModule,
    
    
  ],
  providers: [hrmService,
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }

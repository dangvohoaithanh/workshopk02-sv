import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatIconModule, MatDialogModule, MatDatepickerModule, MatMenuModule, MatMenuTrigger, MatExpansionModule, MatFormFieldModule, MatSelectModule} from '@angular/material'
import { HrmEmp01Component } from './hrm-emp01/hrm-emp01.component';
import { Emp01DialogComponent } from './hrm-emp01/emp01-dialog/emp01-dialog.component';
import { HrmMessegeComponent } from './hrm-messege/hrm-messege.component';
import { HrmEmp03Component } from './hrm-emp03/hrm-emp03.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { LoadPageComponent } from './load-page/load-page.component';
import { ReportComponent } from './report/report.component';
@NgModule({
    declarations: [
        HrmEmp01Component,
        Emp01DialogComponent,
        HrmMessegeComponent,
        HrmEmp03Component,
        LoadPageComponent,
        ReportComponent
    ],
    imports: [
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      CommonModule,
      BrowserModule,
      MatCheckboxModule,
      MatButtonModule,
      MatToolbarModule,
      MatTableModule,
      MatPaginatorModule,
      MatIconModule,
      MatDialogModule,
      MatDatepickerModule,
      MatMenuModule,
      MatExpansionModule,
      MatSelectModule,
      FlexLayoutModule,
      SharedModule,
      
    ],
    entryComponents: [Emp01DialogComponent,HrmMessegeComponent,LoadPageComponent,ReportComponent],
    providers: [],
    bootstrap: []
  })
  export class PageModule { }
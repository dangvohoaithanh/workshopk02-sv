import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-route-module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from '../../shared/shared.module'
import {MatButtonModule} from '@angular/material'
@NgModule({
    declarations: [
      LoginComponent,
      
    ],
    imports: [
      MatInputModule,
      LoginRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      CommonModule,
      BrowserModule,
      SharedModule,
      MatButtonModule
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [LoginComponent]
  })
  export class LoginModule { }
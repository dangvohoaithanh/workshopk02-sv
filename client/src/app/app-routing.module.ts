import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HrmEmp01Component } from './pages/hrm-emp01/hrm-emp01.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'emp01', component: HrmEmp01Component}
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    [ RouterModule.forRoot(routes) ],
  ],
  
  declarations: [

  ]
  
})
export class AppRoutingModule { }

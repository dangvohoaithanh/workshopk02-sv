import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HrmEmp01Component } from './hrm-emp01/hrm-emp01.component';
import { Emp01DialogComponent } from './hrm-emp01/emp01-dialog/emp01-dialog.component';
import { HrmEmp03Component } from './hrm-emp03/hrm-emp03.component';

const routes: Routes = [
  { path: 'emp01', component: HrmEmp01Component },
  { path: 'emp03', component: HrmEmp03Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
  providers: [],
  declarations: []
})
export class pageRoutingModule {

}
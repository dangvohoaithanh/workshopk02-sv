import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {hrmAccount} from '../models/hrm/hrm-account'
import { hrmEmployeeDto, hrmEmployee } from '../models/hrm/hrm-employee';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpResponse } from 'selenium-webdriver/http';
import { MatSort, MatDialog, MatMenuTrigger, MatExpansionPanel } from '@angular/material';
import { saveAs } from 'file-saver';
import { LoadPageComponent } from '../pages/load-page/load-page.component';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json ; ' })
  };
@Injectable({
    providedIn: 'root'
})

export class hrmService{
    url = 'https://localhost:5001';
    

    constructor(private http: HttpClient,public dialog: MatDialog,){}

    getHrmEmployee(){
        return this.http.get(`${this.url}/employee/GetAllInfo`);
    }

    getAllAccount(){
        return this.http.get<hrmAccount[]>(`${this.url}/account`)
    }

    getAccount(userid:string){
        return this.http.get<hrmAccount[]>(`${this.url}/account/`+ userid)
    }

    postHrmEmployee(hrmEmployee: hrmEmployee): Observable<any> {
        return this.http.post(`${this.url}/employee`, hrmEmployee, httpOptions);
    }

    updateHrmEmployee(hrmEmployee: hrmEmployee): Observable<any> {
        return this.http.post(`${this.url}/employee/update`, JSON.stringify(hrmEmployee), httpOptions)
       
    }
    
    delHrmEmployee(userid: string) {
        return this.http.delete(`${this.url}/employee/` + userid, httpOptions);
      }

    searchHrmEmployee(object: any): Observable<any>{
        return this.http.post(`${this.url}/employee/filter`, object, httpOptions);
    }

    searchHrmEmployee1(object: any): Observable<any>{
        return this.http.post(`${this.url}/employee/filter1`, object, httpOptions);
    }
    openDialogLoading() {
        const dialogRefLoading = this.dialog.open(LoadPageComponent, {
          disableClose: true,
          panelClass: 'loading-modal'
        });
      }

    postReportSearch():any{
        var mediaType = 'application/pdf';
        this.openDialogLoading();
        return this.http.post(`${this.url}/employee/EmpReport`,{location: "report.pdf"}, { responseType: 'blob' }).subscribe(
            (response) => {
                var blob = new Blob([response], { type: mediaType });
                console.log(event)
                saveAs(blob, 'report.pdf');
                this.dialog.closeAll();
            },
            e => { throwError(e); }
        );
    }




   
}

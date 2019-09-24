import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { hrmEmployee, hrmEmployeeDto } from '../../models/hrm/hrm-employee'
import { hrmService } from '../../service/hrm.service';
import { MatSort, MatDialog, MatMenuTrigger, MatExpansionPanel } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Emp01DialogComponent } from './emp01-dialog/emp01-dialog.component';
import { HrmMessegeComponent } from '../hrm-messege/hrm-messege.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadPageComponent } from '../load-page/load-page.component';
@Component({
  selector: 'app-hrm-emp01',
  templateUrl: './hrm-emp01.component.html',
  styleUrls: ['./hrm-emp01.component.css']
})
export class HrmEmp01Component implements OnInit {
  displayedColumns: string[] = ['name', 'username', 'password', 'dateofbirth', 'address', 'idcard', 'leader',];
  readonly = true;
  dateofbirh: Date;
  selectedValue: 'None'
  expandedFlag = true;
  flag: any;

  leader = [
    { value: true, viewValue: 'Leader' },
    { value: false, viewValue: 'Employee' },

  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('myPanel') myPanel: MatExpansionPanel;
  @ViewChild('myPanel1') myPanel1: MatExpansionPanel;
  matIcon = 'keyboard_arrow_down' || 'keyboard_arrow_up';
  matIcon1 = 'keyboard_arrow_down' || 'keyboard_arrow_up';

  @ViewChild(MatMenuTrigger)
  contextMenu : MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  
  dataSource: any = new MatTableDataSource<hrmEmployee>([]);
  selected: hrmEmployee;
  isLeader: boolean;
  model: hrmEmployee;
  constructor(
    private hrmService: hrmService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.model = new hrmEmployee;
    this.refreshData();
    this.myPanel.expandedChange.subscribe((data) => {
      this.matIcon = data ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    });

    this.myPanel1.expandedChange.subscribe((data) => {
      this.matIcon1 = data ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    });

  }
  refreshData() {
    this.hrmService.getHrmEmployee().subscribe((res: any) => {
      //console.log(res);
      this.openDialogLoading();
      this.dataSource = new MatTableDataSource<hrmEmployee>(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dialog.closeAll();
    });
  }

  selectRow(row: hrmEmployee) {
    this.selected = row;
  }

  openDialog() {
    const dialogRef = this.dialog.open(Emp01DialogComponent, {
      disableClose: true,
      width: '40%',
      data: {
        date: this.dateofbirh,
        selected: this.selected,
        readonly: this.readonly
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openDialogLoading();
        delete result.id;

        let d = new DatePipe("en-US");
        result.dateofbirth = d.transform(result.dateofbirth, 'yyyy-MM-dd');
        if (result.isLeader == true)
          result.salaryid = 1
        else result.salaryid = 2

        console.log(result)
        this.hrmService.updateHrmEmployee(result).subscribe(() => {
          this.refreshData();
          this._snackBar.open('Successfully', 'Cancel', {
            duration: 2000,
          });
        });

      }
      this.refreshData();

    });
  }

  openDialogNew() {

    const dialogRef = this.dialog.open(Emp01DialogComponent, {
      disableClose: true,
      width: '40%',
      // data: {
      //   date: this.dateofbirh,
      //   selected: this.selected,
      //   readonly: this.readonly
      // }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openDialogLoading();
        delete result.id;

        let d = new DatePipe("en-US");
        result.dateofbirth = d.transform(result.dateofbirth, 'yyyy-MM-dd');
        if (result.isLeader == true)

          result.salaryid = 1
        else result.salaryid = 2

        console.log(result)
        this.hrmService.postHrmEmployee(result).subscribe(() => {
          this.refreshData();
          this._snackBar.open('Successfully', 'Cancel', {
            duration: 2000,
          });
        });
      }
      this.refreshData();
    });
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
    return false;
  }

 
  deleteEmp() {
    const dialogRef1 = this.dialog.open(HrmMessegeComponent, {
      disableClose: true,
      width: '20%',
      height: 'auto'
    });
    dialogRef1.afterClosed().subscribe(() => {
      this.hrmService.delHrmEmployee(this.selected.userid).subscribe(() => {
        this.refreshData();
        this._snackBar.open('Successfully', 'Cancel', {
          duration: 2000,
        });
      });
    });
  }
  expandPannel() {
    this.myPanel.expanded = !this.myPanel.expanded;
  }
  expandPannel1() {
    this.myPanel1.expanded = !this.myPanel1.expanded;
  }

  search(name: string, username: string, address: string, isleader: boolean) {
    if (isleader == undefined) {
      this.flag = 1
    } else this.flag = 0;
    this.hrmService
      .searchHrmEmployee({
        name: name,
        flag: this.flag,
        userid: username,
        isleader: isleader,
        address: address,
      }).subscribe((res: any) => {
        this.dataSource = new MatTableDataSource<hrmEmployee>(res);
        this.dataSource.paginator = this.paginator;
      })
    // } else {
    //   this.hrmService
    //     .searchHrmEmployee({
    //       name: name,
    //       userid: username,
    //       isleader: isleader,
    //       address: address,
    //     }).subscribe((res: any) => {
    //       this.dataSource = new MatTableDataSource<hrmEmployee>(res);
    //       this.dataSource.paginator = this.paginator;
    //     })
    // }
  }
  
  clear() {
    this.model = new hrmEmployee();
    this.selectedValue = undefined;
    this.refreshData();
  }

  openDialogLoading() {
    const dialogRefLoading = this.dialog.open(LoadPageComponent, {
      disableClose: true,
      panelClass: 'loading-modal'
    });
  }

}

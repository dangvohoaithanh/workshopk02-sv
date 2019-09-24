import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { hrmEmployee, hrmEmployeeDto } from 'src/app/models/hrm/hrm-employee';
import { HrmMessegeComponent } from '../../hrm-messege/hrm-messege.component';
import { hrmService } from '../../../service/hrm.service';
import { MatSnackBar } from '@angular/material'
@Component({
  selector: 'app-emp01-dialog',
  templateUrl: './emp01-dialog.component.html',
  styleUrls: ['./emp01-dialog.component.css']
})


export class Emp01DialogComponent implements OnInit {
  addForm: FormGroup;
  model: hrmEmployee;
  date: Date;
  flagSave: boolean;

  constructor(
    public dialogRef: MatDialogRef<Emp01DialogComponent>,
    public dialog: MatDialog,
    private hrmService: hrmService,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    this.model = new hrmEmployeeDto();

    this.addForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      isleader: new FormControl
    });
    if (this.data) {
      this.model = new hrmEmployeeDto();
      this.model = Object.assign({}, this.data.selected);
    }

  }
  closeDialog() {
    const dialogRef1 = this.dialog.open(HrmMessegeComponent, {
      disableClose: true,
      width: '20%',
      height: 'auto'
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.data = null;
        this.dialogRef.close();
      }
    })
  }

  save() {
    const dialogRef1 = this.dialog.open(HrmMessegeComponent, {
      disableClose: true,
      width: '20%',
      height: 'auto'
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(this.model)

      }

    })
  }

  onBlurCode() {
    if (this.model.userid.length > 0) {
      this.hrmService.getAccount(this.model.userid).subscribe((res: any) => {
        if (res) {
          this.snackBar.open('Username is duplicate', 'close'), {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          };
          this.flagSave = false
        }
        else {
          this.flagSave = true;
        }
      })
    }
  }

}

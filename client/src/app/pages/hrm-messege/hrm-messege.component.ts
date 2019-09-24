import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-hrm-messege',
  templateUrl: './hrm-messege.component.html',
  styleUrls: ['./hrm-messege.component.css']
})
export class HrmMessegeComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<HrmMessegeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

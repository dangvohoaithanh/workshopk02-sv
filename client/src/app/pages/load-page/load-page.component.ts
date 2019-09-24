import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.css']
})
export class LoadPageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoadPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
      
  }
}

import { Component, OnInit } from '@angular/core';
import { hrmService } from '../../service/hrm.service';
import { HttpRequest } from 'selenium-webdriver/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  

  constructor(private hrmService: hrmService) { }

  ngOnInit() {
  }
  reportPDF() {
    
    console.log(this.hrmService.postReportSearch());
  }
}

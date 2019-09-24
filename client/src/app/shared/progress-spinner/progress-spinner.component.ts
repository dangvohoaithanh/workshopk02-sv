import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {

  @Input() isLoading = false;
  @Input() size = 1;
  @Input() message: string;
 
  constructor() { }

  ngOnInit() {
  }

}

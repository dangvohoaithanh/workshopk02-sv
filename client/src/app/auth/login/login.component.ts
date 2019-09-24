import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { hrmService } from '../../service/hrm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    private router: Router, private route: ActivatedRoute,
    private hrmService: hrmService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', Validators.required)
    });
    this.hrmService.getHrmEmployee().subscribe((emp) => {
      
    })

  }
  login(user: string, pass: string) {

    this.isLoading = true;
    if (user == 'test' && pass == "test") {
      this.router.navigate(['/emp01']);

    }
    else this.isLoading = false;
  }
}


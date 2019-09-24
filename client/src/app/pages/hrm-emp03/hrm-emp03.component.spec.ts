import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmEmp03Component } from './hrm-emp03.component';

describe('HrmEmp03Component', () => {
  let component: HrmEmp03Component;
  let fixture: ComponentFixture<HrmEmp03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmEmp03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmEmp03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmEmp01Component } from './hrm-emp01.component';

describe('HrmEmp01Component', () => {
  let component: HrmEmp01Component;
  let fixture: ComponentFixture<HrmEmp01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmEmp01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmEmp01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

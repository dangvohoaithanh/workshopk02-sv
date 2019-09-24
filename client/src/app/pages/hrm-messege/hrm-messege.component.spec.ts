import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmMessegeComponent } from './hrm-messege.component';

describe('HrmMessegeComponent', () => {
  let component: HrmMessegeComponent;
  let fixture: ComponentFixture<HrmMessegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmMessegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmMessegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

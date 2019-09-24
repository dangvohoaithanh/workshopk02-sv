import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emp01DialogComponent } from './emp01-dialog.component';

describe('Emp01DialogComponent', () => {
  let component: Emp01DialogComponent;
  let fixture: ComponentFixture<Emp01DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emp01DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emp01DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

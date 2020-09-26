import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExdealsComponent } from './exdeals.component';

describe('ExdealsComponent', () => {
  let component: ExdealsComponent;
  let fixture: ComponentFixture<ExdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

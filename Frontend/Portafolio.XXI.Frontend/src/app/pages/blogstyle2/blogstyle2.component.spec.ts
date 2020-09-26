import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Blogstyle2Component } from './blogstyle2.component';

describe('Blogstyle2Component', () => {
  let component: Blogstyle2Component;
  let fixture: ComponentFixture<Blogstyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Blogstyle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Blogstyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

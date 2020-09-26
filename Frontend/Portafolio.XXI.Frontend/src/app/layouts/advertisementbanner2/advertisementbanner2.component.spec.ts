import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Advertisementbanner2Component } from './advertisementbanner2.component';

describe('Advertisementbanner2Component', () => {
  let component: Advertisementbanner2Component;
  let fixture: ComponentFixture<Advertisementbanner2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Advertisementbanner2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Advertisementbanner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

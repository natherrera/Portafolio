import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Advertisementbanner1Component } from './advertisementbanner1.component';

describe('Advertisementbanner1Component', () => {
  let component: Advertisementbanner1Component;
  let fixture: ComponentFixture<Advertisementbanner1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Advertisementbanner1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Advertisementbanner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

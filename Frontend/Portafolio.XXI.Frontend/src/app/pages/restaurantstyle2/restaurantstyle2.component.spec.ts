import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Restaurantstyle2Component } from './restaurantstyle2.component';

describe('Restaurantstyle2Component', () => {
  let component: Restaurantstyle2Component;
  let fixture: ComponentFixture<Restaurantstyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Restaurantstyle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Restaurantstyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

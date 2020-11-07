import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCajeroComponent } from './panelCajero.component';

describe('PanelCajeroComponent', () => {
  let component: PanelCajeroComponent;
  let fixture: ComponentFixture<PanelCajeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCajeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

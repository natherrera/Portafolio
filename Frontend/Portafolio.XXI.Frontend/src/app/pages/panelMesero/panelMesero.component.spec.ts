import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMeseroComponent } from './panelMesero.component';

describe('PanelMeseroComponent', () => {
  let component: PanelMeseroComponent;
  let fixture: ComponentFixture<PanelMeseroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelMeseroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelMeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

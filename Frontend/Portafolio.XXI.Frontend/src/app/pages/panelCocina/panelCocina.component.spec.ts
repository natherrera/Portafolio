import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCocinaComponent } from './panelCocina.component';

describe('PanelCocinaComponent', () => {
  let component: PanelCocinaComponent;
  let fixture: ComponentFixture<PanelCocinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCocinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

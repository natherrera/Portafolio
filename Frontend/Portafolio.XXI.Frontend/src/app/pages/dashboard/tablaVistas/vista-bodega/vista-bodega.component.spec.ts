import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaBodegaComponent } from './vista-bodega.component';

describe('VistaBodegaComponent', () => {
  let component: VistaBodegaComponent;
  let fixture: ComponentFixture<VistaBodegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaBodegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
